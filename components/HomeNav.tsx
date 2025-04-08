import Link from "next/link";
import AuthStatus from "./AuthStatus";

export default function HomeNav() {
  return (
    <div className="relative flex flex-row items-center justify-between py-4 sm:p-4">
      <Link href={"/"}>
        <img
          src="/goblet.png"
          className="rotate-12 w-11 h-11 sm:w-14 sm:h-14"
          alt=""
        />
      </Link>

      <Link className="" href={"/"}>
        <h1 className="font-bold text-4xl sm:text-4xl lg:text-5xl">
          Goblet & Grub
        </h1>
      </Link>

      <AuthStatus />
    </div>
  );
}
