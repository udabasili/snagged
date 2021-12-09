import React, { Component } from "react"; 
import Modal from "../components/modal.component";

class SendVerification extends Component {
  render() {
    return (
     <div className='send-verification'>
       <Modal title='Verification Sent'>
           We have emailed your verification please check
       </Modal>
     </div>
    );
  }
}

export default SendVerification;