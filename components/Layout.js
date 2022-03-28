import react, {useEffect} from 'react';
import useStore from '../store';

function Layout(props) {
 
  const {selectedColor, preview, fontSize, fontColor,containerWidth, setContainerWidth} = useStore()

  useEffect(()=>{
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth;


    const width = windowHeight * 0.562218891 > windowWidth ? '100vw' : windowHeight * 0.562218891 + 'px'
    setContainerWidth (width)

  }, [])
  return (
    <div className='page-layout'>
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
          width: var(--containerWidth);
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

