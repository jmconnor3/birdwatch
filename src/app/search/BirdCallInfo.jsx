import React from 'react';
import { CardMedia } from 'material-ui';

const BirdCallInfo = ({ props }) => {
  console.log(props[0]);
  const key = props[0].imgs;
  const style = {
    height: '100px',
    width: '100px',
  }

  return (
    <div>
      <img src={`//upload.wikimedia.org/wikipedia/commons/thumb/9/9d/${key}/220px-${key}`} alt={props[0].sciName} style={{ height: '200px', width: 'absolute'}}/>
      <h2>{props[0].sciName}</h2>
      <a>{props[0].descript}</a>
      <audio controls src={props[0].audio}></audio>
  
    </div>
  );
};
export default BirdCallInfo;
