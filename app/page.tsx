import Dishes from "@/components/Dishes";
import { GET_DISHES } from "@/lib/queries";
import { useQuery } from "@apollo/client";

export default function Home() {
  return (
    <div className="">
      <div className="max-w-5xl mx-auto ">
        <div className="mb-10">
          <p className="text-center text-2xl">
            Find your next meal at Goblet & Grub.
          </p>
          <p className="text-center text-2xl">
            A place to discover and enjoy delicious recipes.
          </p>
        </div>

        <Dishes />
      </div>
    </div>
  );
}
