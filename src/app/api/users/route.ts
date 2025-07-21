import { NextResponse } from "next/server";
import users from "../../../services/users.json";

export async function GET() {
  return NextResponse.json({
    success: true,
    users: users.map(({ email }) => email),
  });
}
