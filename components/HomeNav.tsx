import Link from "next/link";
import AuthStatus from "./AuthStatus";

export default function HomeNav() {
  return (
    <div className="relative flex flex-row items-center justify-between p-4">
      <Link href={"/"}>
        <img
          src="/goblet.png"
          className="rotate-12 w-11 h-11 sm:w-14 sm:h-14"
          alt=""
        />
      </Link>

      <Link className="" href={"/"}>
        <h1 className="font-semibold text-5xl sm:text-5xl lg:text-6xl font-amaticSC">
          Goblet & Grub
        </h1>
      </Link>

      <AuthStatus />
    </div>
  );
}
