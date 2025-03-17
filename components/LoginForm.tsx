"use client";

import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginForm() {
  const [adminLogin, setAdminLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAdminLogin({
      ...adminLogin,
      [name]: value,
    });
  }
  const router = useRouter();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        adminLogin.email,
        adminLogin.password
      );

      router.push("/admin");
    } catch (err: any) {
      setError("Incorrect Username or Password");
    }
  }

  return (
    <form
      className="border rounded-xl border-neutral-600 p-4 bg-white/70"
      onSubmit={(e) => handleLogin(e)}
    >
      <h1 className="font-bold text-3xl text-center mb-2">Admin Sign in</h1>

      <div className="flex flex-col gap-2 mb-2">
        <p className="font-bold">Email</p>
        <input
          className="w-full px-3 py-2 rounded-lg border border-neutral-600"
          type="text"
          name="email"
          value={adminLogin.email}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <p className="font-bold">Password</p>
        <input
          className="w-full px-3 py-2 rounded-lg border border-neutral-600"
          type="password"
          name="password"
          value={adminLogin.password}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <button className="w-full bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-2 rounded-lg">
        Sign in
      </button>

      {error && (
        <p className="text-sm font-bold text-center text-red-600 mt-4">
          {error}
        </p>
      )}
    </form>
  );
}
