"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function ChangePage({
  currentPage,
  setCurrentPage,
  hasNextPage,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  hasNextPage: boolean;
}) {
  const Router = useRouter();

  function handleNextPage() {
    const nextPage = currentPage + 1;
    Router.push(`/?page=${nextPage}`);
    setCurrentPage(nextPage);
  }

  function handlePrevPage() {
    const prevPage = currentPage - 1;
    Router.push(`/?page=${prevPage}`);
    setCurrentPage(prevPage);
  }

  return (
    <div className="flex justify-center items-center gap-4">
      {currentPage > 1 ? (
        <button
          onClick={handlePrevPage}
          className="bg-white/90 p-2 rounded-lg hover:bg-gray-200/80 hover:cursor-pointer duration-300 text-sm border border-neutral-600"
        >
          <ArrowLeft />
        </button>
      ) : (
        <button className="bg-gray-300/90 p-2 rounded-lg hover:cursor-default duration-300 text-sm border border-neutral-600">
          <ArrowLeft />
        </button>
      )}

      <p className="font-bold text-lg">{currentPage}</p>

      {hasNextPage ? (
        <button
          onClick={handleNextPage}
          className="bg-white/90 p-2 rounded-lg hover:bg-gray-200/80 hover:cursor-pointer duration-300 text-sm border border-neutral-600"
        >
          <ArrowRight />
        </button>
      ) : (
        <button className="bg-gray-300/90 p-2 rounded-lg hover:cursor-default duration-300 text-sm border border-neutral-600">
          <ArrowRight />
        </button>
      )}
    </div>
  );
}
