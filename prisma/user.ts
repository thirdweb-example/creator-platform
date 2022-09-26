import { User } from "../types";
import prisma from "./prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const getUser = async ({ address }: { address: string }) => {
  const user: User | null = await prisma.user.findUnique({
    where: {
      address,
    },
  });
  return user;
};

export const createUser = async ({
  name,
  bio,
  avatar,
  address,
}: {
  name: string;
  bio: string;
  avatar: string;
  address: string;
}) => {
  const user: User = await prisma.user.create({
    data: {
      name,
      bio,
      avatar,
      address,
    },
  });
  return user;
};

export const updateUser = async (address: string, updateData) => {
  const user: User = await prisma.user.update({
    where: {
      address,
    },
    data: {
      ...updateData,
    },
  });
  return user;
};

export const deleteUser = async (address: string) => {
  const user: User = await prisma.user.delete({
    where: {
      address,
    },
  });
  return user;
};
