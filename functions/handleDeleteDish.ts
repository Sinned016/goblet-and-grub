import { auth } from "@/lib/firebaseClient";
import { DELETE_DISH, dishes } from "@/lib/queries";
import { BASE_API_URL } from "@/utils/constants";
import { print } from "graphql";
import { Dispatch, SetStateAction } from "react";

export async function handleDeleteDish(
  selectedDish: dishes | null,
  setSelectedDish: Dispatch<SetStateAction<dishes | null>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setSearch: Dispatch<SetStateAction<dishes[]>>
) {
  const dishId = selectedDish?.id;
  const deleteString = print(DELETE_DISH);
  const user = auth.currentUser;

  if (!user) {
    console.error("User not logged in");
    return;
  }

  try {
    const token = await user.getIdToken();

    const response = await fetch(`${BASE_API_URL}/api/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: deleteString,
        variables: { id: dishId },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Dish deleted successfully", data);

      setSearch((prevDishes) =>
        prevDishes.filter((dish) => dish.id !== selectedDish?.id)
      );

      setSelectedDish(null);
      setOpenDelete(false);
    } else {
      console.error("Error deleting dish", data.errors || data);
      setSelectedDish(null);
      setOpenDelete(false);
    }
  } catch (err) {
    console.log("Not able to delete the dish");
    setSelectedDish(null);
    setOpenDelete(false);
  }
}
