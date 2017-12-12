import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default class AvailableColumnList extends React.Component{

    settingSelected = (id, e) => {
        e.preventDefault();
        const onItemSelected = this.props.onItemSelected;
        onItemSelected(id);
    }

    sortList = (list) => {
        list.sort((a, b)=>{
            const labelA = a.label.replace(/ /g,'').toLowerCase();
            const labelB = b.label.replace(/ /g,'').toLowerCase();
            if(labelA < labelB)
                return -1;
            if(labelA > labelB)
                return 1;
            return 0;
        })
    }

    filterList = (list, filter) => {
        return list.filter((item)=>{
            const lowerCaseTitle = item.label.toLowerCase();
            const lowerCaseFilter = filter.toLowerCase();
            return lowerCaseTitle.indexOf(lowerCaseFilter) !== -1
        })
    }

    filterUserSettings = (list, userSettings) => {
        return list.filter((item) => {
            let add = true;

            // filter out if its one of the current user settings
            userSettings.forEach((setting) => {
                if(setting.id == item.id){
                    add = false;
                }
            })

            // filter out if its the Document Title
            if(item.id == "DocumentTitle"){
                add = false;
            }
            
            return add;
        })
    }

    isActive = (property) => {
        const selected = this.props.selectedProperty;
        if(selected == property.id)
            return 'active';
        else
            return ''
    }

    render(){
        const filter = this.props.filterText;
        const userSettings = this.props.userSettings;
        let propertyList = this.props.properties;
        propertyList = this.filterList(propertyList, filter);
        propertyList = this.filterUserSettings(propertyList, userSettings);
        this.sortList(propertyList);

        return(
            <ListGroup componentClass='ul'>
                <th className = 'list-group-item'>
                    Available Properties
                </th>
                <div className="ucs-avail-list ucs-avail-column-height">
                    {propertyList.map((property, index)=>{
                        return <li
                                key = {property.id}
                                className= {this.props.disabled + ' ' + (this.isActive(property)) + ' list-group-item'} 
                                onClick={(e) => {this.settingSelected(property.id, e)}}>
                                    {property.label}
                                </li>
                    })}
                </div>
            </ListGroup>
        )
    }
}