import react, {useEffect} from 'react';
import useStore from '../store';
import Head from 'next/head';

function Layout(props) {
 
  const {selectedColor, preview, fontSize, fontColor,containerWidth, setContainerWidth} = useStore()

  useEffect(()=>{
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

console.log('EFFECT')
    const width = windowHeight * 0.562218891 > windowWidth ? windowWidth + 'px' : windowHeight * 0.502218891 + 'px'
    setContainerWidth (width)
    
    console.log('width', width)
    console.log('winheigh', windowHeight)
    console.log('winwidth', windowWidth)
  }, [containerWidth])
  return (
    <div className='page-layout'>
       <Head>
        <title>muchotwitto</title>
        <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
      </Head>
      {props.children}
      <style jsx global>{`
        :root {
          --selectedColor: ${selectedColor};
          --mainColor: #15202b;
          --fontColor: ${fontColor};
          --containerWidth: ${containerWidth};
        }
        .page-layout {
          height: 100%;
          outline: none;
          width: 100%;
          margin: 0 auto;
        }
        .editor {
          outline: none;
          min-height: calc(var(--containerWidth) * 0.5625);
          max-height: ${preview
            ? `calc(var(--containerWidth) * 1.333333333)`
            : `calc(var(--containerWidth) * 0.5625)`};
          background-color: var(--selectedColor);
          overflow: ${preview ? 'hidden' : 'auto'};
          padding: 0.8rem;
          color: ${fontColor};
          overflow-wrap: break-word;
        }

        .editor, .editor div, .editor span {

          font-size: calc(var(--containerWidth) / 24 *${fontSize}) !important;

        }
     
  .editor  h1 span{
      margin: 0;
      font-size: calc(var(--containerWidth) / 12 *${fontSize}) !important;
      font-weight: bolder !important;
    }
        @media (min-width: 768px) {
          .editor {
            overflow: auto;
            max-height: calc(var(--containerWidth) * 1.33333);
          }
          .preview {
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;

