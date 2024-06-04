import jwt from "jsonwebtoken";
import moment from "moment";

const createToken = (userId: number, exp: any) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: exp.unix(),
  };
  return jwt.sign(payload, "secretOrKey");
};

export const generateTokens = async (user: any) => {
  const accessTokenExpireTime = moment().add(1, "minute");
  const accessToken = await createToken(user.id, accessTokenExpireTime);

  const refreshTokenExpireTime = moment().add(2, "days");
  const refreshToken = await createToken(user.id, refreshTokenExpireTime);
  return { accessToken, refreshToken };
};
