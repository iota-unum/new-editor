import React from 'react';
import ActionBtn from '../components/ActionBtn';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import Preview from '../components/Preview';
import useStore from '../store';
function Send() {
  const { html, imgUrl } = useStore();
  return (
    <div className='twitter-compose'>
      <AppBar>
        <Avatar />
        <ActionBtn
          content='tweet'
          action={() => {
            alert('Cosa clicchi, ancora non funziona, bimbominkia!');
          }}
        />
      </AppBar>
      <div className='form'>
        <form onSubmit={()=>{}}>
          <textarea
            name='status'
            placeholder= "What's new?"
            maxLength={279}
          />
        
        </form>{' '}
      </div>



      <div className='img-container'>
        <img src={imgUrl} alt='' />
      </div>

      <style jsx>
        {`
          .twitter-compose {
            background-color: var(--mainColor);
            height: 100%;
          }
          .img-container {
            width: 90%;
            margin-left: 9%;
          }

          .img-container img {
            border-radius: 10px;
            width: 100%;
          }
          textarea {
            width: 100%;
            height: 20vh;
            background-color: var(--mainColor);
            border: none;
            outline:0;
            color: lightgray;
            font-family: Arial, Helvetica, sans-serif;
            margin-top: 2rem;
            padding: 1rem;
            border: 1px solid rgb(82, 82, 82);
          }
        `}
      </style>
    </div>
  );
}

export default Send;
