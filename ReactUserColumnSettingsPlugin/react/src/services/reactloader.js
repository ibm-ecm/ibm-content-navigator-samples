import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "../store"
import { GlobalMessage as gMsg } from './gmessage'
import UserColumnSettings from '../components/usercolumnsettings/usercolumnsettings'

export class ReactLoader {
    constructor(mService) {
        this.mService = mService;

        this.mService.getMessage().subscribe(data => {
            let message = data.payload.message;
            console.log("message: " + message);
            console.log("containerID: " + data.payload.containerId);
            switch (message) {
                case gMsg.RENDER_USER_COLUMN_SETTINGS_DIALOG:
                    console.log(gMsg.RENDER_USER_COLUMN_SETTINGS_DIALOG);
                    let pl = data.payload;
                    console.log(pl);
                    this.renderUserColumnSettings(pl.containerId);
                    break;

                case gMsg.REMOVE_USER_COLUMN_SETTINGS_DIALOG:
                    console.log(gMsg.REMOVE_USER_COLUMN_SETTINGS_DIALOG);
                    this.removeComponent('icn-react-container');
                    break;

                default:
                    break;
            }
        })
    }

    renderUserColumnSettings(containerId){
        if(!containerId){
            containerId = 'icn-react-container';
        }
        let container = document.getElementById(containerId);
        if(!container){
            container = document.createElement("div");
            container.setAttribute('id', containerId);

            document.body.appendChild(container);
        }
        ReactDOM.render( 
            <Provider store={store}>
                <UserColumnSettings />
            </Provider> 
        ,container);
    }

    removeComponent(containerId) {
        const container = document.getElementById(containerId);
        if(container){ 
            ReactDOM.unmountComponentAtNode(container);
        }
    }
}