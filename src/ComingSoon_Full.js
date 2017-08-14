import React, { Component } from 'react';
import GifPlayer from 'react-gif-player';
import { Row, Col} from 'react-bootstrap';
import CookieBanner, { cookie }  from 'react-cookie-banner';
import Carousel from 'nuka-carousel';
import $ from 'jquery';
import terms from './img/Foodbots_LegalDocs.pdf';
import AboutHowWorksComponent from './AboutHowWorksComponent.js';

import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';

import HeaderVideo from './js/video_header.js';
import video_fix from './img/video_fix.png';
import logo from './img/logo_2.png';
import facebook from './img/find_us_on_facebook.png';
import twitter from './img/Follow_Us_Twitter.png';

import takeaway from './img/takeaway.png';
import table from './img/table.png';
import preorder from './img/preorder.png';

//import groupother from './img/grouporder.gif';
//import groupkumba from './img/groupkumba.png';

import howto from './img/howto2.gif';
import howtocap from './img/howtocap.jpg';
import CookieMessage from './CookieMessage';

const style = {
  margin: 0,
};
export default class Qualification extends Component {
    
   constructor(props) {
    super(props);
    cookie('accepts-cookies', '');
    /*this.state={};*/
    this.state = {
      modalIsOpen: false,
      dismissOnScroll: false,
      valid_email : false,
      email : ''
    };
    this.someData = 'normal';
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.err_v = false;
  }

  
  resetCookies = () => {
    cookie('accepts-cookies', '');
    this.forceUpdate();
  }

  toggleDismissOnScroll = () => {
    this.setState({ dismissOnScroll: !this.state.dismissOnScroll });
  }

  onAccept = () => this.forceUpdate()

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';

  }

  closeModal() {
      this.setState({modalIsOpen: false});
      if(this.someData === 'success')
      {
        window.location.href='/home';  
      }
      else if(this.someData === 'failed')
      {        
        window.location.href=location.href;   
      }    
  }
   
  previousLocation = this.props.location;
  
  componentDidMount() {
    $(document).ready(function() {      
      HeaderVideo.init({
        container: $('.header-video'),
        header: $('.header-video--media'),
        videoTrigger: $("#video-trigger"),
        autoPlayVideo: true
      });
    });    
  }
 
  submit(e){
    e.preventDefault(); 
    this.someData = 'normal';       
    var email = document.getElementById('email_newsletter').value;  

    $.ajax({
      url: 'https://api.foodbots.co/subscribe',
      dataType: 'json',
      type: 'POST',
      data: {email: email},
      success: function(data) {          
        this.someData = 'success';
        this.setState({data: data});  
        /*window.location.href='/home';     */
      }.bind(this),
      error: function(xhr, status, err) { 
        if ( email === "") {
          this.err_v = true;
          this.someData = 'invalid';
        } else if(email.match()) {          
          this.someData = 'failed';
        }
        this.openModal();   

        /*console.error('https://api.foodbots.co/subscribe', status, err.toString());        */
      }.bind(this)
    });            
  }

handleUserInput = function(e) {
  const value = e.target.value;
  this.setState({email: value},() => { this.validateEmailField(value)});
}

