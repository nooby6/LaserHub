"use client";

import { ITEM_PER_PAGE } from "../lib/settings";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * Pagination component for navigating through paginated data.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.page - The current page number.
 * @param {number} props.count - The total number of items.
 *
 * @returns {JSX.Element} The rendered Pagination component.
 *
 * @remarks
 * This component provides navigation buttons for paginated data, including
 * "Prev" and "Next" buttons, as well as individual page number buttons.
 * It uses the `useRouter` hook from Next.js to handle page navigation.
 *
 * @example
 * ```tsx
 * <Pagination page={1} count={100} />
 * ```
 *
 * @component
 * @example
 * ```tsx
 * <Pagination page={1} count={50} />
 * ```
 */

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`px-2 rounded-sm ${
                  page === pageIndex ? "bg-lamaSky" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;