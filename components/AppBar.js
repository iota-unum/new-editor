import React from 'react';
import useStore from '../store';
import Avatar from './Avatar';
function AppBar({children}) {
  const { preview, togglePreview } = useStore();
  return (
    <div className='appbar'>
     {children}

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
        
        `}
      </style>
    </div>
  );
}

export default AppBar;
