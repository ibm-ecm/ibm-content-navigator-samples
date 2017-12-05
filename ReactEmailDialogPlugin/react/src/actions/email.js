export const sendEmailAction = (data, items, version, type = 'link') => dispatch => {
    console.log('Email Send Action');
    let i = items[0], className;
    if (i.isInstanceOf && i.isInstanceOf(window.ecm.model.Teamspace)) {
        className = i.className;
        i.repository.addRecentTeamspaces(items);
    } else {
        className = i.template;
        i.repository.addRecentItems(items);
    }

    data.items = items.map(function(item) {
        return {
            repositoryId: item.repository.id,
            repositoryType: item.repository.type,
            id: item.id,
            vsId: item.vsId,
            version: version,
            className: className,
            name: item.name || item.filename || item.template_label || item.id,
            mimeType: item.mimetype,
            partNumber: type === "allParts" || type === "allPartsPdf" ? -1 : 0,
            targetContentType: type === "pdf" || type === "allPartsPdf" ? "application/pdf" : null,
            link: type === "link" ? ecm.model.Item.getBookmark(item, version, window.ecm.model.desktop.id, item.repository.id, item.repository.type, className, window.WCProxy) : null
        }
    });

    const sendComplete = () => {
        dispatch({ type: 'EMAIL_SEND_SUCCESS' })
    }

    const sendFailed = (err) => {
        dispatch({ type: 'EMAIL_SEND_FAILED',errObj:err })
    }

    // sending request to midtier 
    window.ecm.model.Request.postServiceAPI("email", null, "text/json", {
        requestParams: {
            desktop: window.ecm.model.desktop.id
        },
        requestBody: JSON.stringify(data),
        cancellable: type !== "link" && items.length,
        notifyOnCancel: type !== "link" && items.length,
        backgroundRequest: true,
        synchronous: false,
        requestCompleteCallback: sendComplete,
        requestFailedCallback: sendFailed,
        callerHandledErrorNumbers: [ 2602 ] // disconnected error handled above
    });

}

export const closeEmailDialog = () => dispatch => {
    dispatch({ type: 'EMAIL_DIALOG_CLOSE' })
}