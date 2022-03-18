import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import ProgressBar from '../components/ProgressBar';
import Editor from '../components/Editor';
import useDimensions from '../hooks/useDimensions';
import useStore from '../store';
import EditBar from '../components/EditBar';
import Head from 'next/head';
import ColorBar from '../components/ColorBar';

function Compose() {
  const overflow = useStore((state) => state.overlfow);
  const [content, setContent] = useState('');
  const { progress } = useDimensions(content);
  const preview = useStore((state) => state.preview);
  function handleChange(e) {
    const newContent = e.currentTarget.innerHTML;
    console.log(content);
    setContent(newContent);
  }

  useEffect(() => {
    if (navigator && navigator.virtualKeyboard) {
      navigator.virtualKeyboard.overlaysContent = true;
    } else {
      return;
    }
  }, []);

  return (
    <div className='compose'>
      <Head>
        <meta
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
          name='viewport'
        />
      </Head>
      <AppBar />
      {!preview && <EditBar />}

      <Editor
        handleChange={handleChange}
        overflow={overflow}
        progress={progress}
        preview={preview}
        content={content}
      />
      {!preview && <ColorBar />}
      {!preview && <ProgressBar overflow={overflow} progress={progress} />}
      {preview && <button>Done</button>}
      <style jsx>
        {`
          .compose {
            background-color: var(--mainColor);
            height: 100%;
            min-height: 100vh;
            width: var(--containerWidth);
            margin: 0 auto;
          }
          button {
            display: block;
            background-color: var(--selectedColor);
            border: 1px solid var(--selectedColor);
            border-radius: 1.5rem;
            margin: 1rem auto;
            color: #15202b;
            width: 9rem;
            padding: 0.5rem 0.7rem;
            font-weight: bolder;
          }
        `}
      </style>
    </div>
  );
}

export default Compose;
