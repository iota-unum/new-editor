import React, { useState } from 'react';
import EditButton from './EditButton';
import {
  BsTextCenter,
  BsTextLeft,
  BsTypeBold,
  BsTypeItalic,
  BsArrowCounterclockwise,
  BsTypeH1,
  BsParagraph,
} from 'react-icons/bs';

function LoopButton({buttons}) {
  const [index, setIndex] = useState(0);

 function handleClick(){
   const count = index
console.log(count, index)
   setIndex(((buttons.length + count)% buttons.length )+1)
 }


  const {cmd, arg, } = buttons[index]
  const { name ,icon} = buttons[(index + buttons.length -1 )% buttons.length]
  return (
    <div className='loop-button' onClick={()=>setIndex((index + 1)%buttons.length)}>
      <EditButton cmd={cmd} arg={arg} name={name} >
        {icon}
      </EditButton>


      <style jsx>
        {`
        .loop-button {
        }
        
        `}
      </style>
    </div>
  );
}

export default LoopButton;
