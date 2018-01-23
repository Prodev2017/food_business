import React, { Component } from 'react';
import AboutHowWorksTileComponent from './AboutHowWorksTileComponent';

class AboutHowWorksComponent extends Component {
  render() {

    return (
        <div>
         <div className="main_title">
            <h2 className="nomargin_top">How to Kumba?</h2>
        </div>
        <div className="row">
            <AboutHowWorksTileComponent id="one" stepNum='1' title="Talk to Kumba" details="Like Kumba's page on Facebook and send him a message to start the order process on Messenger." > </AboutHowWorksTileComponent>
            <AboutHowWorksTileComponent id="two" stepNum='2' title="Select your choices" details="Enter your pincode or address and select your favourite restaurant. Then select your meal choices from the menu." > </AboutHowWorksTileComponent>
            <AboutHowWorksTileComponent id="three" stepNum='3' title="Share with Friends" details="If it is a group order, use Kumba to share it to friends so that they can add their orders." > </AboutHowWorksTileComponent>
            <AboutHowWorksTileComponent id="four" stepNum='4' title="Order and Enjoy" details="Pay for yourself or your friends through our secure checkout system and enjoy your meal." > </AboutHowWorksTileComponent>
        </div>
        </div>
    );
  }
}

export default AboutHowWorksComponent;
