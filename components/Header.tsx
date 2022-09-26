import { useAddress, useLogout, useUser } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useQueryUser } from "../hooks/useQueryUser";
import styles from "../styles/Theme.module.css";

const Header: FC = () => {
  const address = useAddress();
  const { user: thirdwebUser } = useUser();
  const user = useQueryUser();
  const logout = useLogout();

  return (
    <div className={styles.header}>
      <Image
        src="/thirdweb.svg"
        alt="logo"
        width="50px"
        height="30px"
        objectFit="contain"
      />
      <div>
        {user?.address ? (
          <Link href={`/user/${user?.address}`}>
            <img
              className={`${styles.avatar} ${styles.headerAvatar}`}
              src={user?.avatar?.length > 0 ? user?.avatar : "/avatar.svg"}
              alt={user?.name}
            />
          </Link>
        ) : (
          <Link href="/create">
            <button>
              {!address ? "Connect Wallet" : !thirdwebUser ? "Login" : "Create"}
            </button>
          </Link>
        )}

        {user?.address && <button onClick={() => logout()}>Logout</button>}
      </div>
    </div>
  );
};

export default Header;
