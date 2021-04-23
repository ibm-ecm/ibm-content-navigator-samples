/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2020
 * US Government Users Restricted Rights - Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
package com.ibm.ecm.extension.emailLookup;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.ecm.extension.PluginLogger;
import com.ibm.ecm.extension.PluginResponseUtil;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.json.JSONMessage;
import com.ibm.ecm.json.JSONResponse;
import com.ibm.json.java.JSONArray;
import com.ibm.json.java.JSONObject;

public class EmailLookupPluginService extends PluginService {

    public String getId() {
        return "EmailLookupPluginService";
    }

    public void execute(PluginServiceCallbacks callbacks, HttpServletRequest request, HttpServletResponse response) throws Exception {
        // Log execution
        PluginLogger logger = callbacks.getLogger();
        logger.logEntry(this, "execute");

        JSONResponse jsonResponse = new JSONResponse();
        String query = request.getParameter("query");

        try {
            //create userList function returns JSONArray
            JSONArray userList = fetchUserList(query);

            //add userList as "userList" in jsonResponse
            jsonResponse.put("userList", userList);

        } catch (Exception e) {
            logger.logError(this, "execute", e);
            jsonResponse.put("userList", new JSONArray());
        } finally {
            logger.logExit(this,  "execute");
            // Send the response to the client.
            PluginResponseUtil.writeJSONResponse(request, response, jsonResponse, callbacks, "EmailLookupPluginService");
        }

    }

    /**
     * This is the source of your data. This function queries the actual store
     * (REST or db) to get/generate users
     * @return userList
     */
    private JSONArray userStore() {
        // For the sake of functionality, Static Information will be used
        //generate random userList
        JSONObject userInfo = new JSONObject();
        userInfo.put("name", "John Doe");
        userInfo.put("email", "john.doe@test.com");
        userInfo.put("userId", "jd12601");

        //Second User
        JSONObject userInfo2 = new JSONObject();
        userInfo2.put("name", "Jane Doe");
        userInfo2.put("email", "jane.doe@test.com");
        userInfo2.put("userId", "jd33790");

        //Third User
        JSONObject userInfo3 = new JSONObject();
        userInfo3.put("name", "Bob Cats");
        userInfo3.put("email", "bcats@test.com");
        userInfo3.put("userId", "bc98098");

        //Fourth User
        JSONObject userInfo4 = new JSONObject();
        userInfo4.put("name", "Zoe Burton");
        userInfo4.put("email", "zburton@sample.com");
        userInfo4.put("userId", "zb9999");

        //Fifth User
        JSONObject userInfo5 = new JSONObject();
        userInfo5.put("name", "Patrick Voss");
        userInfo5.put("email", "patrick.voss@sample.com");
        userInfo5.put("userId", "pv88910");

        //Sixth User
        JSONObject userInfo6 = new JSONObject();
        userInfo6.put("name", "Ryan Neil");
        userInfo6.put("email", "ryan.neil@sample.com");
        userInfo6.put("userId", "rn54210");

        //Seventh User
        JSONObject userInfo7 = new JSONObject();
        userInfo7.put("name", "Carl Newton");
        userInfo7.put("email", "CarlNewton@test.com");
        userInfo7.put("userId", "cn54210");

        //Eight User
        JSONObject userInfo8 = new JSONObject();
        userInfo8.put("name", "Ana Hanson");
        userInfo8.put("email", "AHanson@sample.com");
        userInfo8.put("userId", "ah54210");

        //Nineth User
        JSONObject userInfo9 = new JSONObject();
        userInfo9.put("name", "Harry Denver");
        userInfo9.put("email", "harry.denver@test.com");
        userInfo9.put("userId", "hd54210");

        //Tenth User
        JSONObject userInfo10 = new JSONObject();
        userInfo10.put("name", "Mike Rogers");
        userInfo10.put("email", "MikeRogers@test.com");
        userInfo10.put("userId", "mr54210");


        //Add users to list
        JSONArray userList = new JSONArray();
        userList.add(userInfo);
        userList.add(userInfo2);
        userList.add(userInfo3);
        userList.add(userInfo4);
        userList.add(userInfo5);
        userList.add(userInfo6);
        userList.add(userInfo7);
        userList.add(userInfo8);
        userList.add(userInfo9);
        userList.add(userInfo10);


        return userList;

    }

    private JSONArray fetchUserList(String query) {
        // this function searches by name and email

        JSONArray userList = userStore(); // Note: A real implementation would query an actual store (i.e., DB or REST) to find the users
        JSONArray userQueryResponse = new JSONArray();
        String queryLowerCase = query.toLowerCase();
        for (int i = 0; i < userList.size() - 1; i++) {
            //by name
            String name = (String)((JSONObject)userList.get(i)).get("name");
            if (name.toLowerCase().startsWith(query.toLowerCase())) {
                userQueryResponse.add((JSONObject)userList.get(i));
                continue;
            }

            //by email
            String email = (String)((JSONObject)userList.get(i)).get("email");
            if (email.toLowerCase().startsWith(query.toLowerCase())) {
                userQueryResponse.add((JSONObject)userList.get(i));
            }
        }
        return userQueryResponse;
    }
}
