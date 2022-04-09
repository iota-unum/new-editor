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
            width: 1em;
            height: 1em;
            background-color: ${color};
            border-radius: 100%;
          }
          .background {
            border: ${color === selectedColor && '.17em solid white'};
          }
          .font {
            border: ${color === fontColor && `.17em solid ${selectedColor}`};
          }
        `}
      </style>
    </div>
  );
}

export default Selector;
