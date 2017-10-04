import React, {Component} from 'react';
require('../../scss/style.scss');
require('../../scss/main.scss');

var Comment = React.createClass({
    getInitialState: function(){
    return {editing: false};
    },
    edit: function(){
       this.setState({editing: true});
    },
    save: function(){
       var val = this.refs.newText.value;
       this.props.updateCommentText(val, this.props.index);
       this.setState({editing: false});
    },
    remove: function(){
       console.log('removing')
       this.props.deleteFromBoard(this.props.index);
    },
    renderNormal: function(){
       return(
          <div className="commentContainer">
             <div className="commentText">{this.props.children}</div>
                 <button onClick={this.edit} className="button-primary">Edit</button>
                 <button onClick={this.remove} className="button-danger">Remove</button>
             </div>
       );
    },
    renderForm: function(){
       return(
          <div className="commentContainer">
              <textarea ref="newText" defaultValue={this.props.children}></textarea>
              <button onClick={this.save} className="button-success">Save</button>
          </div>
       );
    },
    render: function (){
       if (this.state.editing){
          return this.renderForm();
       }
       else{
          return this.renderNormal();
       }
    }
});

var Board = React.createClass({
    getInitialState: function(){
       return {comments: []};
    },
    add: function(text){
       var arr = this.state.comments;
       arr.push(text);
       this.setState({comments: arr});
    },
    removeComment: function(i){
       var arr = this.state.comments;
       arr.splice(i,1);
       this.setState({comments: arr});
    },
    updateComment: function(newText,i){
       var arr = this.state.comments;
       arr[i] = newText;
       this.setState({comments: arr});
    },
    eachComment: function(text,i){
       return(
         <Comment key={i} index={i} updateCommentText={this.updateComment} deleteFromBoard={this.removeComment}>
              {text}
         </Comment>);
    },
    render: function(){
        return(
          <div>
             <button onClick={this.add.bind(null,'default text')} className="button-info create">Add text</button>
             <div className="board">
                {this.state.comments.map(this.eachComment)}
             </div>
          </div>
        );
    }
});

export default Board
