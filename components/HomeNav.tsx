import Link from "next/link";

export default function HomeNav() {
  return (
    <div className="relative flex flex-row items-center p-4 sm:p-10">
      <Link href={"/"}>
        <img
          src="/goblet.png"
          className="rotate-12 w-10 h-10 sm:w-14 sm:h-14"
          alt=""
        />
      </Link>

      <Link className="absolute left-1/2 transform -translate-x-1/2" href={"/"}>
        <h1 className="font-bold text-2xl sm:text-5xl md:text-5xl">
          Goblet & Grub
        </h1>
      </Link>
    </div>
  );
}
