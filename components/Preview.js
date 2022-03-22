import React from 'react';
import useStore from '../store';
function Preview({ overflow, content, progress, preview }) {
  const { selectedColor, fontColor, fontSize, commandState, setCommandState } =
    useStore();
  return (
    <div className='preview editor '>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>

    
    </div>
  );
}

export default Preview;
