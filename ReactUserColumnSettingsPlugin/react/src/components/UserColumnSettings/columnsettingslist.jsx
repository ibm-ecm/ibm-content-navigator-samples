import React from 'react'
import createStore from '../../store'
import { ListGroup } from 'react-bootstrap'
import ColumnSetting from './columnsetting'

export default class ColumnSettingsList extends React.Component{

    constructor(props){
        super(props);
        this.store = createStore;
        this.state = this.store.getState();
    }

    componentDidMount(){
        this.unsubscribe = this.store.subscribe(() =>{
            this.setState(this.store.getState());
        })
    }

    componentWilUnmount(){
        this.unsubscribe();
    }

    onMagazineViewChange = (settingId) => {
        const savedUserItems = this.state.userColumnSettings.savedUserItems;
        savedUserItems.forEach((setting)=>{
            if(setting.id === settingId)
                setting.magazineView = !setting.magazineView;
        })
        this.store.dispatch({type: 'MAGAZINE_VIEW_SELECTED', payload: savedUserItems});
    }

    onDetailsViewChange = (settingId) => {
        const savedUserItems = this.state.userColumnSettings.savedUserItems;
        savedUserItems.forEach((setting)=>{
            if(setting.id === settingId)
                setting.detailsView = !setting.detailsView;
        })
        this.store.dispatch({type: 'DETAIL_VIEW_SELECTED', payload: savedUserItems});
    }

    onItemSelected = (settingId) => {
        const selected = this.state.userColumnSettings.userItemSelectedId
        if(selected != settingId)
            this.store.dispatch({type: 'ITEM_SELECTED', payload: settingId});
    }

    getActiveStatus = (setting) =>{
        const selectedSettingId = this.state.userColumnSettings.userItemSelectedId;
        if(selectedSettingId === setting.id)   
            return 'active'
        else
            return ''
    }

    getLabelFromId = (id) => {
        const available = this.props.properties;
        let label = id;
        available.forEach((option) => {
            if(option.id == id)
                label = option.label;
        });
        return label;
    }

    render(){

        const fixedValues = this.props.fixedValues;
        const userDefaultUserSettings = this.props.default;
        let displayedSettings = this.props.savedUserItems;
        if(userDefaultUserSettings){
            displayedSettings = this.props.repositoryDefaults;
        }

        return (
            <ListGroup componentClass='ul'>
                <li className = 'list-group-item'>
                    <table >
                        <tbody>
                            <tr><th width='70%'>Selected Properties</th><th width='15%'>Details View</th><th width='15%'>Magazine View</th></tr>
                        </tbody>
                    </table>
                </li>
                <div className="ucs-avail-list ucs-user-column-height">
                {
                        fixedValues.map((fixedValue, index)=>{
                            return (<ColumnSetting 
                                        key = {-index}
                                        id = {fixedValue.id}
                                        detailsView ={fixedValue.detailsView}
                                        magazineView = {fixedValue.magazineView}
                                        disabled = 'disabled'
                                        >
                                        {fixedValue.label}
                                    </ColumnSetting>)
                        })
                    }
                    {
                        displayedSettings.map((setting, index)=>{
                            return (<ColumnSetting 
                                        key = {index}
                                        id = {setting.id}
                                        detailsView ={setting.detailsView}
                                        magazineView = {setting.magazineView}
                                        onMagazineViewChange = {this.onMagazineViewChange}
                                        onDetailsViewChange = {this.onDetailsViewChange}
                                        onItemSelected = {this.onItemSelected}
                                        active = {this.getActiveStatus(setting)}
                                        disabled = {userDefaultUserSettings?'disabled':''}
                                        >
                                        {userDefaultUserSettings ? this.getLabelFromId(setting.label) : setting.label}
                                    </ColumnSetting>)
                        })
                    }
                </div>
            </ListGroup>
        )
    }
}