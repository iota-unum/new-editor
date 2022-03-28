import react from 'react';
import useStore from '../store';
import Head from 'next/head';
function Layout(props) {
 
  const {selectedColor, preview, fontSize, fontColor,} = useStore()
  return (
    <div className='page-layout'>
       <Head>
        <title>muchotwitto</title>
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@600;700&family=Dongle:wght@400;700&family=Quicksand:wght@500;700&display=swap" rel="stylesheet"></link>
      </Head>
      {props.children}
      <style jsx global>{`
        :root {
          --selectedColor: ${selectedColor};
          --mainColor: #15202b;
          --fontColor: ${fontColor}
        }
        .page-layout {
          height: 100%;
          outline: none;
        }
        .editor {
          outline: none;
          min-height: calc(var(--containerWidth) * 0.5625);
          max-height: ${preview
            ? `calc(var(--containerWidth) * 1.333333333)`
            : `calc(var(--containerWidth) * 0.5625)`};
          background-color: var(--selectedColor);
          overflow: ${preview ? 'hidden' : 'auto'};
          padding: 0.5rem;
          font-size: ${fontSize}rem;
          color: ${fontColor};
          overflow-wrap: break-word;
        }
        .editor span,
        h1 {
          font-size: ${fontSize}rem !important;
          //without the font doesnt increase or decrease
        }
        h1 {
          font-size: ${fontSize * 2}rem !important;
          margin: 0;
        }
        h1 span {
          font-size: ${fontSize * 2}rem !important;
          margin: 0;
        }
        @media (min-width: 768px) {
          .editor {
            overflow: hidden;
            max-height: calc(var(--containerWidth) * 1.33333);
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;

