import AdminDishes from "@/components/AdminDishes";
import { GET_DISHES } from "@/lib/queries";
import { BASE_API_URL } from "@/utils/constants";
import { print } from "graphql";

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
    <div className="max-w-5xl mx-auto mt-4">
      <AdminDishes dishes={data.dishes} errors={errors} />
    </div>
  );
}
