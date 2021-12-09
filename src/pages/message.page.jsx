import React, { Component } from "react"; 
import CustomHeader from "../components/custom-header.component";
import UserPreference from "./user-preferences.component";

class MessagePage extends Component {
  render() {
    return (
      <div className='message-page'>
        <CustomHeader title='message'  path='messages' link='messages'/>
       <UserPreference/>
     </div>
    );
  }
}

export default MessagePage;