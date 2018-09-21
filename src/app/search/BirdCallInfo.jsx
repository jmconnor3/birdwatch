import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { CardMedia } from 'material-ui';

const BirdCallInfo = ({ props }) => {
  console.log();

  return (
    <div>
      <CardMedia>
        <img src={props[0].imgs[0].substring(5)} />
      </CardMedia>
      <h1>{props[0].sciName}</h1>
      <h1>{props[0].descript}</h1>
      {/* <ReactAudioPlayer src={props.audio} controls crossOrigin /> */}
      <h1>{props[0].imgs[0]}</h1>
    </div>
  );
};
export default BirdCallInfo;
