import React, { Component }from 'react';
import axios from 'axios';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Dialog, FlatButton, TextField, RaisedButton } from 'material-ui/';

class Comment extends Component {
  constructor(props){
    super(props);
    this.state = { open: false, birdType: '', location: '' };
    this.handleClose = this._handleClose.bind(this);
    this.handleOpen = this._handleOpen.bind(this);
    this.submitText = this._submitText.bind(this);
  }
  _submitText(e) {
    console.log('trying to submit');
    const message = {birdType: this.state.birdType, location: this.state.location}
    axios.post('/birds', message)
    .then(response => {
      console.log(response, 'success')
    })
    .catch(err => console.log(err));
  }
  _handleClose() {
    this.setState({ open: false });
  }
  _handleOpen() {
    this.setState({open: true});
  }
  render() {
    const actions = [
      <FlatButton
        type="reset"
        label="Reset"
        secondary={true}
        style={{ float: 'left' }}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        type="submit"
        label="Submit"
        primary={true}
        onClick={this.submitText}
      />,
    ];

    return (
      <div>
        <RaisedButton label='Log bird Sighting' onTouchTap={this.handleOpen} />

        <Dialog
          title="Log Bird Sightings"
          modal={true}
          open={this.state.open}
        >
          <form action='/bird' 
                method='POST' 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thanks for adding a comment');
                  this.handleClose(); }}
          >
          Log the location and type of bird that you have spotted.
            <TextField name="text" hintText="birdType" onChange={(e, newVal) => this.setState({birdType: newVal})}/>
            <TextField name="text" hintText="location" onChange={(e, newVal) => this.setState({location: newVal})}/>
            <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px'}}>
              {actions}
            </div>
          </form>
        </Dialog> 
      </div>  
    );  
  }
}; 


export default Comment;