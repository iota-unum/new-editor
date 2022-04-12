import React, { useState, useEffect } from 'react';

const useMaxlength = () => {
  const [length, setLength] = useState('');
  
  useEffect(() => {
      const editor = document.querySelector('.text-area');
   editor.addEventListener('keyup', () => {
       setLength(editor.innerText.length)
        // console.table('maxxxxx', editor.innerHTML.length, editor.innerHTML );
        console.log('HTML', editor.innerHTML)
      })
  }, []);
useEffect(()=>{
    console.log('statelength', length)
}, [length])
  return [length];
};

export default useMaxlength;
