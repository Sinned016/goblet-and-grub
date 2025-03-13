import Dishes from "@/components/Dishes";
import { GET_DISHES } from "@/lib/queries";
import { print } from "graphql";

export default async function Home() {
  const queryString = print(GET_DISHES);

  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // For production, use Vercel's URL with https
    : "http://localhost:3000"; // For development, use localhost

  const response = await fetch(`${apiUrl}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryString }),
  });

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
