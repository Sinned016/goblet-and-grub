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
        instructions
      }
    }
  }
`;

export const GET_DISH = gql`
  query getDish($id: String!) {
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
  recipe: {
    ingredients: string[];
    information: string;
    instructions: string;
  };
}
