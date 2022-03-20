import React from 'react'
import Preview from '../components/Preview'
import useStore from '../store'
function Send() {

    const {html} = useStore()
  return (
    <div>


        <Preview content={html}></Preview>
    </div>
  )
}

export default Send