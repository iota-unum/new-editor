import React from 'react';

function Avatar({img}) {
  return (
    <div className='avatar'>
      <img src={img} alt='' />

      <style jsx>
        {`
          .avatar {
            width: 2em;
          }
          img {
            width: 100%;
            border-radius: 50%;
            border: 0px solid var(--selectedColor);
          }
        `}
      </style>
    </div>
  );
}

export default Avatar;
