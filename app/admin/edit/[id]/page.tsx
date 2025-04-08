import EditDish from "@/components/EditDish";
import { dish, GET_DISH } from "@/lib/queries";
import { BASE_API_URL } from "@/utils/constants";
import { print } from "graphql";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const queryString = print(GET_DISH);

  if (!BASE_API_URL) {
    return null;
  }

  const response = await fetch(`${BASE_API_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: queryString,
      variables: { id },
    }),
  });

  const { data, errors } = await response.json();
  const dish: dish = data.dish;

  if (errors) {
    return (
      <div className="max-w-3xl mx-auto text-center text-3xl">
        Error fetching data
      </div>
    );
  }

  if (!dish) {
    return <div className="max-w-3xl mx-auto">Dish not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto xl:px-8 mt-4">
      {/* <Link
        href={"/admin"}
        className="flex max-w-fit gap-2 font-bold bg-white/70 text-black hover:bg-gray-200/70 hover:cursor-pointer duration-300 border border-black p-2 rounded-xl    "
      >
        <ArrowLeft />
        <p>Back to dishes</p>
      </Link> */}

      <div className="p-6 bg-white/90 rounded-xl border border-neutral-600">
        <h1 className="font-amaticSC font-bold text-5xl text-center mb-2">
          Edit Dish
        </h1>

        <EditDish dish={dish} />
      </div>
    </div>
  );
}
