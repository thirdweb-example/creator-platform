import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Goerli}
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
