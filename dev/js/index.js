import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import ParentComponent from './components/parent-selectors';
import Header2 from './components/header2';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Favicon from 'react-favicon';

var SOURCES = require('./data/sources');
var initSources = require('./data/init-sources');
var TICKERS = require('./data/tickers');
var initTickers = require('./data/init-tickers');
var ARTICLES = require('./data/articles');

ReactDOM.render(
  <div>
    <Favicon url={'http://i68.tinypic.com/2h5nsih.png'}/>
    <MuiThemeProvider>
      <Header2 userName="Kodon"/>
    </MuiThemeProvider>
    <ParentComponent
        fullSourcesLst={SOURCES} fullTickersLst={TICKERS} fullArticlesList={ARTICLES}
        initialTickersLst={initTickers} initialSourcesLst={initSources}
    />
  </div>, document.getElementById('root'));
