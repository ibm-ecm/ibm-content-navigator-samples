export default function reducer(state = {
        savedUserItems:[],
        userItemSelectedId: "",   
        propertyList:[],
        propertySelected: "",
        desktopRepos:[],
        selectedRepositoryId : "",
        selectedRepository: {},
        repositoryDefaultProperties: [],
        repositoryDefaultPropertiesMap: {},
        userDefaultSettings: false,
        origDefaultSettings: false,
        fixedValues: [],
        fixedValuesIDs: ["DocumentTitle"],
        fixedValuesIdMap:{DocumentTitle : "Name"},
        filtrationText : ""
    }, action) {

    switch (action.type) {
        case 'REPOSITORY_OPTIONS_REINITIALIZED':
            return {
                ...state,
                desktopRepos : action.payload
            }
        case 'USER_COLUMN_SETTINGS_INITIALIZED':
            return {
                ...state,
                savedUserItems : action.payload
            }
        case 'REPOSITORY_SELECTED':
            return {
                ...state,
                selectedRepository : action.payload,
                selectedRepositoryId : action.payload.repositoryId
            }
        case 'INITIALIZE_REPOSITORY_AVAILABLE_OPTIONS':
            return {
                ...state,
                propertyList : action.payload.propertyList,
                fixedValues : action.payload.fixedValues
            }
        case 'DEFAULT_COLUMN_SETTINGS_INITIALIZED':
            if(action.payload){
                return {
                    ...state,
                    repositoryDefaultProperties : action.payload
                }
            }
        case 'ITEM_SELECTED':
            return {
                ...state,
                userItemSelectedId : action.payload
            }
        case 'PROPERTY_SELECTED':
            return {
                ...state,
                propertySelected : action.payload
            }
        case 'USER_SETTINGS_REORDER':
            return {
                ...state,
                savedUserItems : action.payload
            }
        case 'MAGAZINE_VIEW_SELECTED':
            return {
                ...state,
                savedUserItems : action.payload
            }
        case 'DETAIL_VIEW_SELECTED':
            return {
                ...state,
                savedUserItems : action.payload
            }
        case 'CHANGE_USER_SETTINGS':
            return {
                ...state,
                savedUserItems : action.payload.userSettings,
                propertyList : action.payload.propertyList
            }
        case 'DEFAULT_USER_SETTINGS':
            return {
                ...state,
                userDefaultSettings: !state.userDefaultSettings
            }
        case 'SETTING_SAVE_SUCCESS':
            return {
                ...state,
                origDefaultSettings: state.userDefaultSettings
            }
        case 'CANCEL_DIALOG': 
            return {
                ...state,
                userDefaultSettings: state.origDefaultSettings
            }
        case 'FILTER_TEXT_CHANGED':
            return {
                ...state,
                filtrationText: action.payload
            }
        case 'RESET_USER_INTERACTION':
            return {
                ...state,
                filtrationText : "",
                propertySelected : "",
                userItemSelectedId : ""
            }
        default:
            break;
    }

    return state
}