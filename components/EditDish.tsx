"use client";

import { dish } from "@/lib/queries";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function EditDish({ dish }: { dish: dish }) {
  const router = useRouter();
  const [editData, setEditData] = useState({
    title: dish.title,
    tags: dish.tags,
    image: dish.image,
    information: dish.recipe.information,
    ingredients: dish.recipe.ingredients,
    instructions: dish.recipe.instructions,
    recipeAuthor: dish.recipe.recipeAuthor,
  });

  // When i send the data to my backend I cant just send this state ^ I have to make it look like how i recieve it in the backend.

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  }

  return (
    <form className="flex flex-col gap-2">
      <div>
        <label className="font-bold" htmlFor="">
          Title
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.title}
          name="title"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div>
        <label className="font-bold" htmlFor="">
          Tags
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.tags}
          name="tags"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div>
        <label className="font-bold" htmlFor="">
          Image
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.image}
          name="image"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div>
        <label className="font-bold" htmlFor="">
          Information
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.information}
          name="information"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div>
        <label className="font-bold" htmlFor="">
          Ingredients
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.ingredients}
          name="ingredients"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div>
        <label className="font-bold" htmlFor="">
          Instructions
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.instructions}
          name="instructions"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div>
        <label className="font-bold" htmlFor="">
          Recipe Author
        </label>
        <input
          className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg"
          value={editData.recipeAuthor}
          name="recipeAuthor"
          type="text"
          onChange={handleEditChange}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            router.push("/admin");
          }}
          className="bg-gray-500 py-2 px-3 rounded-lg text-white hover:bg-gray-600 duration-300"
        >
          Cancel
        </button>
        <button className="bg-green-500 py-2 px-3 rounded-lg text-white hover:bg-green-600 duration-300">
          Save
        </button>
      </div>
    </form>
  );
}
