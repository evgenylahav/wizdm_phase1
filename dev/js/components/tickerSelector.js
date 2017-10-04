import React from 'react';
require('../../scss/style.scss');
require('../../scss/main.scss');
import ReactTooltip from 'react-tooltip'

var TickersDropdownList = React.createClass({
    createSelectItems: function(list) {
         let items = [];
        //  var list = this.state.allTickers;
         for (let i = 0; i < list.length; i++) {
              items.push(<option key={i} value={i}>{list[i]}</option>);
         }
         return items;

    },
    onDropdownSelected: function(e) {
      var list = this.props.inputTickersList;
      this.props.updateActiveTicker(e.target.value);
    },
    render: function (){
      var list = this.props.inputTickersList;
      var trendsSrc = "http://www.google.com/trends/fetchComponent?hl=en-US&q=" + this.props.activeTicker + "&cmpt=q&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=330&h=200";
      var insiderUrl = "http://www.nasdaq.com/symbol/" + this.props.activeTicker + "/insider-trades";
      return(
        <div>
          <select onChange={this.onDropdownSelected}>
              <option default>Select Your Symbol</option>
              {this.createSelectItems(list)}
          </select>
          <a href={insiderUrl} target="_blank">
            <button type="button" data-tip="press this button to open the selected symbol in an insider"
              className="btn btn-success btn-sm">
              Open Insider
            </button>
            <ReactTooltip place="right" type="light" effect="float"/>
          </a>
          <br/>
          <h2>Google trends</h2>
          <h3>{this.props.activeTicker}</h3>
          <iframe width="400" height="330" src={trendsSrc}></iframe>
        </div>
      );
    }
});

export default TickersDropdownList
