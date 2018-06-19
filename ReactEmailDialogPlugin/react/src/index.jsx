import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store"
import EmailDialog from './components/EmailDialog/emaildialog'
import { ReactLoader } from "./services/reactloader";
import { ReactMessageService } from "./services/reactmessage";
import { GlobalMessage as gMsg } from './services/gmessage'
import './3pt/ap-components/ap-components-react.min.css';

if(!window.icnReactLoader || !window.icnReactService){
    window.icnReactLoader = new ReactLoader();
}

const renderEmailDialog = (pl) =>{
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
    console.log("Start to render Email Dialog")
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

const removeEmailDialog =(pl)=> {
    const container = document.getElementById(pl.containerId);
    if(container){
        ReactDOM.unmountComponentAtNode(container);
    }
}
icnReactLoader.registerRender(gMsg.RENDER_EMAIL_DIALOG, renderEmailDialog);
icnReactLoader.registerRender(gMsg.REMOVE_EMAIL_DIALOG, removeEmailDialog);