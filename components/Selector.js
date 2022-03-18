import React from 'react';
import useStore from '../store';
import { positionCursorToEnd } from '../helpers/cursorfunction';

function Selector({ color, target }) {
  const setSelectedColor = useStore((state) => state.setSelectedColor);
  const setFontColor = useStore((state) => state.setFontColor);
  const fontColor = useStore((state) => state.fontColor);
  const selectedColor = useStore((state) => state.selectedColor);
  function handleClick(e) {

    const editor = document.querySelector(".editor")
      positionCursorToEnd(editor)
    if (target === 'background') {
      setSelectedColor(color);
    } else if (target === 'font') {
      setFontColor(color);
    }
  }
  return (
    <div className='selector background font' onClick={handleClick}>
      <style jsx>
        {`
          .selector {
            width: 1rem;
            height: 1rem;
            background-color: ${color};
            margin: 0.5rem;
            border-radius: 100%;
          }
          .background {
            border: ${color === selectedColor && '2px solid white'};
          }
          .font {
            border: ${color === fontColor && `2px solid ${selectedColor}`};
          }
        `}
      </style>
    </div>
  );
}

export default Selector;
