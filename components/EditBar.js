import React from 'react';
import EditButton from './EditButton';
import useStore from '../store';
import { FaAlignCenter, FaAlignLeft, FaBold,  FaItalic, FaUndo, FaParagraph, FaHeading} from "react-icons/fa";
function EditBar() {
  const commandState = useStore((state) => state.commandState);

  return (
    <div className='editbar'>
      <EditButton cmd='bold' name='bold' > 
      <FaBold></FaBold>
      </EditButton>
      <EditButton cmd='italic' name='italic' >
        <FaItalic/>
         </EditButton>

      {commandState.heading ? (
        <EditButton cmd='formatBlock' arg='div' name='text' >

<FaParagraph/>

        </EditButton>
      ) : (
        <EditButton cmd='formatBlock' arg='h1' name='heading' >
          <FaHeading/>
          
           </EditButton>
      )}

      {commandState.center ? (
        <EditButton cmd='justifyLeft' name='left'  > 
        <FaAlignLeft />
        </EditButton>
      ) : (
        <EditButton cmd='justifyCenter' name='center' > 
        
        <FaAlignCenter/>
        </EditButton>
      )}
 <EditButton cmd='undo' name='undo' >
   <FaUndo/>
   
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
  );
}

export default EditBar;
