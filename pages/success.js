import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/client';
import useStore from '../store';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
import { BsTwitter } from 'react-icons/bs';

function Success() {
  const twitterName = useStore((state) => state.twitterName);
  const selectedColor = useStore(state => state.selectedColor)
  const tweetId = useStore((state) => state.tweetId);
  const tweetUrl = `https://twitter.com/${twitterName}/status/${tweetId}`;
  return (
    <div className='success'>
      <h2>Congratulations, your tweet has been sent!</h2>

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
            align-items: center;
            justify-content: center;
            padding: 4rem;
          }
          .link-container {
          }
          a {
            display: block;
            width: 12rem;
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
          }
        `}
      </style>
    </div>
  );
}

export default Success;
