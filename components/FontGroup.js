import React from 'react';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaBold,
  FaItalic,
  FaUndo,
  FaParagraph,
  FaHeading,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import useStore from '../store';

function FontGroup() {


  const fontSize = useStore(state => state.FontSize)
  const increaseFontsize = useStore(state => state.increaseFontsize)
  const decreaseFontsize = useStore(state => state.decreaseFontsize)
  return <div className='font-group'>
<span className='symbol' onClick={increaseFontsize} >+</span>
<span className='symbol' onClick={decreaseFontsize} >-</span>

<style jsx>
  {`
  .font-group {
    color: white
  }
  .symbol {
    padding: 0 .4rem;
    font-size: 1.5rem;
  }
  `}
</style>

  </div>;
}

export default FontGroup;
