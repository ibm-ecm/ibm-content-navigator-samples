import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default class AvailableColumnList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.properties) {
            this.setState({ propList: nextProps.properties });
        }
    }

    settingSelected = (id, e) => {
        e.preventDefault();
        const onItemSelected = this.props.onItemSelected;
        onItemSelected(id);
    }

    sortList = (list) => {
        list.sort((a, b) => {
            const labelA = a.label.replace(/ /g, '').toLowerCase();
            const labelB = b.label.replace(/ /g, '').toLowerCase();
            if (labelA < labelB)
                return -1;
            if (labelA > labelB)
                return 1;
            return 0;
        })
    }

    filterList = (list, filter) => {
        return list.filter((item) => {
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
                if (setting.id == item.id) {
                    add = false;
                }
            })

            // filter out if its the Document Title
            if (item.id == "DocumentTitle") {
                add = false;
            }

            return add;
        })
    }

    isActive = (property) => {
        return property.selected ? 'active': ''
    }

    onRowClick = (e, index) => {
        let items = this.state.propList;
        if (this.props.disabled === 'disabled') {
            return false;
        }

        if (!event.metaKey && !event.ctrlKey) {
            // reset selection
            items = items.map((item) => {
                item.selected = false;
                return item; 
            })
        } 

        items[index].selected = true;
        // update selected items
        this.setState({ propList: items });
        // updated parent component with new selected properties
        this.props.properties = items;
    }

    render() {
        const filter = this.props.filterText;
        const userSettings = this.props.userSettings;
        let propertyList = this.props.properties;
        propertyList = this.filterList(propertyList, filter);
        propertyList = this.filterUserSettings(propertyList, userSettings);
        this.sortList(propertyList);

        const properties = this.state.propList.map((property, index) => {
            return <li
                key={property.id}
                className={this.props.disabled + ' ' + (this.isActive(property)) + ' list-group-item'}
                onClick={(e) => { this.onRowClick(e, index) }}>
                { property.label }
            </li>
        })

        return (
            <ListGroup componentClass='ul'>
                <th className='list-group-item'>
                    Available Properties
                </th>
                <div className="ucs-avail-list ucs-avail-column-height">
                    { properties }
                    { properties.length === 0 && <div id="ucs-loading-props">Loading Property...</div>}
                </div>
            </ListGroup>
        )
    }
}