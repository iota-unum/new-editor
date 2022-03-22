import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import React from 'react';
function MyApp({ Component, pageProps }) {

  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return (

    <Layout>
      <Head>
      <meta name="viewport" content="initial-scale=1, viewport-fit=cover, user-scalable=no"/>
      </Head>

      <Component {...pageProps} />

    </Layout>
  
  );
}

export default MyApp;
