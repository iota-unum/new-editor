import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (

    <Layout>
      <Head>
        <meta name="viewport user-scalable=no" />
      </Head>

      <Component {...pageProps} />

    </Layout>
  
  );
}

export default MyApp;
