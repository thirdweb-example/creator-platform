import { useEffect, useState } from "react";
import { User } from "../types";
import { useUser } from "@thirdweb-dev/react";

const useQueryUser = () => {
  const { user: thirdwebUser } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user", {
          method: "GET",
        });
        const user = await response.json();
        setUser(user);
      } catch (error) {}
    };

    fetchUser();
  }, [thirdwebUser]);

  return user;
};

export { useQueryUser };
