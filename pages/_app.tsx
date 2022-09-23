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
        domain: "example.org",
        loginRedirect: "/create",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
