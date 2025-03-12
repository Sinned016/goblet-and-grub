import Dishes from "@/components/Dishes";
import { GET_DISHES } from "@/lib/queries";
import { print } from "graphql";

export default async function Home() {
  const queryString = print(GET_DISHES);

  // Change localhost:3000 to the actual route of my page later during prod.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: queryString }),
    }
  );

  const { data, errors } = await response.json();

  return (
    <div className="">
      <div className="max-w-5xl mx-auto ">
        <div className="mb-10">
          <p className="text-center text-xl sm:text-2xl font-bold">
            Find your next meal at Goblet & Grub.
          </p>
          <p className="text-center text-xl sm:text-2xl font-bold">
            A place to discover and enjoy delicious recipes.
          </p>
        </div>

        <Dishes dishes={data.dishes} errors={errors} />
      </div>
    </div>
  );
}
