import React from 'react'
import Selector from './Selector'
function ColorGroup({colors, target}) {
  return (
    <div className='color-group'>

{colors.map(c => <Selector key={c} color={c} target={target}/>)}



        <style jsx>
            {`
            .color-group {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            `}
        </style>
    </div>
  )
}

export default ColorGroup