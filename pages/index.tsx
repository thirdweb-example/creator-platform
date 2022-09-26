import { GetServerSideProps, NextPage } from "next";
import { User } from "../types";
import styles from "../styles/Theme.module.css";
import { getAllUsers } from "../prisma/user";
import Card from "../components/Card";
import Header from "../components/Header";

interface IHomeProps {
  users: User[];
}

const Home: NextPage<IHomeProps> = ({ users }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.users}>
        {users.map((user) => (
          <Card user={user} key={user.address} />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const users = await getAllUsers();

  return {
    props: {
      users,
    },
  };
};
