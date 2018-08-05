import React from 'react';
import audioFile from './blip.wav';

const AudioForCompletion = (props) => {
  return (
    <audio id="soundOnComplete">
      <source  src={audioFile} type='audio/wav' />
    </audio>
  )
};

export default AudioForCompletion;