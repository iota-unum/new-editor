import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/client';
import useStore from '../store';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import { BsTwitter } from 'react-icons/bs';
import TwitterCard from '../components/TwitterCard';

function Success() {

  const tweetResponse = useStore(state => state.tweetResponse)
  const selectedColor = useStore(state => state.selectedColor)
  // const tweetId = useStore((state) => state.tweetId);
  const tweetUrl = `https://twitter.com/lalala/status/${tweetResponse.id_str}`;
  return (
    <div className='success'>

      <h2 className='heading'>Congratulations, your tweet has been sent!</h2>
<TwitterCard tweet={tweetResponse}/>
      <div className='link-container'>
        <Link href={tweetUrl}>
          <a>
            {' '}
            <span className='text-btn'>see it on twitter</span>
            <BsTwitter size='1rem' />
          </a>
        </Link>
      </div>

      <style jsx>
        {`
          .success {
            --color:  ${selectedColor === '#ffd400' ? '#333' : 'white'};
            font-family: Comfortaa, Quicksand;
            background-color: var(--selectedColor);
            color: var(--color);
            text-align: center;
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            width: var(--containerWidth);
            margin: 0 auto;
          }
          .heading {
            padding: 2em;
          }
          .link-container {
          }
          a {
            display: block;
            width:80%;
            font-weight: bolder;
            cursor: pointer;
            margin: 8rem auto;
            color: var(--selectedColor);
            background-color: var(--color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 3rem;
          }
          .text-btn {
            margin-right: 0.4rem;
            font-weight: bolder;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.8rem;
            letter-spacing: 0;



          }
        `}
      </style>
    </div>
  );
}

export default Success;
