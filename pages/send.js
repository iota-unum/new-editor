import React, { useEffect, useState, useRef } from 'react';
import ActionBtn from '../components/ActionBtn';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import useStore from '../store';
import { signIn, signOut, useSession } from 'next-auth/client';
import TweetBtn from '../components/TweetBtn';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { useRouter } from 'next/router';
import LoginModal from '../components/LoginModal';
import { BsArrowLeftShort } from 'react-icons/bs';
import ContentEditable from 'react-contenteditable';
import CircularProgress from '../components/CircularProgress';
import { AnimatePresence } from 'framer-motion';

function Send() {
  const {
    html,
    imgUrl,
   setTweetResponse,
    selectedColor,
  } = useStore();
  const [session] = useSession();
  const [tweetStatus, setTweetStatus] = useState('normal');
  const [showModal, setShowModal] = useState(false);
  const [tweetLength , setTweetLength] = useState(0) 
  const router = useRouter();
  const tweetMaxLength = 200;



useEffect(()=>{
  console.log('newEffectlength', tweetLength)
tweetStatus !== 'tweeting' && setTweetStatus(tweetLength > tweetMaxLength ? 'disabled' : 'normal')
// if(tweetStatus === 'disabled') {
//   console.log('FIRE')
//   document.execCommand('foreColor', true , '#910303')
// }

}, [tweetLength])

  useEffect(() => {
    const el = document.querySelector('.text-area');

  }, []);
  const text = useRef('');

  const handleChange = (evt) => {
    // text.current = evt.target.value;
    console.log(evt)
    text.current = evt.currentTarget.innerHTML;
    const length = evt.currentTarget.innerText.length
    console.log('lengthhhhh',length)
    setTweetLength(length)
    console.log('statelength', tweetLength)
    console.log(text.current)

  };
  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  
  }
  const cleanText = text => {
    return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    
    .replace(/<\/?[^>]+(>|$)/g, " ")
    
  }
  async function handleOnTweetSubmit() {
    console.log('submit');
    setTweetStatus('tweeting');
    if (!session) {
      setShowModal(true);
      console.log(showModal);
  
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

    const status = cleanText (text.current) + ' [CHIRPBIRDICON]';
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
        // console.log(data);
        setTweetResponse(data)
        // setTwitterName(data.user.screen_name);
        // setTweetId(data.id_str);
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

          <span className="left-arrow">

          <BsArrowLeftShort
            color='white'
            size={'1.6rem'}
            onClick={() => router.push('/compose')}
          />

          </span>

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
<span className="rightside-actions">
  
<CircularProgress length={tweetLength} maxLength={tweetMaxLength}/>
        {tweetStatus !== 'tweeting' && (
          <TweetBtn
            disabled={tweetStatus === 'disabled'}
            content='tweet'
            onClick={handleOnTweetSubmit}
            type='button'
          ></TweetBtn>
        )}

        {tweetStatus === 'tweeting' && <Loader />}

</span>
      </AppBar>
      <div className='section-form'>
        <Avatar img={!session ? 'default_profile.png' : session.user.image} />
        <div className='form'>
    
          <ContentEditable
            html={text.current}
            onChange={handleChange}
            onPaste={handlePaste}
            className='text-area'
            placeholder={'Add a comment...'}
          />
        </div>
      </div>
      <div className='section-img'>
        <div className='img-container'>
          <img src={imgUrl} alt='text generated image' />
        </div>
      </div>
      <AnimatePresence>

      {showModal && (
        <LoginModal
          color={selectedColor}
          setShowModal={setShowModal}
          signIn={signIn}
        />
      )}

      </AnimatePresence>

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
            min-height: 15vh;
            font-family: Arial, Helvetica, sans-serif;
            padding: 0 0.5rem;
            border-bottom: 1px solid rgb(82, 82, 82);
            font-size: 1.1rem;
            border: none !important;
            resize: none;
            overflow: hidden;
            color: white;
          }
         
         
          .text-btn {
            color: var(--selectedColor);
            font-weight: 700;
            font-size: 0.8rem;
            margin: 1em;
          }
          
        .left-arrow {
          width: 2.5em;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        `}
      </style>
 
    </div>
  );
}

export default Send;
