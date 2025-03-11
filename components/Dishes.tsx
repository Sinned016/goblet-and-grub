"use client";

import { handleSearch } from "@/functions/handleSearch";
import { dish, GET_DISHES } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";

export default function Dishes() {
  const { loading, error, data } = useQuery(GET_DISHES);
  const [search, setSearch] = useState<dish[]>([]);
  console.log(search);

  useEffect(() => {
    if (data?.dishes) {
      setSearch(data.dishes);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching dishes.</div>;
  }

  // Map and show dishes here
  return (
    <div>
      <div className="mb-4">
        <input
          className="border border-neutral-600 rounded-full bg-white/70 p-1 pl-4 pr-4 w-full"
          type="text"
          placeholder="Search for meals..."
          onChange={(e) => handleSearch(e, data.dishes, setSearch)}
        />
      </div>

      <div className="grid grid-cols-3 gap-12">
        {search.length > 0 &&
          search?.map((dish: dish) => {
            return (
              <div className="bg-white/70 rounded-xl p-4 " key={dish.id}>
                <div className="">
                  <div className="w-full">
                    <img
                      className="rounded-xl object-cover h-64 w-full"
                      src={dish.image}
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="text-3xl">{dish.title}</h3>
                    <p className="line-clamp-3">{dish.recipe.information}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {search.length === 0 && (
        <div className="w-full">
          <h3 className="w-full text-center text-3xl">No meal found</h3>
        </div>
      )}
    </div>
  );
}
