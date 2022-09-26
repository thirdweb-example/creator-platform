import {
  ConnectWallet,
  useAddress,
  useLogin,
  useUser,
} from "@thirdweb-dev/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { getUser } from "../prisma/user";
import { useQueryUser } from "../hooks/useQueryUser";
import { getUser as getUserThirdweb } from "../auth.config";
import styles from "../styles/Theme.module.css";
import Header from "../components/Header";

const Create: FC = () => {
  const address = useAddress();
  const login = useLogin();
  const { user: thirdwebUser } = useUser();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const router = useRouter();
  const user = useQueryUser();

  useEffect(() => {
    if (user?.address) {
      router.push(`/user/${thirdwebUser.address}`);
    }
  }, [user]);

  if (!address) {
    return (
      <div className={styles.container}>
        <ConnectWallet accentColor="#F213A4" />
      </div>
    );
  }

  if (!thirdwebUser) {
    return (
      <div className={styles.container}>
        <button onClick={() => login()}>Login</button>
      </div>
    );
  }

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    try {
      await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ name, bio, avatar }),
      });

      router.push(`/user/${thirdwebUser.address}`);
    } catch (error) {}
  };

  return (
    <div className={styles.container}>
      <Header />
      <h2>Create User</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          placeholder="Avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>Create</button>
      </form>
    </div>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const thirdwebUser = await getUserThirdweb(req);

  if (!thirdwebUser) {
    return {
      props: {},
    };
  }

  const user = await getUser({ address: thirdwebUser?.address });

  if (user?.address) {
    return {
      redirect: {
        destination: `/user/${user.address}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
