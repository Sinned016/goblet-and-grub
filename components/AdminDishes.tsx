"use client";

import { handleSearch } from "@/functions/handleSearch";
import { dishes } from "@/lib/queries";
import { GraphQLError } from "graphql";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { handleDeleteDish } from "@/functions/handleDeleteDish";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminDishes({
  dishes,
  errors,
}: {
  dishes: dishes[];
  errors: GraphQLError;
}) {
  const [search, setSearch] = useState<dishes[]>([]);
  const [selectedDish, setSelectedDish] = useState<dishes | null>(null); // For selected dish
  const [openSettings, setOpenSettings] = useState<boolean>(false); // Control dialog open state
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const router = useRouter();

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

  function handleOpenDish(dish: dishes) {
    setSelectedDish(dish);
    setOpenSettings(true);
  }

  // Map and show dishes here
  return (
    <div>
      <div className="mb-4">
        <input
          className="border border-neutral-600 rounded-full bg-white/90 p-1 pl-4 pr-4 w-full shadow-lg"
          type="text"
          placeholder="Search for dishes..."
          onChange={(e) => handleSearch(e, dishes, setSearch)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-12">
        {search.length > 0 &&
          search?.map((dish: dishes) => {
            return (
              <div
                key={dish.id}
                className="bg-white/80 rounded-xl p-4 shadow-lg hover:cursor-pointer"
                onClick={() => handleOpenDish(dish)}
              >
                <div className="">
                  {/*  Change this to "Image" from next.js and add the domain where you get the image from
                      in next.config.js when youve setup image upload */}
                  <Image
                    className="rounded-xl object-cover h-32 sm:h-52 md:h-64 w-full"
                    src={dish.image}
                    alt={dish.title}
                    width={1000}
                    height={1000}
                  />

                  <div className="flex flex-col gap-2 mt-2">
                    <h3 className="font-amaticSC font-bold text-3xl sm:text-4xl">
                      {dish.title}
                    </h3>
                    <p className="line-clamp-3 text-sm sm:text-md">
                      {dish.recipe.information}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {search.length === 0 && (
        <div className="w-full">
          <h3 className="w-full text-center text-3xl">No dish found</h3>
        </div>
      )}

      <Dialog open={openSettings} onOpenChange={setOpenSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-amaticSC font-bold text-4xl">
              {selectedDish?.title}
            </DialogTitle>
            <DialogDescription>
              Do you want to delete or edit your dish?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => router.push(`/admin/edit/${selectedDish?.id}`)}
              className="bg-yellow-500 py-2 px-3 rounded-lg text-white hover:bg-yellow-600 duration-300"
            >
              Edit
            </button>
            <button
              className="bg-red-500 py-2 px-3 rounded-lg text-white hover:bg-red-600 duration-300"
              onClick={() => {
                setOpenSettings(false);
                setOpenDelete(true);
              }}
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-amaticSC font-bold text-4xl">
              Delete {selectedDish?.title}?
            </DialogTitle>
            <DialogDescription>
              Do you want to delete {selectedDish?.title}?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <button
              onClick={() =>
                handleDeleteDish(
                  selectedDish,
                  setSelectedDish,
                  setOpenDelete,
                  setSearch
                )
              }
              className="bg-red-500 py-2 px-3 rounded-lg text-white hover:bg-red-600 duration-300"
            >
              Yes
            </button>
            <button
              className="bg-gray-500 py-2 px-3 rounded-lg text-white hover:bg-gray-600 duration-300"
              onClick={() => setOpenDelete(false)}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
