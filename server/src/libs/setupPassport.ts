import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
// import { users } from "../models/user.model";

const jwtAuth = new JwtStrategy(
  {
    secretOrKey: "secretOrKey",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload, done) => {
    // const user = users.find((u) => payload.sub === u.id);
    // if (!user) done(null, false);
    // else done(null, user);
    done(null,true);
  }
);

passport.use(jwtAuth);
