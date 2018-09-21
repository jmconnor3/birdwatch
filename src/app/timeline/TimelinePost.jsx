import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';
import Moment from 'moment-timezone';


const TimelinePost = (props) => {
  console.log(props.props, ' after fetch');
  return (
  <Card>
    <CardTitle title={`Birdtype: ${props.props.scientific_name}`} />
    {/* <br />
    <CardTitle title={`Location: City Park`} />
    <br />
    <CardHeader
      title={`bird sighting by @user`}
      subtitle={`spotted Tuesday, sept 23`}
    /> */}
  </Card>
);
}
// ${Moment('created').calendar()}
TimelinePost.propTypes = {
  bird: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  created: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default TimelinePost;
