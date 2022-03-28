import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useStore from '../store';
import ActionBtn from '../components/ActionBtn';
import { BsTwitter } from 'react-icons/bs';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const containerWidth = useStore((state) => state.containerWidth);
  const setWidth = useStore((state) => state.setWidth);
  const selectedColor = useStore((state) => state.selectedColor);
  useEffect(() => {
    const container = document.querySelector('.container');
    const height = container.offsetHeight;
    const width = container.offsetWidth;
    setWidth(width);
  }, []);

  return (
    <div className='container'>
      <Head>
      <meta
          name='viewport'
          content='initial-scale=1, viewport-fit=cover, user-scalable=no'
        />
      </Head>
      <header>
        <h2>
          {' '}
          <span className=''>mucho</span>
          <span className='thin'>twitto</span>{' '}
        </h2>
      </header>
      <div className='headline'>
        <h5>
          Running out of characters on{' '}
          <span>
            {' '}
            <BsTwitter />{' '}
          </span>{' '}
          ?{' '}
        </h5>
        <p>
          Tweet your <em>mucho texto </em> <br />
          as a perfect-fit image!
        </p>
      </div>

      <footer>
        <button
          onClick={() =>
            signIn('twitter', {
              callbackUrl: `${window.location.origin}/compose`,
            })
          }
        >
          <span className='text-btn'> login with twitter</span> <BsTwitter />
        </button>

        <Link href='/compose'>
          <p className='sub-heading'>or just try it out</p>
        </Link>
      </footer>

      <style jsx>
        {`
          :root {
          }
          header {
            height: 20%;
          }
          .container {
            --color: ${selectedColor === '#ffd400' ? '#333' : 'white'};
            background-color: var(--selectedColor);
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: var(--containerWidth);
            height: 100%;
            color: var(--color);
            font-family: Comfortaa, sans-serif;
            width: 100vw;
            overflow: hidden;
            letter-spacing: -3px;
          }
          .headline {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0%;
            height: 100%;
            justify-content: center;
            letter-spacing: -1px;
          }
          .thin {
            font-weight: 100;
          }

          h2 {
            font-weight: 900;
            font-size: 3rem;
          }
          h5 {
            font-size: 1.3rem;
            font-weight: lighter;
            letter-spacing: ;
          }
          p {
            text-align: center;
            line-height: 2.3rem;
            font-size: 1.6rem;
            font-weight: 700;
          }
          footer {
            height: 20%;
            letter-spacing: 0;
          }
          button {
            font-family: Arial, Helvetica, sans-serif;
            background-color: var(--color);
            border-radius: 1.5rem;
            border: none;
            color: ${'#15202b'};
            font-weight: bolder;
            font-size: 0.8rem;
            color: var(--selectedColor);
            font-weight: bolder !important;
            font-size: 0.9rem;
            padding: 0.5rem 5rem;
            display: flex;
            justify-content: space-between;
          }
          .text-btn {
            margin-right: 0.5rem;
          }
          .sub-heading {
            font-size: 1rem;
            font-weight: 200;
            cursor: pointer;
            width: 70%;
            margin: 1.5rem auto;
            overflow: hidden;
            text-align: center;
          }

          .sub-heading:before,
          .sub-heading:after {
            background-color: var(--color);
            content: '';
            display: inline-block;
            height: 1px;
            position: relative;
            vertical-align: middle;
            width: 50%;
          }

          .sub-heading:before {
            right: 0.5em;
            margin-left: -50%;
          }
          .sub-heading:after {
            left: 0.5em;
            margin-right: -50%;
          }
        `}
      </style>
    </div>
  );
}
