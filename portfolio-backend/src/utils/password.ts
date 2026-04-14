import bcrypt from "bcryptjs";

export const hashPassword = async (plainPassword: string) => {
  return bcrypt.hash(plainPassword, 10);
};

export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
