import React from 'react';
import { CardMedia } from 'material-ui';

const BirdCallInfo = ({ props }) => {
  console.log(props[0]);
  const key = props[0].imgs;

  return (
    <div>
      <img src={`//upload.wikimedia.org/wikipedia/commons/thumb/9/9d/${key}/220px-${key}`} alt={props[0].sciName}/>
      <h1>{props[0].sciName}</h1>
      <h1>{props[0].descript}</h1>
      <audio controls src={props[0].audio}></audio>
  
    </div>
  );
};
export default BirdCallInfo;
