import React from 'react'

export default class ColumnSetting extends React.Component{
    
    toggleMagazineViewChange = (id , e) => {
        e.preventDefault();
        const onMagazineViewChange = this.props.onMagazineViewChange;
        onMagazineViewChange(id);
        setTimeout(()=>{this.forceUpdate()},100);
    }

    toggleDetailsViewChange = (id , e) => {
        e.preventDefault();
        const onDetailsViewChange = this.props.onDetailsViewChange;
        onDetailsViewChange(id);
        setTimeout(()=>{this.forceUpdate()},100);
    }

    settingSelected = (id, e) => {
        e.preventDefault();
        const onItemSelected = this.props.onItemSelected;
        onItemSelected(id);
    }

    render(){
        return (
            <li 
                className= {this.props.disabled + ' ' + this.props.active + ' list-group-item'} 
                onClick={(e) => {this.settingSelected(this.props.id, e)}}>
                <table width = '100%'>
                    <tbody>
                        <tr>
                            <td width='70%'>{this.props.children}</td>                                
                            <td width='15%'>
                                <input 
                                    type='checkbox' 
                                    checked={this.props.detailsView? true : false} 
                                    onChange = {(e) => {this.toggleDetailsViewChange(this.props.id, e)}}/>
                            </td>
                            <td width='15%'>
                                <input 
                                    type='checkbox' 
                                    checked={this.props.magazineView? true : false} 
                                    onChange = {(e) => {this.toggleMagazineViewChange(this.props.id, e)}}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </li>
        )
    }
}