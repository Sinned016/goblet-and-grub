import { dish, dishes } from "@/lib/queries";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function handleSearch(
  e: ChangeEvent<HTMLInputElement>,
  data: dishes[],
  setSearch: Dispatch<SetStateAction<dishes[]>>
) {
  const searchedWord = e.target.value.toLowerCase();

  // Filtering on title, tags and ingredients
  const filteredData = data.filter((dish: dishes) => {
    const matchedTitle = dish.title.toLowerCase().includes(searchedWord);

    const matchedTags = dish.tags.some((tag) =>
      tag.toLowerCase().includes(searchedWord)
    );

    const matchedIngredients = dish.recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(searchedWord)
    );

    return matchedTitle || matchedTags || matchedIngredients;
  });

  setSearch(filteredData);
}
