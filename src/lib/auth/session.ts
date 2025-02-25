import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { TypedIronSession } from "../../types/session";

export const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "complex_password_at_least_32_characters_long",
  cookieName: "next-auth-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async () => {
  const cookieStore = await cookies();
  return getIronSession<TypedIronSession>(cookieStore, sessionOptions);
};
