import { NextResponse } from "next/server";
import passport from "passport";
import "../../../../lib/auth";
import { getSession } from "../../../../lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    const session = await getSession();

    return new Promise((resolve, reject) => {
      passport.authenticate("local", async (err: any, user: any, info: any) => {
        if (err) {
          return resolve(
            NextResponse.json(
              { message: "Authentication error" },
              { status: 500 }
            )
          );
        }
        if (!user) {
          return resolve(
            NextResponse.json(
              { message: "Invalid credentials" },
              { status: 401 }
            )
          );
        }

        // Store user data in the session
        session.user = {
          id: user.id,
          username: user.username,
        };
        await session.save();

        return resolve(
          NextResponse.json(
            {
              message: "Logged in successfully",
              user: { id: user.id, username: user.username },
            },
            { status: 200 }
          )
        );
      })({ body: { username, password } });
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
