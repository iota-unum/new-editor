import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { useEffect , useState} from 'react';
import Link from 'next/link';
import useStore from '../store'
export default function Home() {

  const containerWidth = useStore(state => state.containerWidth)
  const setWidth = useStore(state => state.setWidth)
  useEffect(()=>{
const container = document.querySelector('.container')
const height = container.offsetHeight
const width = container.offsetWidth
 setWidth(width)
  }, [])


  return (
    <div className='container'>
      <Link href='/compose'>
        <a>write</a>
      </Link>
<p>width: {containerWidth}</p>

      <style jsx>
        {`
      .container {
        background-color: teal;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--containerWidth);
        height: 100vh;
        
      }
a {
  display: block;
  color:teal;
  text-transform: uppercase;
  padding: 5px 10px;
  background-color: white;
}

        }
      `}
      </style>
    </div>
  );
}
