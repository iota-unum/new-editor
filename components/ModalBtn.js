import React from 'react'
import ActionBtn from './ActionBtn'
const ModalBtn = () => {
  return (
    <div className='modal-btn'>

        <ActionBtn></ActionBtn>


        <style jsx>
            {`
            
            .action-btn button{
                color: red;
                background-color: white;
                padding: 4rem;
            }
            `}
        </style>
    </div>
  )
}

export default ModalBtn