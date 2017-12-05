import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import store from "../store"
import EmailDialog from '../components/EmailDialog/emaildialog'
import { GlobalMessage as gMsg } from './gmessage'

export class ReactLoader {
    constructor(mService) {
        this.mService = mService;

        if (window.icn && window.icn.react.reactLoader) {
            window.icn.react.reactLoader.registerRender(gMsg.RENDER_EMAIL_DIALOG, this.renderEmailDialog);
            window.icn.react.reactLoader.registerRender(gMsg.REMOVE_EMAIL_DIALOG, this.removeEmailDialog);
        } else {
            this.mService.getMessage().subscribe(data => {
                let message = data.payload.message;
                let containerId = data.payload.containerId;
                console.log("message: " + message);
                console.log("containerID: " + containerId);
                switch (message) {
                    case gMsg.RENDER_EMAIL_DIALOG:
                        console.log(gMsg.RENDER_EMAIL_DIALOG);
                        let pl = data.payload;
                        console.log(pl);
                        this.renderEmailDialog(pl);
                        break;
                    case gMsg.REMOVE_EMAIL_DIALOG: 
                        console.log(gMsg.REMOVE_EMAIL_DIALOG);
                        this.removeEmailDialog({});
                        break;
                    default:
                        break;
                }
            })
        }
    }

    renderEmailDialog(pl) {
        // query container; if doesn't exist then create. Default id='icn-emaildialog-container'
        if(!pl.containerId){
            pl.containerId='icn-emaildialog-container';
        }
        let container = document.getElementById(pl.containerId);
        if (!container) {
            container = document.createElement('div');
            container.setAttribute('id', pl.containerId);
            document.body.appendChild(container);
        }
        
        ReactDOM.render(
        <Provider store={store}>
            <EmailDialog  
                fields={pl.customFields}
                attachments={pl.attachments} 
                attachmentType={pl.attachmentType} 
                attachmentVersion={pl.attachmentVersion} 
            />
        </Provider>
        , container)
    }

    removeEmailDialog(pl) {
        if(!pl.containerId){
            pl.containerId='icn-emaildialog-container';
        }
        const container = document.getElementById(pl.containerId);
        if(container){
            ReactDOM.unmountComponentAtNode(container);
        }
    }
}