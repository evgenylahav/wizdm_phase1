import React, {Component} from 'react';
require('../../scss/style.scss');


class App extends React.Component {
      render() {
        return (
          <div>
            Hello {this.props.name}
            <form action="">
              <input type="checkbox">Moses<br>
              <input type="checkbox">Tzedi 
            </form>
          </div>
        );
      }
    }

export default App
