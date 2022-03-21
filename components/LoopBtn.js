import React from 'react'
import useStore from '../store';
function LoopBtn({ cmd, arg, name, children }) {
    const { commandState, setCommandState } = useStore();
    const statusClass = commandState[name] ? 'active' : 'disabled';
  
    return (
      <button
        className={`edit-button ${statusClass}`}
        onMouseDown={(evt) => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(cmd, false, arg); // Send the command to the browser
          const selectState = {
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            heading: document.queryCommandValue('formatBlock') === 'h1',
            text: document.queryCommandValue('formatBlock') === 'div',
            left: document.queryCommandState('justifyLeft'),
            center: document.queryCommandState('justifyCenter'),
          };
          setCommandState(selectState);
          
          console.log('commando', commandState[name]);
          console.log(commandState);
        }}
      >
        {children}
  
        <style jsx>
          {`
            .edit-button {
              display: block;
              width: 7rem;
              padding: 0.5rem;
              flex-grow: 1;
              background-color: #15202b;
              border: 1px solid #273340;
              color: #a2a2a2;
            }
  
            .active {
              color: var(--selectedColor);
            }
  
            .disabled {
            }
          `}
        </style>
      </button>
    );
}

export default LoopBtn