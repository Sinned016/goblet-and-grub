import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { db } from "../../../lib/firebaseAdmin";
import { typeDefs } from "./schema";

interface AddDishArgs {
  title: string;
  tags: string[];
  image: string;
}
interface AddRecipeArgs {
  ingredients: string[];
  information: string;
  instructions: string;
  recipeAuthor: string;
}
interface QueryDish {
  id: string;
  createdAt: string;
  image: string;
  tags: string[];
  title: string;
}

const resolvers = {
  Query: {
    async dishes() {
      try {
        const dishesRef = await db.collection("dishes").get();
        const dishes = dishesRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return dishes;
      } catch (err) {
        console.log(err);
      }
    },
    async dish(_: any, args: { id: string }) {
      try {
        const dishRef = db.collection("dishes").doc(args.id);
        const dishSnap = await dishRef.get();

        return { id: dishSnap.id, ...dishSnap.data() };
      } catch (err) {
        console.log(err);
      }
    },
  },
  Dish: {
    async recipe(parent: QueryDish) {
      try {
        const recipesRef = await db
          .collection("recipes")
          .where("dishId", "==", parent.id)
          .get();

        const recipes = recipesRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return recipes[0];
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    async createDishWithRecipe(
      _: any,
      { dish, recipe }: { dish: AddDishArgs; recipe: AddRecipeArgs }
    ) {
      try {
        const newDishRef = await db.collection("dishes").add({
          title: dish.title,
          tags: dish.tags,
          image: dish.image,
          createdAt: new Date().toISOString(),
        });
        console.log("New Dish ID:", newDishRef.id);

        const newRecipeRef = await db.collection("recipes").add({
          ingredients: recipe.ingredients,
          information: recipe.information,
          instructions: recipe.instructions,
          dishId: newDishRef.id,
          recipeAuthor: recipe.recipeAuthor,
        });
        console.log("New Recipe ID:", newRecipeRef.id);

        return {
          id: newDishRef.id,
          title: dish.title,
          tags: dish.tags,
          image: dish.image,
          createdAt: new Date().toISOString(),
          recipe: {
            id: newRecipeRef.id,
            ingredients: recipe.ingredients,
            information: recipe.information,
            instructions: recipe.instructions,
            recipeAuthor: recipe.recipeAuthor,
          },
        };
      } catch (err) {
        console.error("Error creating dish with recipe:", err);
        throw new Error("Failed to create dish with recipe");
      }
    },
    async deleteDish(_: any, args: { id: string }) {
      try {
        //Storing dish data so i can return it, then deleting the data from the database
        const dishSnap = await db.collection("dishes").doc(args.id).get();

        if (!dishSnap.exists) {
          throw new Error("Dish not found");
        }

        const deletedDishData = { id: dishSnap.id, ...dishSnap.data() };
        await db.collection("dishes").doc(args.id).delete();

        //Storing recipe data so i can return it, then deleting the data from the database
        const recipeSnap = await db
          .collection("recipes")
          .where("dishId", "==", args.id)
          .get();

        let deletedRecipeData = null;
        if (!recipeSnap.empty) {
          deletedRecipeData = {
            id: recipeSnap.docs[0].id,
            ...recipeSnap.docs[0].data(),
          };
        }

        await db.collection("recipes").doc(recipeSnap.docs[0].id).delete();

        return {
          ...deletedDishData,
          recipe: deletedRecipeData,
        };
      } catch (err) {
        console.log("Error deleting dish and recipe" + err);
      }
    },
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// Firebase authentication context
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const context = { req, user: null };

    // console.log("Token:", token);

    if (!token) {
      return context;
    }

    try {
      // const decodedToken = await auth.verifyIdToken(token);
      // context.user = decodedToken;
      // if (decodedToken.admin === true) {
      //   context.user.admin = true;
      // }
    } catch (error) {
      console.error("Error verifying token:", error);
      // throw new Error("Invalid token: ");
    }

    return context;
  },
});

export { handler as GET, handler as POST };
