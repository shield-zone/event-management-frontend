import { ChakraProvider } from "@chakra-ui/react";

import "../styles/globals.css";
import "../styles/Landing.css";

import { AuthProvider } from "../service/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
