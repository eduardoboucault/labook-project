import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayLoad } from "../models/User";

dotenv.config();

export class TokenManager {
  public createToken = (payload: TokenPayLoad): string => {
    const token = jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return token;
  };

  public getPayLoad = (token: string): TokenPayLoad | null => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);
      return payload as TokenPayLoad;
    } catch (error) {
      return null;
    }
  };
}
