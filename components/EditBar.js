import React from 'react';
import EditButton from './EditButton';
import useStore from '../store';
import { FaAlignCenter, FaAlignLeft, FaBold,  FaItalic, FaUndo, FaParagraph, FaHeading} from "react-icons/fa";
import {
  BsTextCenter,
  BsTextLeft,
  BsTypeBold,
  BsTypeItalic,
  BsArrowCounterclockwise,
  BsTypeH1,
  BsParagraph,
} from 'react-icons/bs';
import { IconContext } from 'react-icons';
function EditBar() {
  const commandState = useStore((state) => state.commandState);

  return (
    <IconContext.Provider value={{size:'1.1rem'}}>


    <div className='editbar'>
      <EditButton cmd='bold' name='bold' > 
      <BsTypeBold></BsTypeBold>
      </EditButton>
      <EditButton cmd='italic' name='italic' >
        <BsTypeItalic/>
         </EditButton>

      {commandState.heading ? (
        <EditButton cmd='formatBlock' arg='div' name='text' >

<BsParagraph/>

        </EditButton>
      ) : (
        <EditButton cmd='formatBlock' arg='h1' name='heading' >
          <BsTypeH1/>
          
           </EditButton>
      )}

      {commandState.center ? (
        <EditButton cmd='justifyLeft' name='left'  > 
        <BsTextLeft />
        </EditButton>
      ) : (
        <EditButton cmd='justifyCenter' name='center' > 
        
        <BsTextCenter/>
        </EditButton>
      )}
 <EditButton cmd='undo' name='undo' >
   <BsArrowCounterclockwise/>
   
    </EditButton>

      <style jsx>
        {`
          .editbar {
            display: flex;
            justify-content: space-around;
            padding-top: 5px;
          }
        `}
      </style>
    </div>


    </IconContext.Provider>
    
  );
}

export default EditBar;
