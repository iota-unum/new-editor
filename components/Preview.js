import React from 'react';
import useStore from '../store';
function Preview({ overflow, content, progress, preview }) {
    const { selectedColor, fontColor, fontSize, commandState, setCommandState } =
    useStore();
  return <div className='preview editor '
  
 
  
  >
  <div  dangerouslySetInnerHTML={{__html: content}}>



  </div>
  
  <style jsx global>
        {`
          .editor {
            font-weight: 400;
            outline: none;
            min-height: calc(var(--containerWidth) * 0.5625);
            max-height: ${preview
              ? `calc(var(--containerWidth) * 1.333333)`
              : `calc(var(--containerWidth) * 0.5625)`};
            background-color: var(--selectedColor);
            overflow: ${preview ? 'hidden' : 'auto'};
            padding: 0.5rem;
            font-size: ${fontSize}rem;
            color: ${fontColor};
            overflow-wrap: break-word;
            
          }

          .editor span {
            font-size: ${fontSize}rem !important;
            //without the font doesnt increase or decrease

          }
          @media (min-width: 768px) {
            .editor {
              overflow: hidden;
              max-height: calc(var(--containerWidth) * 1.33333);
            }
          }
        `}
      </style>

  
  </div>;
}

export default Preview;
