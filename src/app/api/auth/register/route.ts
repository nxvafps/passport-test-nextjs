import { createUser } from "@/lib/db/models/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password, name, email } = await request.json();

    if (!username || !password || !name || !email) {
      return NextResponse.json(
        { error: "All details are required" },
        { status: 400 }
      );
    }

    const user = await createUser(username, password, name, email);
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === "23505") {
      // PostgreSQL unique violation error
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
