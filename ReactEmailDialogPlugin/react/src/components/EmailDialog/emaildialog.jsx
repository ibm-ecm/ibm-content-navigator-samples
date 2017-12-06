import React from 'react'
import { connect } from 'react-redux'
import Button from '../../3pt/ap-components/components/Button'
import TextField from '../../3pt/ap-components/components/TextField'
import Modal from '../../3pt/ap-components/components/Modal'
import Alert from '../../3pt/ap-components/components/Alert'
import { sendEmailAction, closeEmailDialog } from '../../actions/email'
import './emaildialog.css'

@connect((store) => {
  return {
    email: store.email
  };
})
export default class EmailDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: true,
            from: '',
            to: '',
            subject: '',
            message: '',
            showCC: false,
            cc: '',
            showBCC: false,
            bcc: '',
            isSending: false,
            showErrorAlert: false,
            attachments: [...this.props.attachments]
        }
    }

    componentWillUnmount() {
        this.props.dispatch(closeEmailDialog());
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isSending: nextProps.email.sending,
            showErrorAlert: nextProps.email.emailError,
            errObj: nextProps.email.errObj
        })
    }

    closeAlert = () => {
        this.setState({ showErrorAlert: false })
    }

    isModalVisible() {
        return this.state.visibleModal && !this.props.email.sent;
    }

    openModal(name) {
        this.setState({
            visibleModal: true,
        });
    }

    closeModals = () => {
        this.setState({ visibleModal: false });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    toggleCC = () => {
        this.setState({ showCC: !this.state.showCC });
    }

    toggleBCC = () => {
        this.setState({ showBCC: !this.state.showBCC });
    }

    removeAttachment = (index) => {
        // don't remove the last one
        if (this.state.attachments.length > 1) {
            this.state.attachments.splice(index, 1);
            this.setState({
                attachments: this.state.attachments
            });
        }
    }

    sendEmail = () => {
        let to = this.state.to ? this.state.to.split(","):[];
        let cc = this.state.cc ? this.state.cc.split(","):[];
        let bcc = this.state.bcc ? this.state.bcc.split(","):[];
        const data = {
            from: this.state.from,
            to: to,
            cc: cc,
            bcc: bcc,
            subject: this.state.subject,
            message: this.state.message
        };
        this.setState({ isSending: true });
        this.props.dispatch(sendEmailAction(
            data, 
            this.state.attachments, 
            this.props.attachmentVersion, 
            this.props.attachmentType
        ));
    }

    getComponent(type) {
        const Component = window.componentFactory.getComponent(type);
        return <Component />
    }

    render() {
        const fields = this.props.fields;
        const { showCC, showBCC, isSending, showErrorAlert,errObj } = this.state;
        let errorMsg ="";
        if(errObj && errObj.errors && errObj.errors.length>0){
            errorMsg =errObj.errors[0].text + '  ' +errObj.errors[0].explanation;
        }
        const attachments = this.state.attachments.map((attachment, index) => {
            return (
                <Button compact secondary icon="close" onClick={() => this.removeAttachment(index)}>
                    {attachment.name}
                </Button>
            )
        })

        // const toField = this.getComponent('emailTo');
        const ccField = showCC ? <TextField name="cc" value={this.state.cc} placeholder="CC" onChange={this.handleInputChange} /> : null;
        const bccField = showBCC ? <TextField name="bcc" value={this.state.bcc} placeholder="BCC" onChange={this.handleInputChange} /> : null;

        return (
            <div id="icn-react-email-dialog">
                <Modal
                    isOpen={this.isModalVisible()}
                    onRequestClose={this.closeModals}
                >
                    <div className="modal__header">
                        <h3>New Message</h3>
                    </div>
                    <div className="modal__body">
                        
                        <div className="icn-email-body">
                            <TextField name="from" value={this.state.from} placeholder="From" onChange={this.handleInputChange} required />
                            <TextField name="to" value={this.state.to} placeholder="To" onChange={this.handleInputChange} required />
                            <div>
                                <div id="icn-email-dialog-cc">
                                    <Button compact secondary onClick={this.toggleCC}>CC</Button>
                                    <Button compact secondary onClick={this.toggleBCC}>BCC</Button>
                                </div>
                            </div>
                            {ccField}
                            {bccField}
                            <TextField name="subject" value={this.state.subject} placeholder="Subject" onChange={this.handleInputChange} />
                            <TextField type="textarea" rows={4} name="message" value={this.state.message} onChange={this.handleInputChange} placeholder="Add a message" />
                        </div>
                        <Alert
                            id="icn-email-error-alert"
                            type="error"
                            isOpen={showErrorAlert}
                            onRequestClose={this.closeAlert}
                        >
                            {errorMsg}  Try again!
                        </Alert>
                        <div>{attachments}</div>
                        <div className="modal__buttons">
                            <Button
                                className="button__cancel"
                                hyperlink onClick={this.closeModals}
                                medium
                                semantic
                            >
                                Cancel
                            </Button>
                            <Button
                                className="no-smoothstate"
                                onClick={this.sendEmail}
                                disabled={isSending}
                                medium
                                semantic
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}