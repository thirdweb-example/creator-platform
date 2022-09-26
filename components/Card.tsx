import { User } from "../types";
import Link from "next/link";
import { FC } from "react";
import styles from "../styles/Theme.module.css";

interface ICardProps {
  user: User;
}

const Card: FC<ICardProps> = ({ user }) => {
  return (
    <Link href={`/user/${user.address}`}>
      <div className={styles.card}>
        <img
          className={styles.avatar}
          src={user.avatar.length > 0 ? user.avatar : "/avatar.svg"}
          alt={user.name}
        />
        <p>{user.name}</p>
        <p>{user.bio}</p>
        <p>{user.address}</p>
      </div>
    </Link>
  );
};
export default Card;
