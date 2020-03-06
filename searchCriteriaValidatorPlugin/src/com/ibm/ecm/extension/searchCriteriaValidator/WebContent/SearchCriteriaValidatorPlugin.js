/*
 * Licensed Materials - Property of IBM (c) Copyright IBM Corp. 2020  All Rights Reserved.
 * 
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 * 
 * DISCLAIMER OF WARRANTIES :
 * 
 * Permission is granted to copy and modify this Sample code, and to distribute modified versions provided that both the
 * copyright notice, and this permission notice and warranty disclaimer appear in all copies and modified versions.
 * 
 * THIS SAMPLE CODE IS LICENSED TO YOU AS-IS. IBM AND ITS SUPPLIERS AND LICENSORS DISCLAIM ALL WARRANTIES, EITHER
 * EXPRESS OR IMPLIED, IN SUCH SAMPLE CODE, INCLUDING THE WARRANTY OF NON-INFRINGEMENT AND THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. IN NO EVENT WILL IBM OR ITS LICENSORS OR SUPPLIERS BE LIABLE FOR
 * ANY DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SAMPLE CODE, DISTRIBUTION OF THE SAMPLE CODE, OR
 * COMBINATION OF THE SAMPLE CODE WITH ANY OTHER CODE. IN NO EVENT SHALL IBM OR ITS LICENSORS AND SUPPLIERS BE LIABLE
 * FOR ANY LOST REVENUE, LOST PROFITS OR DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL OR PUNITIVE
 * DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY OF LIABILITY, EVEN IF IBM OR ITS LICENSORS OR SUPPLIERS HAVE
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */


require([
  "dojo/aspect",
  "dojo/date",
  "dojo/_base/array",
  "ecm/widget/search/BasicSearchDefinition",
  "ecm/widget/search/SearchTab",
  "ecm/model/Desktop",
  "ecm/widget/dialog/MessageDialog",
  "dojo/i18n!searchCriteriaValidatorPluginDojo/nls/messages"
], function( aspect, date, array, BasicSearchDefinition, SearchTab, Desktop, MessageDialog, Messages ) {

  // Validates that a string input contains a *
  var isValid = function(str) {
    return !/[*]/g.test(str);
  };

  // Validates if two dates are within the allowed range set by admin
  var validateDates = function(date1, date2) {
    var maxAllowedDays = Desktop.pluginSettings && Desktop.pluginSettings.SearchCriteriaValidator && Desktop.pluginSettings.SearchCriteriaValidator.searchMaxCount;
    if (maxAllowedDays == null) {
      maxAllowedDays = 31;
    }
    var diff = date.difference(date1, date2, "day");
    return diff > maxAllowedDays;
  };
  
  var showErrorMessage = function(message) {
    if (!this._messageDialog) { 
      this._messageDialog = new MessageDialog();
    }
    this._messageDialog.showMessage(message);
  };

  // Restrict date search operators to 'Equals', 'Between', and 'Is Empty', to prevent open-ended searches
  aspect.after(Desktop, "_desktopLoaded", function(response, callback) {
    var repositoryList = ecm.model.desktop.repositories;
    if (repositoryList.length > 0) {
      for (var i in repositoryList) {
        // remove the only repository type is equal to p8
        var repository = ecm.model.desktop.getRepository(repositoryList[i].id);
        // Add these operators if they are not in there already
        if (repository.hasOwnProperty("searchFilteredOperators") && repository.searchFilteredOperators.hasOwnProperty("datetimeOp")) {
          repository.searchFilteredOperators.datetimeOp.push("!EQ","LT","LE","!BT","IA","!IN","!NL", "GT", "GE");
        }
      }
    }
  });

  // When building a search, validate date criteria to ensure that the range is within the configured threshold, and that wildcards (*) aren't used with Like operator variants
  aspect.around(BasicSearchDefinition.prototype, "_search", function(origMethod) {
    return function() {
      var flag = false;
      array.some(this.attributeDefinitionFormWid.getChildren(), function( attribDefWidget ) {
        console.log(attribDefWidget);
        if ( attribDefWidget.attributeDefinition.hasOwnProperty("dataType") && attribDefWidget.attributeDefinition.dataType == "xs:timestamp") {
          if (attribDefWidget.getOperator() == "BETWEEN") {
            if (validateDates( new Date(attribDefWidget.getValues()[0]), new Date(attribDefWidget.getValues()[1]))){
              var maxDays = Desktop.pluginSettings && Desktop.pluginSettings.SearchCriteriaValidator && Desktop.pluginSettings.SearchCriteriaValidator.searchMaxCount;
              showErrorMessage(Messages.search_criteria_validator_invalid_date_range + maxDays);
              flag = true; 
            }
          }
        } else if(attribDefWidget._operator == "STARTSWITH" || attribDefWidget._operator == "ENDSWITH" || attribDefWidget._operator == "LIKE" || attribDefWidget._operator == "NOTLIKE") {
          if (!isValid(attribDefWidget.getValues()[0])) {
            flag = true; 
            showErrorMessage(Messages.search_criteria_validator_invalid_string );
          } 
        }
      });
      if(!flag) {
        origMethod.apply(this, arguments);
      }
    };  
  });

  // When running a saved search, validate date criteria to ensure that the range is within the configured threshold, and that wildcards (*) aren't used with Like operator variants
  aspect.around(SearchTab.prototype, "_search", function(origMethod) {
    return function() {
      this.searchTemplate = this.searchForm.getSearchTemplate(); 
      this.searchCriteria = this.searchTemplate.searchCriteria;
      var flag = false;
      array.some(this.searchCriteria, function(searchCriteria) { 
        if(searchCriteria.hasOwnProperty('dataType') && (searchCriteria.dataType == 'xs:timestamp' || searchCriteria.dataType  == "xs:date" || searchCriteria.dataType == "xs:time" ) ) {	
          if (searchCriteria.selectedOperator == "BETWEEN") {
            if (validateDates(new Date(searchCriteria.values[0]), new Date(searchCriteria.values[1])) ) {
              var maxDays = Desktop.pluginSettings && Desktop.pluginSettings.SearchCriteriaValidator && Desktop.pluginSettings.SearchCriteriaValidator.searchMaxCount;
              showErrorMessage(Messages.search_criteria_validator_invalid_date_range + maxDays);
              flag = true;
            }
          }
        } else if(searchCriteria.selectedOperator == "STARTSWITH" || searchCriteria.selectedOperator == "ENDSWITH" || searchCriteria.selectedOperator == "LIKE" || searchCriteria.selectedOperator == "NOTLIKE") {
          if (!isValid(searchCriteria.value)) {
            showErrorMessage(Messages.search_criteria_validator_invalid_string);
            flag = true;
          }
        }	
      });
      if(!flag) {
        origMethod.apply(this, arguments);
      }
    };
  });
  
});
