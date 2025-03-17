import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

// Call this with postman and send the uid in the body to make an account admin.
export async function POST(req: Request) {
  const { uid, secret } = await req.json();

  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!uid) {
    return NextResponse.json({ message: "UID is required" }, { status: 400 });
  }

  try {
    await adminAuth.setCustomUserClaims(uid, { role: "admin" });
    return NextResponse.json(
      { message: "Admin role set successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to set admin role" },
      { status: 500 }
    );
  }
}
