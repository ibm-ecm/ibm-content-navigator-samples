import React from 'react'
import { FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default class ItemSelector extends React.Component{

    handleClick = (title , e) => {
        e.preventDefault();
        const selectionChanged = this.props.onSelectionChange;
        selectionChanged(title);
    }

    render(){
        const titles = this.props.titles;
        const selectedTitle = this.props.selectedTitle;
        const id = this.props.id;
        
        // dropdown menu is disabled to enable only the default repository
        return(
            <DropdownButton bsStyle = "default" 
                            title = {selectedTitle}
                            disabled = {true}
                            id = {id}>
                {
                    titles.map((title, index) =>{
                        return (<MenuItem
                                    key = {title.id}
                                    onClick = {(e) => this.handleClick(title, e)}>
                                    {title.name}
                                </MenuItem>)
                    })
                }
            </DropdownButton>
        )
    }
}