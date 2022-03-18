import React, { useRef } from 'react';

function Toolbar() {
  return (
    <div className='toolbar'>
      Toolbar
      <style jsx>
        {`
          .toolbar {
            height: 50px;
            background-color: #15202b;
          }
        `}
      </style>
    </div>
  );
}

export default Toolbar;
