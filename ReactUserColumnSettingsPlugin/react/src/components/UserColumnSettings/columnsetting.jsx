import React from 'react'

export default class ColumnSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsView: false,
            magazineView: false,
            settingItem: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.detailsView) {
            this.setState({ detailsView: nextProps.detailsView });
        }

        if (nextProps.magazineView) {
            this.setState({ magazineView: nextProps.magazineView });
        }

        if (nextProps.settingItem) {
            this.setState({ settingItem: nextProps.settingItem });
        }
    }

    toggleMagazineViewChange = (event) => {
        const { magazineView } = this.state;
        this.setState({ magazineView: !magazineView });
        // setting this way faster to passback the parent & do forloop
        this.props.settingItem.magazineView = !magazineView;
    }

    toggleDetailsViewChange = (event) => {
        const { detailsView } = this.state;
        this.setState({ detailsView: !detailsView });
        // setting this way faster to passback the parent & do forloop
        this.props.settingItem.detailsView = !detailsView;
    }

    settingSelected = (event, index) => {
        if (this.props.disabled === 'disabled') {
            event.preventDefault();
            return;
        }

        if (event.target.type === 'checkbox') {
            const className = event.target.className;
            className === 'usc-detailview-toggle' && this.toggleDetailsViewChange(event);
            className === 'usc-magazineview-toggle'&& this.toggleMagazineViewChange(event);
        } else {
            this.props.settingClick(event, index)
        }
    }

    render() {
        return (
            <li
                className={this.props.disabled + ' ' + this.props.active + ' list-group-item'}
                onClick={(e) => { this.settingSelected(e, this.props.index) }}>
                <table width='100%'>
                    <tbody>
                        <tr>
                            <td width='70%'>{this.props.children}</td>
                            <td width='15%'>
                                <input
                                    type='checkbox'
                                    checked={this.state.detailsView}
                                    className="usc-detailview-toggle"
                                />
                            </td>
                            <td width='15%'>
                                <input
                                    type='checkbox'
                                    checked={this.state.magazineView}
                                    className="usc-magazineview-toggle"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

            </li>
        )
    }
}