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
import { BsPencilFill, BsEyeFill, BsFillCameraFill } from 'react-icons/bs';
import { signIn, signOut, useSession } from 'next-auth/client';
import Modal from '../components/Modal';
import sanitizeHtml from 'sanitize-html';
import { AnimatePresence } from 'framer-motion';
function Compose() {
  const {
    html,
    setHtml,
    overflow,
    fontColor,
    selectedColor,
    preview,
    setPreviewToFalse,
    togglePreview,
    imgUrl,
    setImgUrl,
    setToInitialState,
    setImgHeight,
    setImgWidth,
  } = useStore();
  const text = useRef(html);
  const editorRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { progress, editorHeight, editorWidth } = useDimensions(text.current);
  const { generateImage } = useScreenshot();
  const router = useRouter();
  const [session] = useSession();
  useEffect(() => {
    setPreviewToFalse();

    if (navigator && navigator.virtualKeyboard) {
      navigator.virtualKeyboard.overlaysContent = true;
    } else {
      return;
    }
  }, []);
  function reset() {
   
      setToInitialState();
      text.current = '';
      setShowModal(false)
    
  }
  function handleChange(e) {
    const editor = document.querySelector('.editor')
    text.current = e.target.value;
    if(editor.dataset.maxLength < text.current.length) {
      console.log('BABBBAABBABBAAAAA!!!!!')
    }
    console.log(text.current.length)
    console.log(editor.dataset.maxLength)

    // setHtml(sanitizeHtml(text.current));
    setHtml(text.current)
  }
  async function handleImageGeneration() {
    setLoading(true);
    const previewDiv = await document.querySelector('.preview');
    const width = previewDiv.offsetWidth;
    const height = previewDiv.offsetHeight;
    setImgWidth(width)
    setImgHeight(height)
    const generatedImgUrl = await generateImage(previewDiv, [width , height]);
    setImgUrl(generatedImgUrl);
    router.push('/send');
    setLoading(false);
  }

  console.log('session', session);
  return (
    <div className='compose'>
      <Head>
        <title>muchotwitto</title>
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
      </Head>
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
        <span className='rightside-actions'>
          <span className='text-btn' onClick={()=>setShowModal(true)}>
            reset
          </span>

          <ActionBtn
            action={togglePreview}
            content={
              preview ? (
                <span className='icon-btn'>
                  {' '}
                  <span className="icon-btn-icon">
                  <BsPencilFill /> 

                  </span>
                  <span className='icon-btn-text'>Edit</span>
                </span>
              ) : (
                <span className='icon-btn'>
                  {' '}
                  <span className='icon-btn-icon'> 
                  <BsEyeFill /> 

                  </span>
                  
                  <span className='icon-btn-text'>Preview</span>
                </span>
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
            handleChange={handleChange}
            overflow={overflow}
            progress={progress}
            preview={preview}
            // content={sanitizeHtml(text.current)}
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
          <button onClick={handleImageGeneration}>
            <span className="icon-btn-icon">

            <BsFillCameraFill color={fontColor} />{' '}

            </span>
            <span className='text-icon'>Generate Image</span>
          </button>
        )}
      </footer>
      <AnimatePresence>
      {showModal && <Modal setShowModal={setShowModal} color={selectedColor} bgColor='#15202b' confirmFunction={reset}> 
      <Modal.Title>Reset</Modal.Title>
      <Modal.Content>
        <p>
This will erase everything you have written so far 

        </p>
       <br></br>
       Do you want to reset?
      </Modal.Content>
      <Modal.Footer>

        <Modal.Button type='dismiss' onClick={()=>setShowModal(false)}> 
        No
        </Modal.Button>
        <Modal.Button type='accept' onClick={reset} > 
        Yes
        </Modal.Button>
      </Modal.Footer>
      
      </Modal>
      
      }
      </AnimatePresence>
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
            display: flex;
            background-color: var(--selectedColor);
            border: 1px solid var(--selectedColor);
            color: ${fontColor === 'white' ? 'white' : '#15202b'};
            font-family: Arial, Helvetica, sans-serif;
            border-radius: 1.5rem;
            font-weight: bolder;
            font-size: 0.8rem;
            font-weight: bolder !important;
            font-size: 0.9rem;
            padding: 0.5rem 5rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1em;
       
          }
          .icon-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .icon-btn-icon {
            padding: 0 .3em;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        .icon-btn-text {
          display: flex;
          justify-content: center;
          align-items: center;
        }
          .text-icon {
            color: ${fontColor};
            font-weight: 700;
            
          }
          .text-btn {
           

            color: var(--selectedColor);
            font-weight: 700;
            font-size: 0.8rem;
            margin: 1.5em;

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
