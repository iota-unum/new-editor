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
            width: 100%;
            height: 3em;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2em 0.7em;
            background-color: #273340;
            font-size: 1rem;
          }
        
        `}
      </style>
    </div>
  );
}

export default AppBar;
