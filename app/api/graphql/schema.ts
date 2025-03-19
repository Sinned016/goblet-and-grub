import gql from "graphql-tag";

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
    editDish(dish: EditDishInput, recipe: EditRecipeInput): Dish
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
  input EditDishInput {
    id: ID!
    title: String!
    tags: [String!]!
    image: String!
    createdAt: String!
  }
  input EditRecipeInput {
    id: ID!
    ingredients: [String!]!
    information: String!
    instructions: String!
    recipeAuthor: String!
  }
`;
