import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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

function Compose() {
  const { html, setHtml, overflow, preview, setPreviewToFalse, imgUrl } =
    useStore();
  const text = useRef(html);
  const [loading, setLoading] = useState(true);

  const { progress } = useDimensions(text.current);
  // function handleChange(e) {
  //   const newContent = e.currentTarget.innerHTML;
  //   console.log(content);
  //   setContent(newContent);
  // }

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

  return (
    <div className='compose'>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
      </Head>
      <AppBar />
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
          <Link href='/send'>
            <button>Done</button>
          </Link>
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
