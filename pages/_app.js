import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
        <meta name='viewport' content='width=device-width, height=device-height, initial-scale:1, user-scalable=no' />

        </Head>

        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
