import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { verifyUser } from "./db/models/users";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await verifyUser(username, password);
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
