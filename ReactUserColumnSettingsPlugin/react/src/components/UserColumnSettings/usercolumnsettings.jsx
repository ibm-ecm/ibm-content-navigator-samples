import React from 'react';
import { Checkbox, FormControl, Modal, Button, Glyphicon, InputGroup } from 'react-bootstrap';
import './usercolumnsettings.css';
import createStore from '../../store';
import ItemSelector from './itemselector';
import ColumnSettingsList from './columnsettingslist';
import AvailableSettingsList from './availablesettingslist';
import _ from 'lodash';

export default class UserColumnSettings extends React.Component {

    constructor(props) {
        super(props);
        this.store = createStore;
        this.state = this.store.getState();

        this.initializeDesktopRepositories();
        this.initializeUserSettings();

        // Reset user slections and filtration strings
        this.store.dispatch({ type: 'RESET_USER_INTERACTION', payload: "" });
    }

    componentDidMount() {
        this.unsubscribe = this.store.subscribe(() => {
            this.setState(this.store.getState());
        })
        this.setState({ showModal: true });
    }

    componentWilUnmount() {
        this.unsubscribe();
    }

    initializeDesktopRepositories = () => {
        let selectedRepository;
        const desktopRepos = ecm.model.desktop.repositories;
        const options = [];
        var isDefault = false;
        desktopRepos.forEach((repo, index) => {
            if (ecm.model.desktop.defaultRepositoryId === repo.repositoryId) {
                isDefault = true;
                selectedRepository = repo;
            }
            const option = {
                label: repo.displayName,
                value: repo.repositoryId,
                selected: isDefault
            };
            options.push(option);
            isDefault = false;
            this.store.dispatch({ type: 'REPOSITORY_OPTIONS_REINITIALIZED', payload: options });
            this.store.dispatch({ type: 'REPOSITORY_SELECTED', payload: selectedRepository });
        });
        this.initializeRepositoryDefaultProperties(selectedRepository);
        this.initializeRepositoryAvailableOptions(selectedRepository);
    }

