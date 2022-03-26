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
            border-radius: 1.5rem;
            margin: 0.4rem;
            color: ${outlined
              ? 'var(--selectedColor)'
              : fontColor === 'white'
              ? 'white'
              : '#15202b'};
            height: 2.1rem;
            padding: 0 1rem;
            font-weight: bolder;
            font-size: 0.8rem;
            width: 7rem;
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
