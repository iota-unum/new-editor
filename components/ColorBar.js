import React from 'react';
import ColorGroup from './ColorGroup';
import FontGroup from './FontGroup';

function ColorBar({}) {
  const bgColors = [
    // 'rgb(29, 155, 240)',
    // 'rgb(255, 212, 0)',
    // 'rgb(249, 24, 128)',
    // 'rgb(120, 86, 255)',
    // 'rgb(255, 122, 0)',
    // 'rgb(0, 186, 124)',

    '#1d9bf0',
    '#ffd400',
    '#f91880',
    '#7856ff',
    '#ff7a00',
    '#00ba7c',
  ];

  const fontColors = ['black', 'white'];
  return (
    <div className='colorbar'>
      <ColorGroup colors={fontColors} target='font' />
      <FontGroup />
      <ColorGroup colors={bgColors} target='background' />

      <style jsx>
        {`
          .colorbar {
            height: 2.5em;
            max-width: 100%;
            background-color: #273340;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

export default ColorBar;
