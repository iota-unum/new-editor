import React from 'react';

function Avatar({img}) {
  return (
    <div className='avatar'>
      <img src={img} alt='' />

      <style jsx>
        {`
          .avatar {
            width: 2rem;
            margin: 0 0.5rem;
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
