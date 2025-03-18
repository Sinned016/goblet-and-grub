"use client";
import { auth } from "@/lib/firebaseClient";
import {
  getIdTokenResult,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const idTokenResult = await getIdTokenResult(user);

          if (idTokenResult.claims.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await signOut(auth); // Sign the user out
  //     setIsAdmin(false);
  //   } catch (error) {
  //     console.log("Error logging out");
  //   }
  // };

  return (
    <div className="flex gap-4">
      {isAdmin && (
        <button
          className="bg-white/80 p-2 rounded-lg hover:bg-gray-200/80 hover:cursor-pointer duration-300 text-sm"
          onClick={() => router.push("/admin")}
        >
          Admin
        </button>
      )}
      {/* {user ? (
        <button
          className="bg-white/80 p-2 rounded-lg hover:bg-gray-200/80 hover:cursor-pointer duration-300 text-sm"
          onClick={handleLogout}
        >
          Sign out
        </button>
      ) : (
        <button
          className="bg-white/80 p-2 rounded-lg hover:bg-gray-200/80 hover:cursor-pointer duration-300 text-sm"
          onClick={() => router.push("/login")}
        >
          Sign in
        </button>
      )} */}
    </div>
  );
}
