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
        //     const newCommandState = {...commandState, [name]: !commandState[name], left:!commandState.center, center: !commandState.left}
        const selectState = {
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          heading: document.queryCommandValue('formatBlock') === 'h1',
          text: document.queryCommandValue('formatBlock') === 'div',
          center: document.queryCommandState('justifyCenter'),
          left: document.queryCommandState('justifyLeft'),
        };
        setCommandState(selectState);
        // setCommandState(prev => ({...commandState, [name]: !commandState.name}))
        // setCommandState({...commandState, heading: !commandState.text, left: !commandState.center})
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
            border: 1px solid #a2a2a2;
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

export default EditButton;
