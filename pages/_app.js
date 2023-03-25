import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import "../styles/globals.css";
import "../styles/Landing.css";

import { AuthProvider } from "../service/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shield Event</title>
      </Head>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
