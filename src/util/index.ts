import jwt from 'jsonwebtoken';

const createJwtToken = (user: any) =>
  jwt.sign(user, process.env.SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES,
  });

export { createJwtToken };
