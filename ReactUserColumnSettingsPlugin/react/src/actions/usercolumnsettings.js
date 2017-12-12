// once all identified, extract actions for the usercolumnsettings to this class
export const retrieveColumnSettingsAction = () => dispatch =>{
    

    console.log('retrieve column settings action');
    
    const requestComplete = () => {
        console.log("Reached 1")
        dispatch({ type: 'REQUEST_TEST' })
    }

    var key = "UserColumnSettings" + window.ecm.model.desktop.defaultRepositoryId

    console.log(key)

    ecm.model.Request.invokePluginService("UserColumnSettingsPluginReact", "UserSettingsServiceReact", {
        requestParams: {
            userSettingsAction: "load",
            userSettingsKey: key
        },
        requestCompleteCallback: ()=>{
            console.log("Completed request")
        
        }
    });
}
    
    export const magazineViewSelected = (id) => dispatch => {   
        console.log('magazineViewSelected dispatch for item id ' + id )
        dispatch({
            type: 'const MAGAZINE_VIEW_SELECTED',
            id: id     
        })
        
    }