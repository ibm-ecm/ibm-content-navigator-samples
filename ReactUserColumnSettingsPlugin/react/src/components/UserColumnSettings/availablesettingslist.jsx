import React from 'react';
import { ListGroup } from 'react-bootstrap';
import _ from 'lodash';

/**
 * Component to show all available columns in list view 
 */
export default class AvailableColumnList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            propList: [],
            lastSelectionIndex: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        const { properties, filterText } = nextProps;
        if (properties && properties.length > 0  && _.isEmpty(filterText)) {
            this.filterProperty(properties, filterText);
        }

        if (!_.isEmpty(filterText)) {
            let list = properties;
            list = this.filterList(list, nextProps.filterText);
            this.setState({ propList: list });
        }
    }

    filterProperty = (list, filterText) => {
        // filter user input text
        list =  this.filterList(list, filterText);
        list = this.sortList(list);
        this.setState({ propList: list });
    }

    settingSelected = (id, e) => {
        e.preventDefault();
        const onItemSelected = this.props.onItemSelected;
        onItemSelected(id);
    }

    sortList = (list) => {
        return list.sort((a, b) => {
            const labelA = a.label.replace(/\s/g, '').toLowerCase();
            const labelB = b.label.replace(/\s/g, '').toLowerCase();
            if (labelA < labelB)
                return -1;
            if (labelA > labelB)
                return 1;
            return 0;
        })
    }

    /**
     * Filter available list from user input
     */
    filterList = (list, filter) => {
        return list.filter((item) => {
            const lowerCaseTitle = item.label.toLowerCase();
            const lowerCaseFilter = filter.toLowerCase();
            return lowerCaseTitle.indexOf(lowerCaseFilter) !== -1
        })
    }

    isActive = (property) => {
        return property.selected ? 'active': ''
    }

    _selectRange = (items, start, end) => {
        for(let i = start; i < end; i++) {
            items[i].selected = true;
        }
    }

    onRowClick = (event, index) => {
        let items = this.state.propList;
        if (this.props.disabled === 'disabled') {
            return false;
        }

        if (event.shiftKey) {
            // range selection with shiftkey
            let selIndex = _.findIndex(items, {selected: true});
            if (selIndex === -1) {
                items[index].selected = true;
            } else if (index < selIndex) {
                this._selectRange(items, index, selIndex);
            } else {
                selIndex = _.findLastIndex(items, {selected: true});
                this._selectRange(items, selIndex, index+1);
            }
        } else if (event.metaKey || event.ctrlKey) {
            // individual selection with ctrl or command key
            items[index].selected = true;
        } else {
            // one selection without metakey
            // reset selection first; then select item
            items = items.map((item) => {
                item.selected = false;
                return item; 
            })
            items[index].selected = true;
        }
        
        // update selected items
        this.setState({ propList: items });
        // updated parent component with new selected properties
        this.props.properties = items;
    }

    render() {
        let propertyList = this.state.propList;

        const properties = propertyList && propertyList.map((property, index) => {
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
                    { (properties && properties.length === 0) && <div id="ucs-loading-props">Loading Property...</div>}
                </div>
            </ListGroup>
        )
    }
}