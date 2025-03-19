import { gql } from "@apollo/client";

export const GET_DISHES = gql`
  query getAllDishes {
    dishes {
      id
      title
      tags
      image
      recipe {
        ingredients
        information
        recipeAuthor
      }
    }
  }
`;

export interface dishes {
  id: string;
  title: string;
  tags: string[];
  image: string;
  recipe: {
    ingredients: string[];
    information: string;
    recipeAuthor: string;
  };
}

export const GET_DISH = gql`
  query getDish($id: ID!) {
    dish(id: $id) {
      id
      title
      tags
      image
      createdAt
      recipe {
        id
        ingredients
        information
        instructions
        recipeAuthor
      }
    }
  }
`;

export interface dish {
  id: string;
  title: string;
  tags: string[];
  image: string;
  createdAt: string;
  recipe: {
    id: string;
    ingredients: string[];
    information: string;
    instructions: string;
    recipeAuthor: string;
  };
}

export const DELETE_DISH = gql`
  mutation deleteDish($id: ID!) {
    deleteDish(id: $id) {
      id
      title
    }
  }
`;

export interface deleteDish {
  id: string;
  title: string;
}

export const CREATE_DISH = gql`
  mutation createDishWithRecipe(
    $dish: AddDishInput!
    $recipe: AddRecipeInput!
  ) {
    createDishWithRecipe(dish: $dish, recipe: $recipe) {
      id
      title
    }
  }
`;

export interface createDish {
  id: string;
  title: string;
}

export const EDIT_DISH = gql`
  mutation editDish($dish: EditDishInput!, $recipe: EditRecipeInput!) {
    editDish(dish: $dish, recipe: $recipe) {
      id
      title
    }
  }
`;

export interface editDish {
  id: string;
  title: string;
}
