import React, { useState, useEffect } from 'react';

const useMaxlength = () => {
  const [length, setLength] = useState('');
  
  useEffect(() => {
      const editor = document.querySelector('.text-area');
      function handleLength(){
        setLength(editor.innerText.length)
         // console.table('maxxxxx', editor.innerHTML.length, editor.innerHTML );
         console.log('HTML', editor.innerHTML)
         console.log('innerlength', length)
       }
   editor.addEventListener('keyup',handleLength)
   editor.addEventListener('keydown',handleLength)
   editor.addEventListener('paste',handleLength)
  }, []);
useEffect(()=>{
    console.log('statelength', length)
}, [length])
  return [length];
};

export default useMaxlength;