    initializeUserSettings = () => {
        const keyPrefix = "UserColumnSettings";
        var key = keyPrefix + window.ecm.model.desktop.defaultRepositoryId;
        ecm.model.Request.invokePluginService("UserColumnSettingsPluginReact", "UserSettingsServiceReact", {
            requestParams: {
                userSettingsAction: "load",
                userSettingsKey: key
            },
            requestCompleteCallback: (response) => {
                const userSettings = response.userSettings;
                const adjustedSettings = [];
                for (var property in userSettings) {
                    adjustedSettings.push(userSettings[property]);
                }
                adjustedSettings.sort((a, b) => { return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0) });
                this.store.dispatch({ type: 'USER_COLUMN_SETTINGS_INITIALIZED', payload: adjustedSettings });
            }
        });
    }

    initializeRepositoryAvailableOptions = (selectedRepository) => {

        const fixedValuesIdMap = this.state.userColumnSettings.fixedValuesIdMap;
        const fixedValues = [];
        const columnData = [];
        let fixedValuesOrder = 0;

        selectedRepository.getContentClass("Document").retrieveAttributeDefinitionsForSearches((res) => {
            res.forEach((attribute) => {

                // Find all available options for valid selection
                // Filter out hidden and xs.object types.
                let item = {};
                if (!attribute.hidden && attribute.dataType != "xs.object") {
                    const detailView = (attribute.id !== "CmThumbnails" && attribute.id.substr(0, 3) != "Clb");
                    item = {
                        id: attribute.id,
                        label: attribute.label,
                        detailsView: detailView,
                        magazineView: true
                    };
                    columnData.push(item);
                }

                // Find the fixed values to be placed at the top of the userSettings list
                if (item.id == "DocumentTitle") {
                    const fixedItem = {
                        id: item.id,
                        label: fixedValuesIdMap[item.id],
                        order: fixedValuesOrder,
                        detailsView: item.detailsView,
                        magazineView: item.magazineView
                    };
                    fixedValues.push(fixedItem);
                    fixedValuesOrder++;
                }
            });
            const payload = {
                propertyList: columnData,
                fixedValues: fixedValues
            }
            this.store.dispatch({ type: 'INITIALIZE_REPOSITORY_AVAILABLE_OPTIONS', payload: payload });
        }, true);
    }

    initializeRepositoryDefaultProperties = (selectedRepository) => {
        const defaultList = {};
        const repositoryConfiguration = selectedRepository.getRepositoryConfig();
        const repositoryColumns = {};
        const repositoryColumnsArray = [];
        const folderDefaultColumns = repositoryConfiguration.getFolderDefaultColumns();
        const magazineDefaultColumns = repositoryConfiguration.getFolderMagazineDefaultColumns();

        let columnsAll = [];

        magazineDefaultColumns.forEach((column) => {
            if (columnsAll.indexOf(column) == -1 && column.indexOf("{") == -1) {
                columnsAll.push(column);
            }
        });

        folderDefaultColumns.forEach((column) => {
            if (columnsAll.indexOf(column) == -1 && column.indexOf("{") == -1) {
                columnsAll.push(column);
            }
        });

        columnsAll.forEach((column) => {
                let item = { id: column, label: column, detailsView: false, magazineView: false }
                if (folderDefaultColumns.indexOf(column) > -1) {
                    item.detailsView = true;
                }
                if (magazineDefaultColumns.indexOf(column) > -1) {
                    item.magazineView = true;
                }
                repositoryColumnsArray.push(item);
            }
        );

        this.store.dispatch({ type: 'DEFAULT_COLUMN_SETTINGS_INITIALIZED', payload: repositoryColumnsArray });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    getRepositoryTitles = () => {
        const repos = this.state.userColumnSettings.desktopRepos;
        const titles = [];
        repos.forEach((repo) => {
            titles.push({ name: repo.label, id: repo.value })
        })
        return titles
    }

    getSelectedRepository = () => {
        const repos = this.state.userColumnSettings.desktopRepos;
        let selected;
        repos.forEach((repo) => {
            if (repo.selected === true)
                selected = repo.label;
        })
        return selected;
    }

    // TODO
    // Every dispatch will call for a rerender
    // So all functions should return state change and then 
    // we should dispatch one action from here with one payload
    // rename the function to make it more meaningfull
    onSelectionChange = (selectedRepository) => {
        this.reinitializeRepositories(selectedRepository);
        this.updateSelectedRepository(selectedRepository);
        // this.initializeRepositoryDefaultProperties();
        this.reloadUserSettings(selectedRepository);
    }

    reloadUserSettings = (selectedRepository) => {
        const keyPrefix = "UserColumnSettings";
        let key = keyPrefix + selectedRepository.id;
        const desktopRepos = ecm.model.desktop.repositories;
        let selectedRepo;
        desktopRepos.forEach((repo) => {
            if (repo.id === selectedRepository.id) {
                selectedRepo = repo;
            }
        })
        this.initializeRepositoryDefaultProperties(selectedRepo);
        ecm.model.Request.invokePluginService("UserColumnSettingsPluginReact", "UserSettingsServiceReact", {
            requestParams: {
                userSettingsAction: "load",
                userSettingsKey: key
            },
            requestCompleteCallback: (response) => {
                const userSettings = response.userSettings;
                const adjustedSettings = [];
                for (var property in userSettings) {
                    adjustedSettings.push(userSettings[property]);
                }
                adjustedSettings.sort((a, b) => { return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0) });
                this.store.dispatch({ type: 'USER_COLUMN_SETTINGS_INITIALIZED', payload: adjustedSettings });
            }
        });
    }

    reinitializeRepositories = (selectedRepository) => {
        const repos = this.state.userColumnSettings.desktopRepos;

        repos.forEach((repo) => {
            repo.selected = false;
            if (repo.value === selectedRepository.id)
                repo.selected = true;
        })
        this.store.dispatch({ type: 'REPOSITORY_OPTIONS_REINITIALIZED', payload: repos });
    }

    // TODO handle removing user settings and populating new default user settings for a start
    updateSelectedRepository = (selectedRepository) => {
        const desktopRepos = ecm.model.desktop.repositories;
        let selected;
        desktopRepos.forEach((repo) => {
            if (repo.id === selectedRepository.id)
                selected = repo;
        })
        this.store.dispatch({ type: 'REPOSITORY_SELECTED', payload: selected });
    }

    defaultSettingsToggled = () => {
        this.store.dispatch({ type: 'DEFAULT_USER_SETTINGS' });
    }

    move = (direction) => {
        let ucs  = this.state.userColumnSettings;
        const _move = (item) => {
            const index = ucs.savedUserItems.indexOf(item);
            _.remove(ucs.savedUserItems, item);
            ucs.savedUserItems.splice(index + direction, 0, item);
        }

        const selectedItems = _.filter(ucs.savedUserItems, {selected: true});
        if (direction === 1) {
            !_.last(ucs.savedUserItems).selected && _.forEachRight(selectedItems, (item) => { _move(item) });
        } else {
            !_.first(ucs.savedUserItems).selected && _.forEach(selectedItems, (item) => { _move(item) })
        }

        this.setState({ userColumnSettings: ucs });
    }

    addPropertyToSettings = () => {
        let ucs = this.state.userColumnSettings;
        const removedSettings = _.remove(ucs.propertyList, (setting) => {
            return setting.selected;
        });
        ucs.savedUserItems = _.concat(ucs.savedUserItems, removedSettings);
        this.setState({
            userColumnSettings: ucs
        });
    }

    removePropertyFromSettings = () => {
        let ucs = this.state.userColumnSettings;
        const removedSettings = _.remove(ucs.savedUserItems, (setting) => {
            return setting.selected;
        });
        ucs.propertyList = _.concat(ucs.propertyList, removedSettings);
        this.setState({
            userColumnSettings: ucs
        });
    }

    saveSettings = () => {
        const keyPrefix = "UserColumnSettings";
        const key = keyPrefix + this.state.userColumnSettings.selectedRepositoryId;
        const defaultSelected = this.state.userColumnSettings.userDefaultSettings;
        const userSettings = this.state.userColumnSettings.savedUserItems;
        const savedSettings = {};
        let savedSettingsString = null;

        if (!defaultSelected) {
            userSettings.forEach((setting) => {
                setting.selected = false;
                savedSettings[setting.id] = setting;
            });
            savedSettingsString = JSON.stringify(savedSettings);
        }

        ecm.model.Request.invokePluginService("UserColumnSettingsPluginReact", "UserSettingsServiceReact", {
            requestParams: {
                userSettingsAction: "save",
                userSettings: savedSettingsString,
                userSettingsKey: key
            },
            requestCompleteCallback: () => {
                this.closeModal();
            }
        });
    }

    filterAvailableList = (event) => {
        const filterText = event.target.value;
        this.store.dispatch({ type: 'FILTER_TEXT_CHANGED', payload: filterText });
    }

    clearFilter = (event) => {
        event.preventDefault();
        this.store.dispatch({ type: 'FILTER_TEXT_CHANGED', payload: "" });
    }

    testingFunction = () => {
        this.initializeRepositoryAvailableOptions();
    }

    render() {
        return (
            <Modal id="icn-user-setting-dialog" show={this.state.showModal} onHide={this.close} bsSize="large">
                <Modal.Header>
                    <Modal.Title> Set Display Preferences for column </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Select the column properties that you would like to be displayed in Browse view</div>
                    <div>
                        <ItemSelector
                            selectedTitle={this.getSelectedRepository()}
                            titles={this.getRepositoryTitles()}
                            id="Repository Selector"
                            onSelectionChange={this.onSelectionChange} />
                    </div>

                    <Checkbox
                        inline
                        onChange={() => this.defaultSettingsToggled()}
                        checked={this.state.userColumnSettings.userDefaultSettings}>
                        Use the default Browse view settings
                    </Checkbox>
                    <div className="row">
                        <div className="col-md-4">
                            <InputGroup>
                                <FormControl
                                    type="input"
                                    // style = {{width: '25%'}}
                                    placeholder="Filter available list"
                                    onChange={this.filterAvailableList}
                                    value={this.state.userColumnSettings.filtrationText}>
                                </FormControl>
                                <InputGroup.Addon
                                    style={{ border: "none", backgroundColor: "white" }}
                                    onClick={(event) => { this.clearFilter(event) }}>
                                    <Glyphicon glyph={this.state.userColumnSettings.filtrationText == "" ? "" : "remove"} />
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-5">
                            <AvailableSettingsList
                                selectedProperty={this.state.userColumnSettings.propertySelected}
                                disabled={this.state.userColumnSettings.userDefaultSettings ? 'disabled' : ''}
                                properties={this.state.userColumnSettings.propertyList}
                                filterText={this.state.userColumnSettings.filtrationText}
                                userSettings={this.state.userColumnSettings.savedUserItems} />
                        </div>
                        <div className="col-md-1 ucs-navmenu" id="ucs-leftright">
                            <Button onClick={() => { this.addPropertyToSettings() }}>
                                <Glyphicon glyph="menu-right" />
                            </Button>
                            <Button onClick={() => { this.removePropertyFromSettings() }}>
                                <Glyphicon glyph="menu-left" />
                            </Button>
                        </div>
                        <div className="col-md-5">
                            <ColumnSettingsList
                                default={this.state.userColumnSettings.userDefaultSettings}
                                savedUserItems={this.state.userColumnSettings.savedUserItems}
                                properties={this.state.userColumnSettings.propertyList}
                                repositoryDefaults={this.state.userColumnSettings.repositoryDefaultProperties}
                                fixedValues={this.state.userColumnSettings.fixedValues} />
                        </div>
                        <div className="col-md-1 ucs-navmenu" id="ucs-updown">
                            <Button onClick={() => { this.move(-1) }}>
                                <Glyphicon glyph="menu-up" />
                            </Button>
                            <Button onClick={() => { this.move(1) }}>
                                <Glyphicon glyph="menu-down" />
                            </Button>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => { this.saveSettings() }}>OK</Button>
                    <Button onClick={this.closeModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}