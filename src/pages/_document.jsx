import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

class IndexPage extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Dayz Types Generator</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <meta name="twitter:card" value="Dayz Types Generator" />
          <meta property="og:title" content="Dayz Types Generator" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://dayz-types-generator.vercel.app"
          />
          <meta
            property="og:image"
            content={`https://dayz-types-generator.vercel.app/static/TypesGenerator_DAYZ_White_300x300.png`}
          />
          <meta property="og:description" content="Dayz Types Generator" />
          <link
            rel="icon"
            href="static/TypesGenerator_DAYZ_White_Favicon.png"
            sizes="32x32"
            type="image/png"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default IndexPage;
