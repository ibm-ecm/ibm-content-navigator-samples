import React from 'react'

/**
 * Showing an individual column setting
 */
export default class ColumnSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsView: false,
            magazineView: false,
            settingItem: this.props.settingItem
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.settingItem) {
            this.setState({ settingItem: nextProps.settingItem });
        }
    }

    toggleMagazineViewChange = (event) => {
        const { settingItem } = this.state;
        const { toggleMagazineView, index } = this.props;
        settingItem.magazineView = !settingItem.magazineView;
        this.setState({ settingItem: settingItem });
        toggleMagazineView(index, settingItem.magazineView);
    }

    toggleDetailsViewChange = (event) => {
        const { settingItem } = this.state;
        const { toggleDetailView, index } = this.props;
        settingItem.detailsView = !settingItem.detailsView;
        this.setState({ settingItem: settingItem });
        toggleDetailView(index, settingItem.detailsView);
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
        const { settingItem } = this.state;
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
                                    checked={settingItem.detailsView}
                                    className="usc-detailview-toggle"
                                />
                            </td>
                            <td width='15%'>
                                <input
                                    type='checkbox'
                                    checked={settingItem.magazineView}
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