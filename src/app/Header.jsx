import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import search component here
class Header extends Component {
  constructor(props) {
    super(props);
    this.logsOut = this.logsOut.bind(this);
  }
  logsOut() {
    axios.post('/logout', { logmeout: true });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              style={{ backgroundColor: '#221aba' }}
              title="Bird Watch"
              iconElementLeft={
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon color="white" /></IconButton>} >
                  <MenuItem primaryText="Map" containerElement={<Link to='/map' />} />
                  <MenuItem primaryText="Search" containerElement={<Link to='/search' />} />
                  <MenuItem primaryText="Timeline" containerElement={<Link to='/timeline' />} />
                  <MenuItem primaryText="My Bird List" containerElement={<Link to='/profile' />} />
                  <MenuItem primaryText="Logout" containerElement={<Link to='/logout' />} onClick={e => this.logsOut(e)} />
                </IconMenu>
              }
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
