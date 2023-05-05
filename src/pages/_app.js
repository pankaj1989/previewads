import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  console.log(Component, pageProps, "heloo")
  const router = useRouter();

  useEffect(() => {
    // Load the Bootstrap and jQuery files only on the client-side
    Promise.all([
      import('bootstrap/dist/js/bootstrap.bundle.min.js'),
      import('jquery')
    ]).then(([jquery]) => {
      window.jQuery = jquery;
    });
  }, [router.asPath]);

  return (
    <>
      <Component {...pageProps} />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" strategy="afterInteractive" />

    </>
  );
}

export default MyApp;
