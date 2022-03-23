import React, { useEffect} from 'react';
import ActionBtn from '../components/ActionBtn';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import Preview from '../components/Preview';
import useStore from '../store';
import {positionCursorToEnd} from '../helpers/cursorfunction'
function Send() {
  const { html, imgUrl } = useStore();


  useEffect(() => {
    const el = document.querySelector('.text-area');
    positionCursorToEnd(el);
    el.focus();
    // el.scrollTop = 1000;
  }, []);
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

      <div className='section-form'>
        <div className='form'>
          <form onSubmit={() => {}}>
            <textarea
            className='text-area'
              name='status'
              placeholder='Add a comment...'
              maxLength={279}
            />
          </form>{' '}
        </div>
      </div>
      <div className='section-img'>
        <div className='img-container'>
          <img src={imgUrl} alt='' />
        </div>
      </div>


      <style jsx>
        {`
          .twitter-compose {
            background-color: var(--mainColor);
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .section-form {
          }
          .section-img {
            height: 100%;
            display: flex;
            justify-content: end;
            flex-grow: 1;
            flex-basis: 0%;
            flex-shrink: 1;
            overflow: hidden;
            padding-top: .4rem;
          }
          .img-container {
            width: 80%;
            margin-right: 0.4rem;
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
            outline: 0;
            color: lightgray;
            font-family: Arial, Helvetica, sans-serif;
            padding: 1rem;
            border-bottom: 1px solid rgb(82, 82, 82);
            font-size: 1.3rem;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}

export default Send;
