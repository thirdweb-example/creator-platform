import { ThirdwebProvider } from "@thirdweb-dev/react";
import { AppProps } from "next/app";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // This is the chain your dApp will work on.
  const activeChain = "mumbai";

  return (
    <ThirdwebProvider
      activeChain={activeChain}
      authConfig={{
        authUrl: "/api/auth",
        domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
