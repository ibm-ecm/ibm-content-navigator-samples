export default function reducer(state = {
    emailError: false,
    sending: false,
    sent: false
}, action) {

    switch (action.type) {
        case 'EMAIL_SEND_SUCCESS':
            console.log("-- EMAIL_RESPONDED ---");
            return {
                ...state,
                sending: false,
                sent: true
            }
        case 'EMAIL_SEND_FAILED': 
            console.log('Email Send Failed');
            return {
                ...state,
                emailError: true,
                errObj: action.errObj,
                sending: false,
                sent: false
            }
        case 'EMAIL_DIALOG_CLOSE':
            console.log("email_dialog_close");
            return {
                ...state,
                sending: false,
                sent: false
            }
        default:
            break;
    }

    return state
}