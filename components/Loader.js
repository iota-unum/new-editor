import React from 'react'
import useStore from '../store'

import { ClipLoader, ScaleLoader
} from 'react-spinners'

function Loader() {
    const color = useStore(state => state.selectedColor)
  return (
    // <div style={{color: 'white'}} >Loader</div>
    <ScaleLoader
    color={color} size='4rem' />

  )
}

export default Loader