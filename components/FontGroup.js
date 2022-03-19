import React from 'react';
import { BsFillPlusCircleFill, BsFillDashCircleFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import useStore from '../store';
import { positionCursorToEnd } from '../helpers/cursorfunction';

function FontGroup() {
  const fontSize = useStore((state) => state.FontSize);
  const increaseFontsize = useStore((state) => state.increaseFontsize);
  const decreaseFontsize = useStore((state) => state.decreaseFontsize);

  function handleIncreaseDecrease(symbol) {
    const editor = document.querySelector('.editor');

    if (symbol === 'plus') {
      increaseFontsize();
    }
    if (symbol === 'minus') {
      decreaseFontsize();
    }
    positionCursorToEnd(editor);
    editor.scrollTop = editor.scrollHeight
    console.log('INCREASEdECREASE');
  }
  return (
    <div className='font-group'>
      <div className='symbol'>
        <BsFillPlusCircleFill onClick={() => handleIncreaseDecrease('plus')} />
      </div>
      <div className='symbol'>
        <BsFillDashCircleFill onClick={() => handleIncreaseDecrease('minus')} />
      </div>
      {/* <div className='symbol' onClick={increaseFontsize} >+</div>
<div className='symbol' onClick={decreaseFontsize} >-</div> */}

      <style jsx>
        {`
          .font-group {
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .symbol {
            margin: 0.5rem;
            height: 1rem;
          }
        `}
      </style>
    </div>
  );
}

export default FontGroup;
