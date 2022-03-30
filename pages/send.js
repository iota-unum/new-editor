import React, { useEffect, useState } from 'react';
import ActionBtn from '../components/ActionBtn';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import Preview from '../components/Preview';
import useStore from '../store';
import { positionCursorToEnd } from '../helpers/cursorfunction';
import { signIn, signOut, useSession } from 'next-auth/client';
import TweetBtn from '../components/TweetBtn';
import Loader from '../components/Loader';
import { useRouter } from 'next/router';

function Send() {
  const { html, imgUrl, tweetId, setTweetId, twitterName, setTwitterName } = useStore();
  const [session] = useSession();
  const [tweeting, setTweeting] = useState(false);
  const router = useRouter();
  // useEffect(() => {
  //   const el = document.querySelector('.text-area');
  //   // positionCursorToEnd(el);
  //   el.focus();
  //   // el.scrollTop = 1000;
  //   el.blur()
  // }, []);

  async function handleOnTweetSubmit(e) {
    console.log('submit');
    e.preventDefault();
    setTweeting(true);
    if (!session) {
      alert(
        'you must be connect your twitter account to post a tweet. Please cick on the login button to connect'
      );
      setTweeting(false)
      return;
    }
    if (!imgUrl) {
      alert(
        "You haven't uploaded any image, please click on the GENERATE button"
      );
      return;
    }
    const [prefix, ...twitterDataUrlFormat] = imgUrl ? imgUrl.split(',') : null;
    // console.log(prefix);
    const formData = new FormData(e.currentTarget);
    const status = formData.get('status') + ' [CHIRPBIRDICON]';
    console.log('STATUS', status);
    const results = await fetch('/api/twitter/sendTweet', {
      method: 'POST',
      body: JSON.stringify({
        status,
        twitterDataUrlFormat,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.id_str);
        setTwitterName(data.user.screen_name);
        setTweetId(data.id_str);
        setTweeting(false)
        router.push('/success');
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('tweeted!');
  }

  return (
    <div className='twitter-compose'>
      <AppBar>
        <span className='leftside-actions'>
          <Avatar img={!session ? 'default_profile.png' : session.user.image} />

          {!session && (
            <span className='text-btn' onClick={() => signIn('twitter')}>
              login
            </span>
          )}
          {session && (
            <span className='text-btn' onClick={() => signOut('twitter')}>
              logout
            </span>
          )}
        </span>

        {!tweeting && (
          <TweetBtn
            content='tweet'
            form='twitter-form'
            type='submit'
          ></TweetBtn>
        )}

        {tweeting && <Loader />}
      </AppBar>
      <div className='section-form'>
        <div className='form'>
          <form onSubmit={handleOnTweetSubmit} id='twitter-form'>
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
            width: var(--containerWidth);
            margin: 0 auto;
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
            padding-top: 0.4rem;
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
          .leftside-actions,
          .rightside-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .text-btn {
            color: var(--selectedColor);
            font-weight: 700;
            font-size: 0.9rem;
            margin-right: 1rem;
          }
        `}
      </style>
    </div>
  );
}

export default Send;
