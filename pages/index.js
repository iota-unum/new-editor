import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useStore from '../store';
import ActionBtn from '../components/ActionBtn';
export default function Home() {
  const containerWidth = useStore((state) => state.containerWidth);
  const setWidth = useStore((state) => state.setWidth);
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
        <h2 > <span className=''>mucho</span><span className='thin'>twitto</span> </h2>
      </header>
      <div className='headline'>
        <h5>Running out of characters?</h5>
        <p>
          Tweet your  <em>mucho texto </em> <br />
        as a perfect-fit image!
        </p>
      </div>

      <footer>
        <Link href='/compose'>
          <a>get started</a>
        </Link>
      </footer>

      <style jsx>
        {`
          header {
            height: 20%;
            padding: rem;
          }
          .container {
            background-color: var(--selectedColor);
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: var(--containerWidth);
            height: 100%;
            font-family: Comfortaa, cursive;
            color: white;
            width: 100vw;
            overflow: hidden;
          }
          .headline {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-shrink: 1;
            flex-basis: 0%;
            height: 100%;
            justify-content: center;
            align-items:;
          }
          .thin {
font-weight: 100;

          }

          h2 {
            font-weight: 900;
            font-size: 3rem;
          }
          h5 {
            font-size: 1.4rem;
            font-weight:lighter;
          }
          p {
            text-align: center;
            line-height: 1.8rem;
            font-size: 1.2rem;
            padding: 2rem;
            font-weight: 700;
          }
          footer {
            height: 20%;
          }
          a {
            font-family: Arial, Helvetica, sans-serif;
            background-color: white;
            border: 2px solid white;
            border-radius: 1.5rem;
            color: ${'#15202b'};
            font-weight: bolder;
            font-size: 0.8rem;
            color: var(--selectedColor);
            font-weight: bolder !important;
            font-size: 0.9rem;
            padding: 0.5rem 5rem;
          }
        `}
      </style>
    </div>
  );
}