validateEmailField = function(value) {
  var emailValid = this.state.valid_email;
  emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  this.setState({valid_email: emailValid});
}
 
  render(){
    var text_b = <strong style={{color:"black"}}>This account is already registered.</strong> ;
   var form_b = <form autoComplete="off">                
                   <div className="col-md-5 col-md-offset-3 first-nogutter">
                        <input 
                          ref={(c) => this.email_newsletter = c} 
                          name="email_newsletter" 
                          id="email_newsletter" 
                          type="email" 
                          placeholder="Type your email and click 'Subscribe' to receive more updates" 
                          className="form-control" 
                          onChange={(event) => this.handleUserInput(event)}
                        />
                    </div>
                    <div className="col-md-1 nogutter">
                    <RaisedButton
                        id="submit-newsletter"
                        label="Subscribe"
                        backgroundColor='#6abacd'
                        labelPosition="before"
                        style={{ marginLeft: 0 }}
                        onTouchTap={this.submit.bind(this)}
                        disabled={!this.state.valid_email}    
                    />
                    </div>                                  
              </form>;

    if(!this.someData || this.someData === 'invalid'){
      text_b = <strong style={{color:"black"}}>Please enter your email before clicking Subscribe</strong>
    } else if( this.someData !== "success" && this.someData === "failed" && this.someData != null) {
      text_b = <strong style={{color:"black"}}>This account is already registered.</strong> ;
    } else if(this.someData === "success") {
       text_b = <strong style={{color:"black"}}>Thank you for subscribing.</strong> ;
    } else if(this.someData === "normal") { 
      text_b = "";           
    }

    return(
      <div>
        <CookieMessage />
       
        <section className="header-video">
          <div id="hero_video">
            <div id="sub_content">
              <h1><img src={logo} alt="" height="200" width="130" /></h1>
              <p style={{color:"black"}}>
                  A collaborative food-ordering bot using facebook Messenger
                <br />
                from Food Bots Inc.
              </p>                             
                  {text_b}
                  {form_b}               
            </div>  
          </div>
          <img src={video_fix} alt="" className="header-video--media" data-video-src={`${process.env.PUBLIC_URL}/video/intro`} data-teaser-source={`${process.env.PUBLIC_URL}/video/intro`} data-provider="vimeo"/>                   
        </section>
        <div className="container margin_60_35">
          <Row style={{textAlign:"center"}}>
            <Col md={4} style={{textAlign:"justify"}}>
              <br /><br />
              <h2 className="nomargin_top"><b>Do you need a Virtual Waiter?</b></h2>
              <p style={{textAlign:"center"}}>
                Are you tired of having a different App for each activity?<br />
                Do you want your phone and life to be less cluttered?<br />
                Would you want to multi-task while using facebook?<br /> 
                Are you tired of managing group orders?<br />
                Is it frustrating to wait for a table and then for a waiter too?<br /><br /> 
              </p>
              <h1 style={{fontFamily:"foodbots"}}><b>Meet Kumba</b></h1>
              <p style={{textAlign:"center"}}><strong>A one-stop solution. Your personal waiter!</strong></p>
              <p>
                Kumba's character combines the access of an online eatery system with the comfort of facebook Messenger. 
             </p>
             <p>
                 Group Ordering cannot be more easier either. Kumba allows you to share the order with your facebook friends so they can order for themselves.
                 </p><p>Kumba's scheduling intelligence will make sure you do not have wait at the eatery for table, or for the waiter to come to your table or even for your food while at the table.
                 Kumba also provides a unique, flexible and secure payment system to help you and your friends pay for anyone in the order.  
            </p>
            {/* <p>
                 For restaurants, Kumba provides a dashboard to make managing the orders, 
                 updating the menu and communicating to the customer very easy. As Kumba grows, he can provide
                 smart statistical analyses for business.
            </p>*/}
            {/*  <p>
                 For restaurants, Kumba will help manage orders and also schedule chefs and waiters.
                 Kumba will act as a personal employee who makes sure that their productivity is at an all-time high.
                 You can be assured that the waiting time would be minimal when Kumba takes your orders.
            </p>*/}
              <h2><b>Just use facebook Messenger</b></h2>
              <p>
                 You can meet Kumba through your facebook messenger.
                No skipping chats, no missing friend's stories and no extra effort taken. 
                All you need to do is Like Kumba on facebook and start messaging him to get him at your service.
                 No more pain of downloading, installing, opening and using another App. 
                 Free your phone's memory and make ordering a pleasant experience.
            </p>
            <h2><a href="https://www.facebook.com/meetkumba"><img alt="" width="240" src={facebook} /></a></h2>
            <h2><a href="https://twitter.com/meetkumba"><img alt="" width="240" src={twitter} /></a></h2>
            </Col>
            <div style={{textAlign:"center"}}>
              <hr className="more_margin hidden-md hidden-lg"/>
              <div className="main_title">
              <h2 className="nomargin_top"><br />First Look</h2>
            </div>
              <GifPlayer gif={howto} still={howtocap} />
              </div>
            </Row>
            <Row>
              
            <hr className="more_margin"/>
            <div className="main_title">
              <h2 className="nomargin_top">Kumba's Unique Features</h2>
            </div>
            <div className="row">
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
                <div className="feature">
                  <i className="icon_mobile"></i>
                  <h4 style={{fontSize:25}}><b>Stay on Messenger</b></h4>
                  <p style={{textAlign:"justify"}}>
                     By just messaging Kumba, he will become a chat window on your Messenger app. Nothing new to install and you can continue chatting with your friends while ordering.
                     </p>
                </div>
              </div>

              <div className="col-md-6 wow fadeIn" data-wow-delay="0.2s">
                <div className="feature">
                  <i className="icon_chat"></i>
                  <h4 style={{fontSize:25}}><b>Group Ordering</b></h4>
                  <p style={{textAlign:"justify"}}>
                     If you are ordering with a group, Kumba will share the order with your friends so that they can add their own items through their own Messenger. Kumba will manage everything.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.4s">
                <div className="feature">
                  <i className="icon_adjust-horiz"></i>
                  <h4 style={{fontSize:25}}><b>Intelligent Waitlist</b></h4>
                  <p style={{textAlign:"justify"}}>
                     During busy days, Kumba will make sure you do not have to wait idly at the location. Kumba's intelligent waitlist management
                     will send you a message as soon as a table is about to be free for you.</p>
                </div>
              </div>
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
                <div className="feature">
                  <i className="icon_menu-square_alt2"></i>
                  <h4 style={{fontSize:25}}><b>On-demand Menu</b></h4>
                  <p style={{textAlign:"justify"}}>
                     Once at your table, Kumba becomes your instant personal waiter. Browse the menu and tell Kumba what you like. It will be communicated to the chef just like any waiter. 
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.4s">
                <div className="feature">
                  <i className="icon_clock_alt"></i>
                  <h4 style={{fontSize:25}}><b>Pre-select Items</b></h4>
                  <p style={{textAlign:"justify"}}>
                     Kumba can already be your personal waiter before reaching the table. You can select the items
                     beforehand and Kumba will make sure they are ready when you arrive.</p>
                </div>
              </div>
              <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
                <div className="feature">
                  <i className="icon_creditcard"></i>
                  <h4 style={{fontSize:25}}><b>Personalize payments</b></h4>
                  <p style={{textAlign:"justify"}}>
                     If dining with a group, Kumba will split cheques and manage payments so that you dont need to split hairs.
                     Moreover, Kumba allows you to pay through a variety of secure options.
                  </p>
                </div>
              </div>
            </div>        
          </Row>
            <hr className="more_margin"/>
            <div className="main_title">
            <h2 className="nomargin_top">How to Kumba?</h2>
            </div>
            <div style={{width:500,margin:"auto"}} className="hidden-sm hidden-xs">
            <Carousel autoplay="True" wrapAround="True">
              <img src={takeaway} alt=""/>
              <img src={table} alt=""/>
              <img src={preorder} alt=""/>
            </Carousel>
            </div>
            <div className="hidden-md hidden-lg">
            <Carousel autoplay="True" wrapAround="True">
              <img src={takeaway} alt=""/>
              <img src={table} alt=""/>
              <img src={preorder} alt=""/>
            </Carousel>
            </div>
        <hr className="more_margin hidden-sm hidden-xsn"/>
          <div className="container-fluid hidden-sm hidden-xs">
            <div className="row">
              <div className="col-md-6 nopadding features-intro-img">
                <div className="features-bg">
                  <div className="features-img">
                    
                  </div>
                </div>
              </div>
              <div className="col-md-6 nopadding">
                <div className="features-content">
                  <h1 style={{color:'white',fontFamily:"foodbots"}}>"What's Food Bots Inc.?"</h1>
                  <br />
                  <p style={{textAlign:"justify"}}>
                    Food Bots Inc. aims to create chatbots that help get the food, customers want and need, without compromising the taste
                    </p>
                  <p style={{textAlign:"justify"}}>
                   Kumba is the first chatbot, a waiter assistant, that comes out of FoodBots' factory. He will serve you as a personal assistant to order food from your facebook Messenger.
                   </p>
                </div>
              </div>
            </div>
          </div>                  
        </div>
      </div>
      );
  }
}