"use client";

import { handleSearch } from "@/functions/handleSearch";
import { dishes } from "@/lib/queries";
import { GraphQLError } from "graphql";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dishes({
  dishes,
  errors,
}: {
  dishes: dishes[];
  errors: GraphQLError;
}) {
  const [search, setSearch] = useState<dishes[]>([]);

  useEffect(() => {
    if (dishes) {
      setSearch(dishes);
    }
  }, [dishes]);

  if (!dishes) {
    return (
      <div className="max-w-5xl mx-auto text-center text-3xl">Loading...</div>
    );
  }

  if (errors) {
    return (
      <div className="max-w-5xl mx-auto text-center text-3xl">
        Error occurred while fetching dishes.
      </div>
    );
  }

  // Map and show dishes here
  return (
    <div>
      <div className="mb-4">
        <input
          className="border border-neutral-600 rounded-full bg-white/80 p-1 pl-4 pr-4 w-full "
          type="text"
          placeholder="Search for dishes..."
          onChange={(e) => handleSearch(e, dishes, setSearch)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-12">
        {search.length > 0 &&
          search?.map((dish: dishes) => {
            return (
              <Link
                href={`/dish/${dish.id}`}
                key={dish.id}
                className="bg-white/80 rounded-xl shadow-lg hover:cursor-pointer p-4"
              >
                <div className="">
                  {/*  Change this to "Image" from next.js and add the domain where you get the image from
                      in next.config.js when youve setup image upload */}
                  <Image
                    className="rounded-xl object-cover h-32 sm:h-52 md:h-64 w-full"
                    src={dish.image}
                    alt={dish.title}
                    width={1000} // Set your preferred width
                    height={1000} // Set your preferred height
                  />

                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-2xl sm:text-3xl">{dish.title}</h3>
                    <p className="line-clamp-3 text-sm sm:text-md">
                      {dish.recipe.information}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      {search.length === 0 && (
        <div className="w-full">
          <h3 className="w-full text-center text-3xl">No dish found</h3>
        </div>
      )}
    </div>
  );
}
