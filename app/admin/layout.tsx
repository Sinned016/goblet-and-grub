"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseClient";
import { getIdTokenResult, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idTokenResult = await getIdTokenResult(user);

          if (idTokenResult.claims.role === "admin") {
            setLoading(false);
            console.log("Welcome to the admin page");
          } else {
            console.log("Please login as an admin first");
            router.push("/login");
          }
        } catch (err) {
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <h1 className="text-center font-bold text-3xl">Loading...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-4">Admin page</h1>
      <div className="flex gap-2 justify-center items-center">
        <button
          onClick={() => router.push("/admin")}
          className={cn(
            path === "/admin"
              ? " bg-gray-200"
              : " bg-white hover:bg-gray-100 duration-300",
            "border border-neutral-600 px-3 py-2 rounded-sm"
          )}
        >
          Dishes
        </button>
        <button
          onClick={() => router.push("/admin/create")}
          className={cn(
            path === "/admin/create"
              ? " bg-gray-200"
              : " bg-white hover:bg-gray-100 duration-300",
            "border border-neutral-600 px-3 py-2 rounded-sm"
          )}
        >
          Create
        </button>
      </div>

      <div>{children}</div>
    </div>
  );
}
