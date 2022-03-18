import React from 'react';
import useStore from '../store';
import Avatar from './Avatar';
function AppBar() {
  const { preview, setPreview } = useStore();
  return (
    <div className='appbar'>
      <Avatar />
      <button onClick={setPreview}>{preview ? 'back' : 'preview'}</button>

      <style jsx>
        {`
          .appbar {
            height: 3rem;
            width: var(--containerWidth);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0.5rem;
          }
          button {
            background-color: ${preview
              ? 'transparent'
              : 'var(--selectedColor)'};
            border: 2px solid var(--selectedColor);
            border-radius: 1.5rem;
            margin: 0 10px;
            color: ${preview ? 'var(--selectedColor)' : '#15202b'};
            height: 2.1rem;
            padding: 0 2rem;
            font-weight: bolder;
          }
        `}
      </style>
    </div>
  );
}

export default AppBar;
