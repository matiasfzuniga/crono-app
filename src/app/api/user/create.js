import { SHA256 as sha256 } from "crypto-js";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
export default async function handle(req, res) {
  if (req.method === "POST") {
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
export const hashPassword = (string) => {
  return sha256(string).toString();
};
async function createUserHandler(req, res) {
  let errors = [];
  const { name, email, password } = req.body;
 
  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
  }
  try {
    const user = await prisma.user.create({
      data: { ...req.body, password: hashPassword(req.body.password) },
    });
    return res.status(201).json({ user });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }
  }
}