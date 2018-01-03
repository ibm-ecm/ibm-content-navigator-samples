import React from 'react'
import createStore from '../../store'
import { ListGroup } from 'react-bootstrap'
import ColumnSetting from './columnsetting'

export default class ColumnSettingsList extends React.Component {
    constructor(props) {
        super(props);
        this.store = createStore;
        this.state = this.store.getState();
        this.setState({
            fixedValues: [],
            savedUserItems: [],
            repositoryDefaults: []
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.savedUserItems)
            this.setState({ savedUserItems: nextProps.savedUserItems });
        
        if (nextProps.fixedValues) 
            this.setState({ fixedValues: nextProps.fixedValues });

        if (nextProps.repositoryDefaults) 
            this.setState({ repositoryDefaults: nextProps.repositoryDefaults });

        if (nextProps.default)
            this.setState({ savedUserItems: nextProps.repositoryDefaults});
        
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        })
    }

    componentWilUnmount() {
        this.unsubscribe();
    }

    onItemSelected = (settingId) => {
        const selected = this.state.userColumnSettings.userItemSelectedId
        if (selected != settingId)
            this.store.dispatch({ type: 'ITEM_SELECTED', payload: settingId });
    }

    getLabelFromId = (id) => {
        const available = this.props.properties;
        let label = id;
        available.forEach((option) => {
            if (option.id == id)
                label = option.label;
        });
        return label;
    }

    resetSelection = () => {
        const { savedUserItems } = this.state.userColumnSettings;
        savedUserItems.forEach((setting) => {
            setting.selected = false;
        });

        this.setState({ 
            savedUserItems: savedUserItems
        });
    }

    settingClick = (index) => {
        let { savedUserItems } = this.state.userColumnSettings;

        // if user don't hold cmd or ctrl; need to reset multiselect
        if (!event.metaKey && !event.ctrlKey) {
            savedUserItems.forEach((setting) => {
                setting.selected = false;
            })
        }
        savedUserItems[index].selected = true;
        this.setState({
            savedUserItems: savedUserItems
        });  
    }

    render() {
        const { fixedValues, savedUserItems } = this.state.userColumnSettings;

        return (
            <ListGroup componentClass='ul'>
                <li className='list-group-item'>
                    <table >
                        <tbody>
                            <tr><th width='70%'>Selected Properties</th><th width='15%'>Details View</th><th width='15%'>Magazine View</th></tr>
                        </tbody>
                    </table>
                </li>
                <div className="ucs-avail-list ucs-user-column-height">
                    {
                        fixedValues.map((setting, index) => {
                            return (<ColumnSetting
                                key={index}
                                detailsView={setting.detailsView}
                                magazineView={setting.magazineView}
                                disabled="disabled"
                                settingItem={setting}
                            >
                                {this.props.default ? this.getLabelFromId(setting.label) : setting.label}
                            </ColumnSetting>)
                        })
                    }
                    {
                        savedUserItems.map((setting, index) => {
                            return (<ColumnSetting
                                key={index}
                                index={index}
                                id={setting.id}
                                detailsView={setting.detailsView}
                                magazineView={setting.magazineView}
                                disabled={this.props.default ? 'disabled' : ''}
                                active={setting.selected ? 'active':''}
                                settingClick={this.settingClick}
                                settingItem={setting}
                            >
                                {this.props.default ? this.getLabelFromId(setting.label) : setting.label}
                            </ColumnSetting>)
                        })
                    }
                </div>
            </ListGroup>
        )
    }
}