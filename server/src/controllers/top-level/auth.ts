import Express from "express";
import { logger } from "../../libs/setupWinston";
import { registerUser, validateUser } from "../../services/auth.service";
import { generateTokens } from "../../services/token.service";

export const register = async (req: Express.Request, res: Express.Response) => {
  try {
    const user = await registerUser(req.body);
    const tokens = await generateTokens(user);

    return res.status(200).json({ user, tokens });
  } catch (error: any) {
    logger.error(error?.message);
    return res.status(402).json({ error: error.message });
  }
};

export const login = async (req: Express.Request, res: Express.Response) => {
  try {
    const user = await validateUser(req.body);
    const tokens = await generateTokens(user);
    return res.status(200).json({ user, tokens });
  } catch (error: any) {
    logger.error(error?.message);

    return res.status(402).json({ error: error.message });
  }
};
