import React, { useEffect, useState, useRef } from 'react';
import ActionBtn from '../components/ActionBtn';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import Preview from '../components/Preview';
import useStore from '../store';
import { positionCursorToEnd } from '../helpers/cursorfunction';
import { signIn, signOut, useSession } from 'next-auth/client';
import TweetBtn from '../components/TweetBtn';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { useRouter } from 'next/router';
import LoginModal from '../components/LoginModal';
import { BsArrowLeftShort } from 'react-icons/bs';
import ContentEditable from 'react-contenteditable';
import useMaxlength from '../hooks/useMaxlength';

function Send() {
  const {
    html,
    imgUrl,
    tweetId,
    setTweetId,
    twitterName,
    setTwitterName,
    selectedColor,
  } = useStore();
  const [session] = useSession();
  const [tweetStatus, setTweetStatus] = useState('normal');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const tweetMaxLength = 10;
const tweetLength = useMaxlength()
console.log('tweetLength', tweetLength)


useEffect(()=>{
setTweetStatus(tweetLength > tweetMaxLength ? 'disabled' : 'normal')
if(tweetLength >= tweetMaxLength) {
  document.execCommand('hiliteColor', true , '#910303')
}

}, [tweetLength])
// useEffect(() => {

  //   function handleMentions(e) {
  //     const char = e.key

  //     if(char === '@' || char === '#') {
  //       document.execCommand(document.execCommand('foreColor', true, selectedColor))      }
  //     if(char === ' ') {
  //       document.execCommand(document.execCommand('foreColor', false, 'FFFFFF'))      }

  //   }

  //   document.querySelector('.text-area').addEventListener('keypress', handleMentions)

  //   return () => {
  //     document.removeEventListener('keypress', handleMentions)
  //   }
  // }, [text])
  useEffect(() => {
    const el = document.querySelector('.text-area');
    // positionCursorToEnd(el);
    el.focus();
    // el.scrollTop = 1000;
    el.blur();
  }, []);
  const text = useRef('');

  const handleChange = (evt) => {
    // text.current = evt.target.value;
    text.current = evt.currentTarget.innerHTML;
    // setTweetStatus(text.current.length > tweetMaxLength ? 'disabled': 'normal')

    //  else {

    //   text.current = evt.currentTarget.innerHTML

    //   setTweetStatus('normal')
    // }

    // console.table(text.current.length, text.current)
  };
  async function handleOnTweetSubmit() {
    console.log('submit');
    setTweetStatus('tweeting');
    if (!session) {
      setShowModal(true);
      console.log(showModal);
      // alert(
      //   'you must be connect your twitter account to post a tweet. Please cick on the login button to connect'
      // );
      setTweetStatus('disabled');
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
    // const formData = new FormData(e.currentTarget);
    // const status = formData.get('status') + ' [CHIRPBIRDICON]';
    const status = text.current + ' [CHIRPBIRDICON]';
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
        setTweetStatus('disabled');
        setShowModal(false);
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
          <BsArrowLeftShort
            color='white'
            size={'1.6rem'}
            onClick={() => router.push('/compose')}
          />

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

        {tweetStatus !== 'tweeting' && (
          <TweetBtn
            disabled={tweetStatus === 'disabled'}
            content='tweet'
            onClick={handleOnTweetSubmit}
            type='button'
          ></TweetBtn>
        )}

        {tweetStatus === 'tweeting' && <Loader />}
      </AppBar>
      <div className='section-form'>
        <Avatar img={!session ? 'default_profile.png' : session.user.image} />
        <div className='form'>
          {/* <form onSubmit={handleOnTweetSubmit} id='twitter-form'>
           
            <div contentEditable> 
            <TextareaAutosize
              className='text-area'
              name='status'
              placeholder='Add a comment...'
              maxLength={279}
              contenEditable
            />

            </div>
          </form>{' '} */}
          <ContentEditable
            html={text.current}
            onChange={handleChange}
            className='text-area'
          />
        </div>
      </div>
      <div className='section-img'>
        <div className='img-container'>
          <img src={imgUrl} alt='text generated image' />
        </div>
      </div>
      {showModal && (
        <LoginModal
          color={selectedColor}
          setShowModal={setShowModal}
          signIn={signIn}
        />
      )}

      <style jsx>
        {`
          .twitter-compose {
            background-color: var(--mainColor);
            height: 100%;
            display: flex;
            flex-direction: column;
            width: var(--containerWidth);
            margin: 0 auto;
            overflow: auto;
          }

          .section-form {
            display: flex;
            padding-top: 1rem;
            justify-content: space-around;
            width: 100%;
          }
          .form {
            width: 80%;
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
            object-fit: cover;
          }
          .form :global(.text-area) {
            width: 100%;
            background-color: var(--mainColor);
            border: none;
            outline: 0;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0 0.5rem;
            border-bottom: 1px solid rgb(82, 82, 82);
            font-size: 1.1rem;
            border: none !important;
            resize: none;
            overflow: hidden;
            color: white;
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
            font-size: 0.8rem;
            margin: 1em;
          }
        `}
      </style>
    </div>
  );
}

export default Send;
