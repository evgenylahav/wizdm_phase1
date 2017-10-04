import React from 'react';
import JumbotronComp from './jumbotrone-component';

var Header = React.createClass({
  render: function(){
    return (
      <div>
        <JumbotronComp UserName="Kodon"/>
      </div>
    );
  }
});

export default Header;
