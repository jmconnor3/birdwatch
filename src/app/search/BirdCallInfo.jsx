import React from 'react';
import { FlatButton } from 'material-ui/'

const actions = [
  <FlatButton
    key={1}
    type="reset"
    label="Reset"
    style={{ float: 'left' }}
  />,
  <FlatButton
    key={2}
    label="Cancel"
    //onClick={this.handleClose}
  />,
  <FlatButton
    key={3}
    type="submit"
    label="Submit"
    //onClick={this.submitText}
  />
];
const BirdCallInfo = () => {
return (
  <div>This is what will appear
    {actions}
  </div>
)
};
export default BirdCallInfo;