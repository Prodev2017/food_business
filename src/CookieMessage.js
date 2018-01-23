
import React, {Component} from 'react';
import CookieBanner, {cookie} from 'react-cookie-banner';
import terms from './img/Foodbots_LegalDocs.pdf';

export default class CookieMessage extends Component {

constructor(props) {
    super(props);
    cookie('accepts-cookies', '');
    this.state = {
      dismissOnScroll: false,
    };
  }

toggleDismissOnScroll = () => {
    this.setState({
        dismissOnScroll: !this.state.dismissOnScroll
    });
}

render() {
    return(
        <div>
        <div style = {{ position: 'fixed',width: '100%', zIndex: 999 }}className = "hidden-sm hidden-xs" >
            <CookieBanner
                styles={{
                    banner: {
                        fontFamily: 'Source Sans Pro',
                        background: 'rgba(52, 64, 81, 0.88) url(https://rawgit.com/buildo/react-cookie-banner/master/examples/cookie.png) 20px 50% no-repeat',
                        backgroundSize: '30px 30px',
                        backgroundColor: '',
                        fontSize: '15px',
                        fontWeight: 600
                    },
                    button: {
                        border: '1px solid white',
                        borderRadius: 4,
                        width: 66,
                        height: 32,
                        lineHeight: '32px',
                        background: 'green',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 600,
                        opacity: 1,
                        right: 20,
                        marginTop: -18
                    },
                    message: {
                        display: 'block',
                        textAlign: 'center',
                        color: 'white'
                    },
                    link: {
                        textDecoration: 'underline',
                        fontWeight: ''
                    }
                }}
                message='On viewing this website, you will be accepting our '
                link={{
                    msg: 'Our Terms & Conditions and Privacy Policy',
                    url: terms
                }}
                buttonMessage='Agree'
                dismissOnScroll={this.state.dismissOnScroll}
                onAccept={this.onAccept}
            /> 
        < /div>
        <div style={{ position: 'fixed',width: '100%', zIndex: 999 }} className="hidden-md hidden-lg">
            <CookieBanner
                styles={{
                    banner: {
                        fontFamily: 'Source Sans Pro',
                        height: 40,
                background: 'rgba(52, 64, 81, 0.88) 20px 50% no-repeat',
                backgroundSize: '30px 30px',
                backgroundColor: '',
                fontSize: '9px',
                fontWeight: 600
              },
              button: {
                 border: '1px solid white',
                borderRadius: 4,
                width: 50,
                height: 32,
                lineHeight: '32px',
                background: 'green',
                color: 'white',
                fontSize: '9px',
                fontWeight: 600,
                opacity: 1,
                right: 20,
                marginTop: -18
              },
              message: {
                display: 'block',
                textAlign: 'left',
                color: 'white'
              },
              link: {
                textDecoration: 'underline',
                fontWeight: ''
              }
            }}
            message='On viewing, you agree to'
            link={{ msg: 'Our Terms & Conditions and Privacy Policy', url: terms }}
            buttonMessage='Agree'
            dismissOnScroll={this.state.dismissOnScroll}
            onAccept={this.onAccept}
          /> 
        </div>
        </div>
    )
}

}