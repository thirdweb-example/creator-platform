import { ThirdwebAuth } from "@thirdweb-dev/auth/next";

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.PRIVATE_KEY as string,
  domain: "example.org",
});
