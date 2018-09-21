import React from 'react';
import { CardMedia } from 'material-ui';

const BirdCallInfo = ({ props }) => {
  console.log(props[0]);

  return (
    <div>
      <img src={props[0].imgs[0].substring(5)} />
      <h1>{props[0].sciName}</h1>
      <h1>{props[0].descript}</h1>
      <audio controls src={props[0].audio}></audio>
  
    </div>
  );
};
export default BirdCallInfo;
