# Creator Platform

This project demonstrates how you can connect your web2 backend and integrate it with web3 using sign in with ethereum.

## Tools:

- [React SDK](https://docs.thirdweb.com/react): To access the connected wallet, switch the user's network, and claim an NFT from our Edition Drop collection.
- [Auth](https://portal.thirdweb.com/building-web3-apps/authenticating-users): To ask users to sign a message and verify they own the wallet they claim to be, while on the server-side.

## Using This Template

Create a project using this example:

```bash
npx thirdweb create --template creator-platform
```

- Add your wallet's private key as an environment variable in a `.env.local` file called `THIRDWEB_AUTH_PRIVATE_KEY`:
- Create a project on mongoDB.
- Create a new database in your mongoDB project, copy the connection url and add it in `.env.local` file.

```text title=".env.local"
THIRDWEB_AUTH_PRIVATE_KEY=your-wallet-private-key
DATABASE_URL=mongodb-connection-url
NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=your-domain-name
```

## How It Works

Using [Auth](https://portal.thirdweb.com/auth), we ask users to sign in using their web3 wallet. Once they sign in, we show them some inputs to create their profile. Then, we make an api call and save the user's profile in the database.

We need to create a configuration file that contains our wallet's private key (used to generate messages for users to sign) and our site's domain name:

This file is called `auth.config.ts` and is at the root of the project.

```tsx
import { ThirdwebAuth } from "@thirdweb-dev/auth/next";
import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
  wallet: new PrivateKeyWallet(process.env.THIRDWEB_AUTH_PRIVATE_KEY || ""),
});
```

Finally, we have a [catch-all API route](https://nextjs.org/docs/api-routes/dynamic-api-routes#catch-all-api-routes) called `pages/api/auth/[...thirdweb].ts`, which exports the `ThirdwebAuthHandler` to manage all of the required auth endpoints like `login` and `logout`.

```tsx
import { ThirdwebAuthHandler } from "../../../auth.config";

export default ThirdwebAuthHandler();
```

### Setting Up the Auth SDK

Inside the [\_app.tsx](./pages/_app.tsx) file, we configure the Auth SDK in the `ThirdwebProvider` component that wraps our application, allowing us to use the hooks of the SDK throughout our application:

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
