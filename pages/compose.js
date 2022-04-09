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
import { BsPencilFill, BsEyeFill , BsFillCameraFill} from 'react-icons/bs';
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
    setImgHeight,
    setImgWidth,
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
    const previewDiv = await document.querySelector('.preview');
    const width = previewDiv.offsetWidth;
    const height = previewDiv.offsetHeight;
    setImgWidth(width)
    setImgHeight(height)
    const generatedImgUrl = await generateImage(previewDiv, [width, height]);
    setImgUrl(generatedImgUrl);
    router.push('/send');
    setLoading(false);
  }

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
          <Avatar 
          img={!session ? 'default_profile.png' : session.user.image}
          
          />


          {!session && 
          
          <span className='text-btn'
          onClick={()=> signIn('twitter')}

          >login</span>
          
        }
          {
            session && 
            <span className='text-btn'
            
            onClick={()=> signOut('twitter')}
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
                  <BsPencilFill /> <span>Edit</span>
                </span>
              ) : (
                <span className='icon-btn'>
                  {' '}
                  <BsEyeFill /> <span>Preview</span>
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
          <button onClick={handleImageGeneration}><BsFillCameraFill color={fontColor}/> <span className="text-icon">Generate Image</span></button>
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
            display: flex;
            background-color: var(--selectedColor);
            border: 1px solid var(--selectedColor);
            border-radius: 1.5rem;
            color: ${fontColor === 'white' ? 'white' : '#15202b'};
            padding: 0.5em 3em;
            font-weight: bolder;
            font-size: 1rem;
            margin-bottom: 1em;
          }
          .icon-btn {

            font-size: 0.9em;
          }
          .text-icon {
            color: ${fontColor};
            font-weight: 700;
            font-size: 0.8em;
            margin: 0 0.8em;
          }
          .text-btn {
            color: var(--selectedColor);
            font-weight: 700;
            font-size: 0.8em;
            margin: 0 1em;

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
