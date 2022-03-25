import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '../components/AppBar';
import ProgressBar from '../components/ProgressBar';
import Editor from '../components/Editor';
import useDimensions from '../hooks/useDimensions';
import useStore from '../store';
import EditBar from '../components/EditBar';
import Head from 'next/head';
import ColorBar from '../components/ColorBar';
import Preview from '../components/Preview';
import Loader from '../components/Loader';
import useScreenshot from '../hooks/useScreenshot';
import Avatar from '../components/Avatar';
import ActionBtn from '../components/ActionBtn';
import { BsPencilFill, BsEyeFill , } from 'react-icons/bs';
import { signIn, signOut, useSession, } from 'next-auth/client';
function Compose() {
  const {
    html,
    setHtml,
    overflow,
    fontColor,
    preview,
    setPreviewToFalse,
    togglePreview,
    imgUrl,
    setImgUrl,
    setToInitialState,
  } = useStore();
  const text = useRef(html);
  const editorRef = useRef();
  const [loading, setLoading] = useState(false);

  const { progress, editorHeight, editorWidth } = useDimensions(text.current);
  const { generateImage } = useScreenshot();
  const router = useRouter();
  const [session] = useSession()

  useEffect(() => {
    setPreviewToFalse();

    if (navigator && navigator.virtualKeyboard) {
      navigator.virtualKeyboard.overlaysContent = true;
    } else {
      return;
    }
  }, []);
  function reset() {
    if (confirm('Do you want delete and reset everything to initial state?')) {
      setToInitialState();
      text.current = '';
    }
  }
  function handleChange(e) {
    text.current = e.target.value;
    console.log(text.current);
    setHtml(text.current);
  }
  async function handleImageGeneration() {
    setLoading(true);
    const previewDiv = document.querySelector('.preview');
    const width = previewDiv.offsetWidth;
    const height = previewDiv.offsetHeight;
    const generatedImgUrl = await generateImage(previewDiv, [width, height]);
    setImgUrl(generatedImgUrl);
    console.log('fatto', imgUrl);
    router.push('/send');
    setLoading(false);
  }

  console.log('session', session)
  return (
    <div className='compose'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>
      <AppBar>
        <span className='leftside-actions'>
          <Avatar 
          img={!session ? 'default_profile.png' : session.user.image}
          
          />


          {!session && 
          
          <span className='text-btn'
          onClick={()=> signIn()}

          >login</span>
          
        }
          {
            session && 
            <span className='text-btn'
            
            onClick={()=> signOut()}
            >logout</span>
          }
        </span>
        <span className='rightside-actions'>
          <span className='text-btn' onClick={reset}>
            reset
          </span>

          <ActionBtn
            action={togglePreview}
            content={
              preview ? (
                <span className='icon-btn'>
                  {' '}
                  <BsPencilFill /> Edit
                </span>
              ) : (
                'Preview'
              )
            }
            outlined={preview}
          />
        </span>
      </AppBar>
      <div className='main'>
        {preview ? (
          <Preview
            overflow={overflow}
            progress={progress}
            preview={preview}
            content={text.current}
          />
        ) : (
          <Editor
            ref={editorRef}
            handleChange={handleChange}
            overflow={overflow}
            progress={progress}
            preview={preview}
            content={text.current}
          />
        )}
        {!preview && <EditBar />}
        {!preview && <ColorBar />}
        {!preview && <ProgressBar overflow={overflow} progress={progress} />}
      </div>
      <footer>
        {!preview ? null : loading ? (
          <Loader />
        ) : (
          <button onClick={handleImageGeneration}>Generate Image</button>
        )}
      </footer>
      <style jsx>
        {`
          .compose {
            display: flex;
            flex-direction: column;
            background-color: var(--mainColor);
            height: 100%;
            width: var(--containerWidth);
            margin: 0 auto;
          }
          .main {
            height: 100%;
            flex-basis: 0%;
            flex-shrink: 1;
            flex-grow: 1;
          }
          footer {
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          button {
            display: block;
            background-color: var(--selectedColor);
            border: 1px solid var(--selectedColor);
            border-radius: 1.5rem;
            color: ${fontColor === 'white' ? 'white' : '#15202b'};
            padding: 0.5rem 6rem;
            font-weight: bolder;
            font-size: 1rem;
            margin-bottom: 3rem;
          }
          .icon-btn {
            display: block;
            width: 3rem;
            font-size: 0.9rem;
          }
          .text-btn {
            color: var(--selectedColor);
            font-weight: 700;
            font-size: 0.8rem;
            margin-right: 1rem;
          }

          .leftside-actions,
          .rightside-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

export default Compose;

{
  /* footer {
  background-color: var(--mainColor);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;
} */
}
