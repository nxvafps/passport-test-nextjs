import { NextRequest, NextResponse } from "next/server";
import connection from "@/lib/db/connection";
const { pool } = connection;

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("connect.sid")?.value;

    if (sessionId) {
      await pool.query("DELETE FROM session WHERE sid = $1", [sessionId]);
    }

    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    response.cookies.delete("connect.sid");
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
