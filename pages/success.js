import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/client';
import useStore from '../store';
import AppBar from '../components/AppBar';
import Avatar from '../components/Avatar';
function success() {
  const twitterName = useStore((state) => state.twitterName);
  const tweetId = useStore((state) => state.tweetId);
  const tweetUrl = `https://twitter.com/${twitterName}/status/${tweetId}`;
  return (
    <div className='success'>
      <h2>Congratulations, your tweet has been sent!</h2>

      <div className='link-container'>
        <Link href={tweetUrl}>
          <a> See your tweet</a>
        </Link>
      </div>

      <style jsx>
        {`
          .success {
            font-family: Comfortaa, cursive;
            background-color: var(--selectedColor);
            color: white;
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
            font-weight: bolder;
            text-decoration: underline;
            cursor: pointer;
            margin: 5rem;
          }
        `}
      </style>
    </div>
  );
}

export default success;
