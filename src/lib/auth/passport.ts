import passport from "passport";
import { localStrategy } from "./strategies/local";
import { findUserById } from "../db/models/users";

passport.use(localStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
