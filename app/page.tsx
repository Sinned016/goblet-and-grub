import Dishes from "@/components/Dishes";
import { GET_DISHES } from "@/lib/queries";
import { BASE_API_URL } from "@/utils/constants";
import { print } from "graphql";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  const queryString = print(GET_DISHES);

  if (!BASE_API_URL) {
    return null;
  }

  const response = await fetch(`${BASE_API_URL}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: queryString }),
  });

  const { data, errors } = await response.json();

  return (
    <div className="">
      <div className="max-w-5xl mx-auto ">
        <div className="mt-4 mb-8">
          <p className="text-center text-lg sm:text-2xl font-bold">
            Find your next meal at Goblet & Grub.
          </p>
          <p className="text-center text-lg sm:text-2xl font-bold">
            A place to discover and enjoy delicious recipes.
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <Dishes dishes={data.dishes} errors={errors} />
        </Suspense>
      </div>
    </div>
  );
}
