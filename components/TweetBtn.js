import React from 'react'
import useStore from '../store'
function TweetBtn({id, type, content}) {

    const fontColor = useStore(state => state.fontColor)
  return (
    <div className='tweet-btn' >

<button id={id} type={type}>{content}</button>
<style jsx>
        {`
          .tweet-btn button {
            background-color: var(--selectedColor);
            border: 2px solid var(--selectedColor);
            border-radius: 1.5rem;
            margin: 0.4rem;
            color: ${ fontColor === 'white'
              ? 'white'
              : '#15202b'};
            height: 2.1rem;
            padding: 0 2rem;
            font-weight: bolder;
            font-size: 0.8rem;
          }
        `}
      </style>

    </div>
  )
}

export default TweetBtn