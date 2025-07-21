import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import users from "../../../services/users.json";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 1 * 60 * 1000; // 1 minute

const lastLoginAttemptTime = new Map<string, number>();
const failedAttempts = new Map<string, number>();

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parse = loginSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { success: false, error: "invalidInput" },
      { status: 400 }
    );
  }
  const { email, password } = parse.data;

  const hashedPassword = await hashPassword(password);

  const user = users.find((u) => u.email === email);
  const loginLocked =
    Date.now() - (lastLoginAttemptTime.get(email) ?? 0) < LOCK_TIME &&
    MAX_ATTEMPTS <= (failedAttempts.get(email) ?? 0);

  if (user && !loginLocked) {
    const match = await bcrypt.compare(user.password, hashedPassword);
    if (match) {
      return NextResponse.json({ success: true });
    }
  } else if (loginLocked) {
    return NextResponse.json(
      {
        success: false,
        error: "tooManyAttempts",
      },
      { status: 429 }
    );
  }

  lastLoginAttemptTime.set(email, Date.now());
  failedAttempts.set(email, (failedAttempts.get(email) ?? 0) + 1);

  if (failedAttempts.get(email) === MAX_ATTEMPTS + 1) {
    failedAttempts.set(email, 1);
  }

  return NextResponse.json(
    { success: false, error: "invalidEmailOrPassword" },
    { status: 401 }
  );
}
