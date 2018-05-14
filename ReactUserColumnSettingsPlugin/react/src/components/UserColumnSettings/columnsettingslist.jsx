import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ColumnSetting from './columnsetting';
import _ from 'lodash';

/**
 * Showing user's column setting list
 */
export default class ColumnSettingsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedValues: [],
            savedUserItems: [],
            repositoryDefaults: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.savedUserItems)
            this.setState({ savedUserItems: nextProps.savedUserItems });
        
        if (nextProps.fixedValues) 
            this.setState({ fixedValues: nextProps.fixedValues });

        if (nextProps.default) 
            this.setState({ savedUserItems: nextProps.repositoryDefaults});
        
    }

    getLabelFromId = (id) => {
        const available = this.props.properties;
        let label = id;
        available.forEach((option) => {
            if (option.id === id)
                label = option.label;
        });
        return label;
    }

    _selectRange = (items, start, end) => {
        for(let i = start; i < end; i++) {
            items[i].selected = true;
        }
    }

    settingClick = (event, index) => {
        let { savedUserItems } = this.state; 

        if(event.shiftKey) {
            // range selection with shiftkey
            let selIndex = _.findIndex(savedUserItems, {selected: true});
            if (selIndex === -1) {
                savedUserItems[index].selected = true;
            } else if (index < selIndex) {
                this._selectRange(savedUserItems, index, selIndex);
            } else {
                selIndex = _.findLastIndex(savedUserItems, {selected: true});
                this._selectRange(savedUserItems, selIndex, index+1);
            }

        } else if (event.metaKey || event.ctrlKey) {
            // individual selection with ctrl or command key
            savedUserItems[index].selected = true;
        } else {
            savedUserItems.forEach((setting) => {
                setting.selected = false;
            });
            savedUserItems[index].selected = true;
        }

        this.setState({
            savedUserItems: savedUserItems
        });  
    }

    toggleDetailView = (index, viewState) => {
        let { savedUserItems } = this.state;
        savedUserItems[index].detailView = viewState;
        this.setState({ savedUserItems : savedUserItems });
    }

    toggleMagazinView = (index, viewState) => {
        let { savedUserItems } = this.state;
        savedUserItems[index].magazineView = viewState;
        this.setState({ savedUserItems : savedUserItems });
    }

    render() {
        const { fixedValues, savedUserItems } = this.state;
    
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
                                disabled="disabled"
                                settingItem={setting}
                            >
                                {setting.label}
                            </ColumnSetting>)
                        })
                    }
                    {
                        savedUserItems.map((setting, index) => {
                            let item = setting;
                            return (<ColumnSetting
                                key={index}
                                index={index}
                                id={setting.id}
                                disabled={this.props.default ? 'disabled' : ''}
                                active={setting.selected ? 'active':''}
                                settingClick={this.settingClick}
                                toggleDetailView={this.toggleDetailView}
                                toggleMagazineView={this.toggleMagazineView}
                                settingItem={item}
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