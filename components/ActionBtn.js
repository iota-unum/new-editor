import React from 'react';
import useStore from '../store';
function ActionBtn({action, content, outlined}) {
  const preview = useStore((state) => state.preview);
  const togglePreview = useStore((state) => state.togl);
  return (
    <div className='action-btn'>
      <button onClick={action}>{content}</button>
      <style jsx>
        {`
          .action-btn button {
            background-color: ${outlined
              ? 'transparent'
              : 'var(--selectedColor)'};
            border: 2px solid var(--selectedColor);
            border-radius: 1.5rem;
            margin: 0 10px;
            color: ${outlined ? 'var(--selectedColor)' : '#15202b'};
            height: 2.1rem;
            padding: 0 2rem;
            font-weight: bolder;
            font-size: 0.8rem;
          }
        `}
      </style>
    </div>
  );
}

export default ActionBtn;
