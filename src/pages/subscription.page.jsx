import React, { Component } from "react"; 
import CustomHeader from "../components/custom-header.component";

class SubscriptionPage extends Component {
  render() {
    return (
      <div className='subscription-page'>
        <CustomHeader title='subscription' path='subscription' link='subscription'/>
     </div>
    );
  }
}

export default SubscriptionPage;