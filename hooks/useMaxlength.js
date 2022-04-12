import React, { useState, useEffect } from 'react';

const useMaxlength = () => {
  const [length, setLength] = useState('');
  
  useEffect(() => {
      const editor = document.querySelector('.text-area');
   editor.addEventListener('keyup', () => {
       setLength(editor.innerHTML.length)
        // console.table('maxxxxx', editor.innerHTML.length, editor.innerHTML );
      })
  }, []);
useEffect(()=>{
    console.log('statelength', length)
}, [length])
  return [length];
};

export default useMaxlength;
