import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function CircularProgress({ length, maxLength }) {
  const percentage = (length / maxLength) * 100;

  const text = length - maxLength > -20 && String(length - maxLength);
  console.log('rotella', length - maxLength > -20);

  return (
    <div className='circular-progress'>
      {percentage > 5 && <CircularProgressbar value={percentage} text={text} />}
      ;
      <style global jsx>
        {`
          .circular-progress {
            width: 1.8em;
            height: 1.8em;
            margin-right: 0;
          }

          .CircularProgressbar-path {
            stroke: ${percentage > 100
              ? 'red'
              : 'var(--selectedColor)'} !important;
          }
          .CircularProgressbar-trail {
            stroke: rgb(218, 23, 23);
          }
          .CircularProgressbar-text {
            font-size: 2em !important;
            fill: ${length - maxLength <= 0
              ? 'var(--selectedColor)'
              : 'red'} !important;
          }
          .CircularProgressbar-background {
            fill: green;
          }
        `}
      </style>
    </div>
  );
}

export default CircularProgress;
