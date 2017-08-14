import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import cards from './img/powered-by-stripe-300x139.png';
import termsonly from './img/Foodbots_Terms_and_Conditions.pdf';
import privacy from './img/Foodbots_Privacy_Policy.pdf';

export default class page_footercoming extends Component{
  render(){
   return(
     <footer>
              <Grid>
                 <Row>          
                  <Col md={4} sm={3}>
                      <h3>Secure payments</h3>
                      <p>
                          <a href="https://stripe.com/">
                          <Image src={cards} alt="" className="img-responsive"/>
                          </a>
                      </p>
                  </Col>          
                  <Col md={4} sm={3}>
                      <h3><b>About</b></h3>
                      <ul>
                          <li style={{textAlign:"center"}}><a href="https://www.facebook.com/meetkumba">Kumba on Facebook</a></li>
                          <li style={{textAlign:"center"}}><a href={termsonly}>Terms and conditions</a></li>
                          <li style={{textAlign:"center"}}><a href={privacy}>Privacy Policy</a></li>
                      </ul>
                  </Col>          
                  <Col md={4} sm={3} id="newsletter">
                      <h3>Newsletter</h3>
                      <p style={{textAlign:"center"}}>
                          Subscribe with us to get updates on Kumba's official release and more from Foodbots.
                      </p>
                      <div id="message-newsletter_2">
                      </div>              
                  </Col>          
                        
                </Row> 
              </Grid>
    </footer>
  );
  }
};
    