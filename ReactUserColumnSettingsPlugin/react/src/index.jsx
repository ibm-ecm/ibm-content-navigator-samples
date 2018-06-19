import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store"
import UserColumnSettings from './components/usercolumnsettings/usercolumnsettings'
import { ReactLoader } from "./services/reactloader";
import { ReactMessageService } from "./services/reactmessage";
import { GlobalMessage as gMsg } from './services/gmessage'

import './styles/app.css';


if(!window.icnReactLoader || !window.icnReactService){
    window.icnReactLoader = new ReactLoader();
}

const renderUserColumnSettings = (pl)=>{
    if(!pl.containerId){
        pl.containerId='icn-user-columns-container';
    }
    let container = document.getElementById(pl.containerId);
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('id', pl.containerId);
        document.body.appendChild(container);
    }
    console.log("Start to render User Column Settings dialog")
    ReactDOM.render( 
        <Provider store={store}>
            <UserColumnSettings />
        </Provider> 
    ,container);
}

const removeUserColumnSettings =(pl)=> {
    const container = document.getElementById(pl.containerId);
    if(container){
        ReactDOM.unmountComponentAtNode(container);
    }
}

icnReactLoader.registerRender(gMsg.RENDER_USER_COLUMN_SETTINGS_DIALOG, renderUserColumnSettings);
icnReactLoader.registerRender(gMsg.REMOVE_USER_COLUMN_SETTINGS_DIALOG, removeUserColumnSettings);