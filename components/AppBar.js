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
            height: 3em;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1em 0.5em;
            background-color: #273340;
          }
        
        `}
      </style>
    </div>
  );
}

export default AppBar;
