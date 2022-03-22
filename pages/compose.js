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
function Compose() {
  const {
    html,
    setHtml,
    overflow,
    preview,
    setPreviewToFalse,
    togglePreview,
    imgUrl,
    setImgUrl,
  } = useStore();
  const text = useRef(html);
  const editorRef = useRef();
  const [loading, setLoading] = useState(false);

  const { progress, editorHeight, editorWidth } = useDimensions(text.current);
  const { generateImage } = useScreenshot();
  const router = useRouter()

  useEffect(() => {
    setPreviewToFalse();

    if (navigator && navigator.virtualKeyboard) {
      navigator.virtualKeyboard.overlaysContent = true;
    } else {
      return;
    }
  }, []);

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
    router.push('/send')
    setLoading(false);
  }
  return (
    <div className='compose'>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
      </Head>
      <AppBar > 
<Avatar/>
<ActionBtn action={togglePreview} content={preview ? 'back' : 'preview'}outlined={preview}/>

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
          <button onClick={handleImageGeneration}>Done</button>
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
            color: #15202b;
            width: 9rem;
            padding: 0.5rem 0.7rem;
            font-weight: bolder;
            font-size: 0.8rem;
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
