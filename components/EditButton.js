import React from 'react';
import useStore from '../store';

function EditButton({ cmd, arg, name, children }) {
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
          right: document.queryCommandState('justifyRight'),
          center: document.queryCommandState('justifyCenter'),
          justified: document.queryCommandState('justifyFull'),
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
           background-color: var(--mainColor);
           color: white;
           border: none;
           padding: .5rem;

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

export default EditButton;
