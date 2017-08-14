import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Coming_Page from './coming_soon';


 

class Coming extends Component {

  render(){
      return(
      <div>          
        <Coming_Page/>        
      </div>
    );
  }
}
class Header extends Component{ 
    handleClick(){
    location.reload();   
   
  }
  
  render(){   
    return (
      <MuiThemeProvider>
      <Router>      
        <div>                                                       
                  <Route exact path="/" component={Coming}/>
                  <Route path="/coming_soon" component={Coming}/>
          </div>
      </Router>
      </MuiThemeProvider>
    );
  }
};
export default Header