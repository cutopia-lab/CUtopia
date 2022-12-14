import { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';

const Document: FC = () => (
  <Html>
    <Head>
      <link rel="icon" href="/cutopia-logo.png" />
      <link rel="apple-touch-icon" href="/cutopia-logo.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href={`https://fonts.googleapis.com/css2?family=Pacifico&display=swap`}
        rel="stylesheet"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
