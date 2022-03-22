import React from 'react'
import Preview from '../components/Preview'
import useStore from '../store'
function Send() {

    const {html, imgUrl} = useStore()
  return (
    <div>

<p>Qua ci deve stare l'immagine</p>
       <img src={imgUrl} alt="" />
    </div>
  )
}

export default Send