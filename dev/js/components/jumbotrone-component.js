import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import NavBarComp from './nav-bar-component';
import ModalWindow from './modal-window';

var JumbotronComp = React.createClass({
  learnMore: function(){
      console.log('learn more');
      <ModalWindow/>
  },
  render: function(){
    return (
      <div>
        <Jumbotron>
          <div className="row">
            <NavBarComp/>
            <h2 className="display-3">Hello, {this.props.UserName}!</h2>
            <p className="lead">Welcome to your personal dashboard, where you can see all the latest articles of your choice</p>
          </div>
          <div>
            <ModalWindow buttonLabel="Learn More"/>
          </div>
        </Jumbotron>
     </div>
    );
  }
});

export default JumbotronComp;
