import React, {Component} from 'react';
import ReactSignupLoginComponent from 'react-signup-login-component';
import SkyLight from 'react-skylight';


const LoginPage = (props) => {
    const signupWasClickedCallback = (data) => {
      console.log(data);
      alert('Signup callback, see log on the console to see the data.');
    };
    const loginWasClickedCallback = (data) => {
      console.log(data);
      alert('Login callback, see log on the console to see the data.');
    };
    const recoverPasswordWasClickedCallback = (data) => {
      console.log(data);
      alert('Recover password callback, see log on the console to see the data.');
    };
    return (
        <div>
            <ReactSignupLoginComponent
                title="Welcome to wiZdm Login..."
                handleSignup={signupWasClickedCallback}
                handleLogin={loginWasClickedCallback}
                handleRecoverPassword={recoverPasswordWasClickedCallback}
            />
        </div>
    );
};


class ModalWindow extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
      <div>
        <section>
          <button onClick={() => this.refs.simpleDialog.show()}>Open Modal</button>
        </section>
        <SkyLight hideOnOverlayClicked ref="simpleDialog">
          <LoginPage/>
        </SkyLight>
      </div>
    )
  }
}

export default ModalWindow;
