"use client";

import Tiptap from "@/components/TipTap";
import { auth } from "@/lib/firebaseClient";
import { CREATE_DISH } from "@/lib/queries";
import { BASE_API_URL } from "@/utils/constants";
import { print } from "graphql";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isFieldEmpty } from "@/functions/isFieldEmpty";
import { useRouter } from "next/navigation";

interface Dish {
  title: string;
  tags: string[];
  image: string;
  information: string;
  ingredients: string[];
  instructions: string;
  recipeAuthor: string;
}

export default function CreateDish() {
  const [newDish, setNewDish] = useState<Dish>({
    title: "",
    tags: [],
    image: "",
    information: "",
    ingredients: [],
    instructions: "",
    recipeAuthor: "",
  });
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("");
  const [openSaveDish, setOpenSaveDish] = useState<boolean>(false);
  const [invalidFields, setInvalidFields] = useState({
    title: false,
    image: false,
    information: false,
    ingredients: false,
    instructions: false,
    recipeAuthor: false,
    tags: false,
  });
  const [saveError, setSaveError] = useState<string>("");

  const router = useRouter();

  console.log(newIngredient);
  console.log(newDish);

  function handleEditChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.target;

    setNewDish({
      ...newDish,
      [name]: value,
    });
  }

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
  ) => {
    if (e.key === "Enter" && value.trim() !== "") {
      e.preventDefault();

      const { name } = e.target as HTMLInputElement;

      setNewDish((prev) => ({
        ...prev,
        [name]: [...(prev[name] as string[]), value],
      }));

      setValue("");
    }
  };

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newInvalidFields = {
      title: isFieldEmpty(newDish.title),
      image: isFieldEmpty(newDish.image),
      information: isFieldEmpty(newDish.information),
      ingredients: isFieldEmpty(newDish.ingredients),
      instructions: isFieldEmpty(newDish.instructions),
      recipeAuthor: isFieldEmpty(newDish.recipeAuthor),
      tags: isFieldEmpty(newDish.tags),
    };

    setInvalidFields(newInvalidFields);

    if (!Object.values(newInvalidFields).includes(true)) {
      setOpenSaveDish(true);
    }
  }
  async function handleAddDish() {
    const createDishString = print(CREATE_DISH);
    const user = auth.currentUser;

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const dishObject = {
      title: newDish.title,
      tags: newDish.tags,
      image: newDish.image,
    };

    const recipeObject = {
      ingredients: newDish.ingredients,
      information: newDish.information,
      instructions: newDish.instructions,
      recipeAuthor: newDish.recipeAuthor,
    };

    try {
      const token = await user.getIdToken();

      const response = await fetch(`${BASE_API_URL}/api/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: createDishString,
          variables: { dish: dishObject, recipe: recipeObject },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Dish added successfully", data);
        setOpenSaveDish(false);
        setSaveError("");
        router.push("/admin");
      } else {
        console.error("Error adding dish", data.errors || data);
        setSaveError("Error adding dish");
      }
    } catch (err) {
      console.log(err);
      setSaveError("Error adding dish");
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-4 xl:px-8">
      <div className="p-4 bg-white/80 rounded-lg mt-4 border border-neutral-600">
        <h1 className="font-bold text-3xl text-center">Create Dish</h1>
        <form className="flex flex-col gap-2" onSubmit={handleSave}>
          <div>
            <label
              className={
                invalidFields.title ? "font-bold text-red-500" : "font-bold "
              }
              htmlFor=""
            >
              Title*
            </label>
            <input
              className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg my-2"
              value={newDish.title}
              name="title"
              type="text"
              placeholder="Dish title..."
              onChange={handleEditChange}
            />
          </div>

          {/* Make it so you can upload images */}
          <div>
            <label
              className={
                invalidFields.image ? "font-bold text-red-500" : "font-bold "
              }
              htmlFor=""
            >
              Image*
            </label>
            <input
              className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg my-2"
              value={newDish.image}
              name="image"
              type="text"
              placeholder="Dish image..."
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label
              className={
                invalidFields.information
                  ? "font-bold text-red-500"
                  : "font-bold "
              }
              htmlFor=""
            >
              Information*
            </label>
            <input
              className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg my-2"
              value={newDish.information}
              name="information"
              type="text"
              placeholder="Dish information..."
              onChange={handleEditChange}
            />
          </div>

          <div>
            <label
              className={
                invalidFields.ingredients
                  ? "font-bold text-red-500"
                  : "font-bold "
              }
              htmlFor=""
            >
              Ingredients*
            </label>
            <input
              className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg my-2"
              name="ingredients"
              type="text"
              placeholder="Dish Ingredients..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={(e) =>
                handleKeyDown(e, newIngredient, setNewIngredient)
              }
            />

            {newDish.ingredients.length > 0 && (
              <div className="flex gap-2 mt-4 mb-2 rounded-lg flex-wrap ">
                {newDish.ingredients.map((ingredient, i) => (
                  <div className="px-3 py-2 bg-green-400 rounded-full" key={i}>
                    <p className="text-sm">{ingredient}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              className={
                invalidFields.instructions
                  ? "font-bold text-red-500"
                  : "font-bold "
              }
              htmlFor=""
            >
              Instructions*
            </label>
            <div className="my-2">
              <Tiptap
                newDish={newDish}
                setNewDish={setNewDish}
                dish={newDish.instructions}
              />
            </div>
          </div>

          <div>
            <label
              className={
                invalidFields.tags ? "font-bold text-red-500" : "font-bold "
              }
              htmlFor=""
            >
              Tags*
            </label>
            <input
              className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg my-2"
              value={newTag}
              name="tags"
              type="text"
              placeholder="Dish tags..."
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, newTag, setNewTag)}
            />

            {newDish.tags.length > 0 && (
              <div className="flex gap-2  mt-4 mb-2 rounded-lg flex-wrap ">
                {newDish.tags.map((tag, i) => (
                  <div className="px-3 py-2 bg-yellow-400 rounded-full" key={i}>
                    <p className="text-sm">{tag}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              className={
                invalidFields.recipeAuthor
                  ? "font-bold text-red-500"
                  : "font-bold "
              }
              htmlFor=""
            >
              Recipe Author*
            </label>
            <input
              className="w-full bg-white/80 border py-2 px-3 border-neutral-600 rounded-lg my-2 "
              value={newDish.recipeAuthor}
              name="recipeAuthor"
              type="text"
              placeholder="Author of the recipe..."
              onChange={handleEditChange}
            />
          </div>

          {saveError && (
            <p className=" font-bold text-center text-red-500">{saveError}</p>
          )}

          <div className="flex justify-between items-center mt-2">
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
      </div>

      <Dialog open={openSaveDish} onOpenChange={setOpenSaveDish}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add {newDish?.title}?</DialogTitle>
            <DialogDescription>
              Are you sure you want to add {newDish?.title}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleAddDish}
              className="bg-green-500 py-2 px-3 rounded-lg text-white hover:bg-green-600 duration-300"
            >
              Yes
            </button>
            <button
              className="bg-gray-500 py-2 px-3 rounded-lg text-white hover:bg-gray-600 duration-300"
              onClick={() => setOpenSaveDish(false)}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
