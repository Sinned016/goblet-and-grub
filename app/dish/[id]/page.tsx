import { dish, GET_DISH } from "@/lib/queries";
import { BASE_API_URL } from "@/utils/constants";
import { print } from "graphql";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function DishPage({
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
    <div className="max-w-3xl mx-auto flex flex-col gap-4">
      {/* <Link
        href={"/"}
        className="flex max-w-fit gap-2 font-bold bg-white/70 text-black hover:bg-gray-200/70 hover:cursor-pointer duration-300 border border-black p-2 rounded-xl    "
      >
        <ArrowLeft />
        <p>Back to home</p>
      </Link> */}

      {/*  Change this to "Image" from next.js and add the domain where you get the image from
      in next.config.js when youve setup image upload */}

      <Image
        src={dish.image}
        alt={dish.title}
        width={1000} // Set your preferred width
        height={1000} // Set your preferred height
        className="rounded-xl object-cover h-72 sm:h-[380px] w-full "
      />

      <div className=" flex flex-col gap-4 p-4 bg-white/80 rounded-xl">
        <h1 className="text-4xl font-bold">{dish.title}</h1>

        <p>{dish.recipe.information}</p>

        <div className="">
          <h2 className="text-3xl font-bold mb-2">Ingredients</h2>
          {dish.recipe.ingredients.map((ingredient, i) => {
            return <div key={i}>{ingredient}</div>;
          })}
        </div>

        <div className="">
          <h2 className="text-3xl font-bold mb-2">Recipe</h2>
          <div dangerouslySetInnerHTML={{ __html: dish.recipe.instructions }} />
        </div>

        <div className="flex flex-row justify-between">
          <p className="font-bold">{dish.recipe.recipeAuthor}</p>
          <p className="font-bold">{dish.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
}
