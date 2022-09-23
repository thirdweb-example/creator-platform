import { useUser } from "@thirdweb-dev/react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "../../types";
import styles from "../../styles/Theme.module.css";
import { getUser } from "../../prisma/user";

interface IAddressProps {
  user: User;
}

const Address: NextPage<IAddressProps> = ({ user }) => {
  const { user: thirdwebUser } = useUser();
  const owner = thirdwebUser?.address === user.address;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const router = useRouter();

  const handleEditClick = async () => {
    if (editing) {
      try {
        await fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify({ name, bio, avatar }),
        });
        setEditing(false);
        alert("Profile updated!");
      } catch (error) {
        alert("Error updating profile");
      }
    }

    if (!editing) {
      setEditing(true);
    }
  };

  const deleteAccount = async () => {
    try {
      await fetch("/api/user", {
        method: "DELETE",
      });
      alert("Account deleted");
      router.push("/");
    } catch (error) {
      alert("Error deleting account");
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className={styles.container}>
      <div className={editing && styles.form}>
        {editing ? (
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Avatar"
          />
        ) : (
          <img
            className={styles.avatar}
            src={user.avatar.length > 0 ? user.avatar : "/avatar.svg"}
            alt={user.name}
          />
        )}

        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        ) : (
          <p>{user.name}</p>
        )}
        {editing ? (
          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
        ) : (
          <p>{user.bio}</p>
        )}

        <a
          href={`https://goerli.etherscan.io/address/${user.address}`}
          target="_blank"
          rel="noreferrer"
        >
          {shortenAddress(user.address)}
        </a>

        <div className={editing && styles.userButtons}>
          {owner && editing && (
            <button onClick={() => setEditing(false)}>Cancel</button>
          )}

          {owner && (
            <button onClick={handleEditClick}>
              {editing ? "Save" : "Edit"}
            </button>
          )}
        </div>

        {owner && <button onClick={deleteAccount}>Delete</button>}
      </div>
    </div>
  );
};

export default Address;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = await getUser({ address: context?.params?.address as string });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
    },
  };
};
