import React from 'react';
import TickersDropdownList from './tickerSelector';
import MultiSelect from './multiselect';
import ArticlesTable from './articles-table';
import ReactTooltip from 'react-tooltip'

var ParentComponent = React.createClass({
  getInitialState: function(){
       var initSources = this.fetchValue(this.props.initialSourcesLst);
       var initTickers = this.fetchValue(this.props.initialTickersLst);
       var initActiveTicker = initTickers[0];

       return {tickersList: initTickers,
               activeTicker:initActiveTicker,
               sourcesList: initSources};
  },
  fetchValue: function(obj){
      var value = [];
      for(var i = 0; i < obj.length; i++) {
          var item = obj[i];
          value.push(item.value);
      }
      return(value);

  },
  updateSelectedTickers: function(value){
      console.log('updating selected tickers')

      if (typeof(value)=='string'){
        var values = value.split(',');
      }
      else{
        var values = value;
      }

      this.setState({tickersList: values});
      if (values.length==1){
        this.setState({activeTicker: values[0]});
      }
      else if (values.length>1) {
          this.setState({activeTicker: values[1]});
      }
  },
  updateActiveTicker: function(e){
      this.setState({activeTicker:this.state.tickersList[e]})
  },
  updateSelectedSources: function(value){
      console.log('updating selected sources');
      var values = value.split(',');
      this.setState({sourcesList: values});
  },
  filterArticlesList: function(tickers, sources){
      if (tickers.length==0 && sources.length==0){
        return ([]);
      }
      var articlesJSON = this.props.fullArticlesList;
      var filteredArticlesList = [];
      for(var i = 0; i < articlesJSON.length; i++) {
          var obj = articlesJSON[i];
          if (tickers.includes(obj.stock) && sources.includes(obj.origin)){
              filteredArticlesList.push(obj);
          }
      }

      return(filteredArticlesList);
  },
  render: function() {
    var tickers = this.state.tickersList;
    var sources = this.state.sourcesList;
    var articles = this.filterArticlesList(tickers,sources);
    return (
      <div>
        <br/>
        <div className="row">
          <div className="col-sm-4 col-sm-offset-1">
            <TickersDropdownList inputTickersList={tickers} activeTicker={this.state.activeTicker} updateActiveTicker={this.updateActiveTicker}/>
          </div>
          <div className="col-sm-5">
              <br/><br/><br/>
              <MultiSelect data={this.props.fullTickersLst} label="Tickers" placeholder="Select your tickers"
                  myfunc={this.updateSelectedTickers} initValue={tickers}
              />
              <MultiSelect data={this.props.fullSourcesLst} label="Sources" placeholder="Select your sources"
                  myfunc={this.updateSelectedSources} initValue={sources}
              />
              <br/>
              <button data-tip="press this button to update your personal settings" type="button"
                className="btn btn-primary btn-sm">
                Update Dashboard
              </button>
              <ReactTooltip place="right" type="light" effect="float"/>
          </div>
        </div>
        <br/><br/><br/>

        <div className="col-sm-9 col-sm-offset-1">
            <ArticlesTable articlesLst={articles}/>
        </div>
      </div>
    );
  }
});

export default ParentComponent
