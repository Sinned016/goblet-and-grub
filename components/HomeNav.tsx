import Link from "next/link";
import NavSearch from "./NavSearch";

export default function HomeNav() {
  return (
    <div className="relative flex flex-row items-center p-10">
      <Link href={"/"}>
        <img
          width={60}
          height={60}
          src="/goblet.png"
          className="rotate-12"
          alt=""
        />
      </Link>

      <Link className="absolute left-1/2 transform -translate-x-1/2" href={"/"}>
        <h1 className=" text-5xl">Goblet & Grub</h1>
      </Link>
    </div>
  );
}
