import { NextApiRequest, NextApiResponse } from "next";
import { createUser, deleteUser, getUser, updateUser } from "../../prisma/user";

import { getUser as getUserThirdweb } from "../../auth.config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const thirdwebUser = await getUserThirdweb(req);

  if (!thirdwebUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      const user = await getUser({ address: thirdwebUser.address });
      return res.status(200).json(user);
    } else if (req.method === "POST") {
      const { name, bio, avatar } = JSON.parse(req.body);

      if (!name || !bio) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const user = await createUser({
        name,
        bio,
        avatar,
        address: thirdwebUser.address,
      });

      return res.json(user);
    } else if (req.method === "PUT") {
      const { ...updateData } = JSON.parse(req.body);

      const user = await updateUser(thirdwebUser.address, updateData);
      return res.json(user);
    } else if (req.method === "DELETE") {
      const user = await deleteUser(thirdwebUser.address);
      return res.json(user);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handler;
