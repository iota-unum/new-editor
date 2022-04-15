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
            border: 3px solid var(--selectedColor);
            border-radius: 1.5em;
            color: ${outlined
              ? 'var(--selectedColor)'
              : fontColor === 'white'
              ? 'white'
              : '#15202b'};
            font-weight: bolder;
            display:flex;
            min-width: 7em;
            align-items:center;
            justify-content: space-around;


          
        
           padding: 0.3em 1em;
          font-weight: bolder;
          font-size: 0.8rem;

          }
     
          .action-btn button:hover {
            opacity:0.9;
          }
        `}
      </style>
    </div>
  );
}

export default ActionBtn;
