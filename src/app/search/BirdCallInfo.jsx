import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
const BirdCallInfo = ({ props }) => {
  console.log(Object.keys(props[0]));

  return (
    <div>ht
      <h1>{props[0].sciName}</h1>
      <h1>{props[0].descript}</h1>
      {/* <ReactAudioPlayer src={props.audio} controls crossOrigin /> */}
      <h1>{props[0].imgs[0]}</h1>
    </div>
  );
};
export default BirdCallInfo;
