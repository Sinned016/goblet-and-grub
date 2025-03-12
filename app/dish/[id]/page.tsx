import { dish, GET_DISH } from "@/lib/queries";
import { print } from "graphql";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function DishPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryString = print(GET_DISH);

  // Change localhost:3000 to the actual route of my page later during prod.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryString,
        variables: { id },
      }),
    }
  );

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
    <div className="max-w-3xl mx-auto flex flex-col gap-4 xl:px-8">
      <Link
        href={"/"}
        className="flex max-w-fit gap-2 font-bold bg-white/70 text-black hover:bg-gray-200/70 hover:cursor-pointer duration-300 border border-black p-2 rounded-xl    "
      >
        <ArrowLeft />
        <p>Back to home</p>
      </Link>

      {/*  Change this to "Image" from next.js and add the domain where you get the image from
      in next.config.js when youve setup image upload */}
      <img
        src={dish.image}
        alt={dish.title}
        className="rounded-xl object-cover h-72 sm:h-[380px] w-full "
      />

      <div className="flex justify-between item-center">
        <p className="font-bold">Author: {dish.recipe.recipeAuthor}</p>
        <p className="font-bold">{dish.createdAt.split("T")[0]}</p>
      </div>

      <h1 className="text-4xl font-bold">{dish.title}</h1>

      <div className="bg-white/70 p-4 rounded-xl border border-neutral-600">
        <h2 className="text-2xl font-bold">About</h2>
        <p>{dish.recipe.information}</p>
      </div>

      <div className="bg-white/70 p-4 rounded-xl border border-neutral-600">
        <h2 className="text-2xl font-bold">Ingredients</h2>
        {dish.recipe.ingredients.map((ingredient, i) => {
          return <p key={i}>{ingredient}</p>;
        })}
      </div>

      <div className="bg-white/70 p-4 rounded-xl border border-neutral-600">
        <h2 className="text-2xl font-bold">Recipe</h2>
        <p>{dish.recipe.instructions}</p>
      </div>
    </div>
  );
}
