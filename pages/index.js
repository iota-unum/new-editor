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
      <header>
        <h1 className='bold'>muchotwitto</h1>
      </header>
      <div className='headline'>
        <p>
          Write your <i>mucho texto </i> here <br />
          and tweet it as a perfect-fit image!
        </p>
      </div>

      <footer>
        <Link href='/compose'>
          <a>write</a>
        </Link>
      </footer>

      <style jsx>
        {`
      .container {
        background-color: #00ba7c;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: var(--containerWidth);
        height: 100vh;
        font-family: Comfortaa, cursive;
        color: white;      
      }

      h1.bold {
font-size: 3rem!important;  

      }

      h1 {
        font-weight: 700;
      }
      p {
        text-align: center;
        line-height: 1.8rem;
        font-size: 1.3rem;
        padding: 2rem;
        font-weight: 700;
      }
a {

  font-family: Arial, Helvetica, sans-serif;
          background-color:white;
            border: 2px solid white;
            border-radius: 1.5rem;
            margin: 0 10px;
            color: ${'#15202b'};
            padding: .5rem 2rem;
            font-weight: bolder;
            font-size: 0.8rem;
            color: green;
            font-weight: bolder !important;
            font-size: 1rem;
}

        }
      `}
      </style>
    </div>
  );
}
