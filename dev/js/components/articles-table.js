import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
require('../../scss/react-bootstrap-table.scss');



class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (
        <BootstrapTable data={ this.props.data }>
          <TableHeaderColumn dataField='title' isKey={ true }>Article Title</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p>?</p>);
    }
  }
}

export default class ExposeApiTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  handleClick = (rowKey) => {
    alert(this.refs.table.getPageByRowKey(rowKey));
  }
  handleRowSelect(row, isSelected, e) {
    console.log('selected row ', row)
  }
  imageFormatter(cell, row){
    return ("<img src='"+cell+"'/>") ;
  }
  linkFormatter(cell, row){
    return ("<a href='www.google.com'/>");
  }
  onRowClick(row){
    return('<a href={row.link} target="_blank">')
  }
  expandComponent(row) {
    return (
      <BSTable data={ row.expand } />
    );
  }
  isExpandableRow(row) {
    return true;
  }
  render() {
    var data = this.props.articlesLst;
    const options = {
      onRowClick: this.onRowClick,
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
      <div>
        <BootstrapTable
          ref='table'
          data={ data }
          pagination={ true }
          search={ true }
          options={ options }
          expandableRow={ this.isExpandableRow }
          expandComponent={ this.expandComponent }
          expandColumnOptions={ { expandColumnVisible: true }}>
          <TableHeaderColumn dataField='stock' width='13%' dataSort={true}>Stock Name</TableHeaderColumn>
          <TableHeaderColumn dataField='name' width='14%' dataSort={true}>Company Name</TableHeaderColumn>
          <TableHeaderColumn dataField='image' width='50px' dataFormat={this.imageFormatter}>Article Source</TableHeaderColumn>
          <TableHeaderColumn dataField='title' width='60%' isKey = {true} dataSort={true}>Article Title</TableHeaderColumn>
        </BootstrapTable>
      </div>
   );
  }
}
