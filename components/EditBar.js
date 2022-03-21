import React from 'react';
import EditButton from './EditButton';
import useStore from '../store';
import {
  BsTextCenter,
  BsTextLeft,
  BsTextRight,
  BsTypeBold,
  BsTypeItalic,
  BsArrowCounterclockwise,
  BsTypeH1,
  BsParagraph,
  BsJustify,
} from 'react-icons/bs';
import { IconContext } from 'react-icons';
import LoopButton from './LoopButton';
function EditBar() {
  const commandState = useStore((state) => state.commandState);
  const headingButtons = [
    { cmd: 'formatBlock', arg: 'h1', name: 'heading', icon: <BsTypeH1 /> },

    { cmd: 'formatBlock', arg: 'div', name: 'text', icon: <BsParagraph /> },
  ];
  const alignmentButtons = [
    { cmd: 'justifyLeft', name: 'left', icon: <BsTextLeft /> },
    { cmd: 'justifyCenter', name: 'center', icon: <BsTextCenter /> },
    { cmd: 'justifyRight', name: 'right', icon: <BsTextRight /> },
    { cmd: 'justifyFull', name: 'justified', icon: <BsJustify /> }
  ];

  const boldButton = [{cmd: 'bold', name: 'bold', icon: <BsTypeBold/>}]
  const italicButton = [{cmd: 'italic', name: 'italic', icon: <BsTypeItalic/>}]
  const undoButton = [{cmd: 'undo' , name: 'undo', icon: <BsArrowCounterclockwise/>}]
  return (
    <IconContext.Provider value={{ size: '1.1rem' }}>
      <div className='editbar'>

        <LoopButton buttons={boldButton} />
        <LoopButton buttons={italicButton}/>
        <LoopButton buttons={headingButtons} />

        <LoopButton buttons={alignmentButtons} />
        <LoopButton buttons={undoButton} />
        {/* <EditButton cmd='bold' name='bold'>
          <BsTypeBold></BsTypeBold>
        </EditButton> */}
        {/* <EditButton cmd='italic' name='italic'>
          <BsTypeItalic />
        </EditButton> */}

        {/* 
      {commandState.center ? (
        <EditButton cmd='justifyLeft' name='left'  > 
        <BsTextLeft />
        </EditButton>
      ) : (
        <EditButton cmd='justifyCenter' name='center' > 
        
        <BsTextCenter/>
        </EditButton>
      )} */}
        {/* <EditButton cmd='undo' name='undo'>
          <BsArrowCounterclockwise />
        </EditButton> */}

        <style jsx>
          {`
            .editbar {
              display: flex;
              justify-content: space-around;
            }
          `}
        </style>
      </div>
    </IconContext.Provider>
  );
}

export default EditBar;
