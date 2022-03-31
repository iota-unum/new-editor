import React from 'react';
import useStore from '../store';
function ActionBtn({ action, content, outlined, id, type }) {
  const preview = useStore((state) => state.preview);
  const togglePreview = useStore((state) => state.togl);
  const fontColor = useStore((state) => state.fontColor);
  return (
    <div className='action-btn'>
      <button onClick={action} id={id} type={type}>
        {content}{' '}
      </button>
      <style jsx>
        {`
          .action-btn button {
            background-color: ${outlined
              ? 'transparent'
              : 'var(--selectedColor)'};
            border: 2px solid var(--selectedColor);
            border-radius: 1.5em;
            color: ${outlined
              ? 'var(--selectedColor)'
              : fontColor === 'white'
              ? 'white'
              : '#15202b'};
            padding: 0.3em 1em;
            min-width: 7em;
            font-weight: bolder;
            font-size: 0.8em;
            display:flex;
            align-items:center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}

export default ActionBtn;
