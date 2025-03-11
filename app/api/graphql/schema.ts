import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Dish {
    id: ID!
    title: String!
    tags: [String!]!
    createdAt: String!
    image: String!
    recipe: Recipe!
  }
  type Recipe {
    id: ID!
    ingredients: [String!]!
    information: String!
    instructions: String!
    recipeAuthor: String!
  }
  type Query {
    dishes: [Dish]
    dish(id: ID!): Dish
  }
  type Mutation {
    createDishWithRecipe(dish: AddDishInput, recipe: AddRecipeInput): Dish
    deleteDish(id: ID!): Dish
  }
  input AddDishInput {
    title: String!
    tags: [String!]!
    image: String!
  }
  input AddRecipeInput {
    ingredients: [String!]!
    information: String!
    instructions: String!
    recipeAuthor: String!
  }
`;
