import React from 'react'
import useStore from '../store'
function TweetBtn({id, type, form ,content}) {

    const fontColor = useStore(state => state.fontColor)
  return (
    <div className='tweet-btn' >

<button form={form} type={type}>{content}</button>
<style jsx>
        {`
          .tweet-btn button {
            background-color: var(--selectedColor);
            border: 2px solid var(--selectedColor);
            border-radius: 1.5rem;
            color: ${ fontColor === 'white'
              ? 'white'
              : '#15202b'};
             padding: 0.3em 1em;
            min-width: 7em;
            font-weight: bolder;
            font-size: 0.8rem;
          }
        `}
      </style>

    </div>
  )
}

export default TweetBtn