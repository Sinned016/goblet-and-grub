import { adminAuth } from "./firebaseAdmin";

export async function checkAdmin(token: string | undefined) {
  if (!token) {
    throw new Error("No token provided");
  }

  console.log("This is your token ", token);

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);

    console.log("Decoded Token:", decodedToken); // Log full token

    if (decodedToken.role !== "admin") {
      throw new Error("Unauthorized: Admin access required.");
    }

    return decodedToken;
  } catch (err) {
    throw new Error("Authentication failed");
  }
}
