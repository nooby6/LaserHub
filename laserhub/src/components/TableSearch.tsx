"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * TableSearch component renders a search form that allows users to input a search query.
 * On form submission, it updates the URL with the search query as a parameter and navigates to the new URL.
 *
 * @component
 * @example
 * return (
 *   <TableSearch />
 * )
 *
 * @returns {JSX.Element} The rendered search form component.
 *
 * @remarks
 * This component uses Next.js's `useRouter` hook to handle navigation.
 * The search input value is retrieved from the form event and used to update the URL search parameters.
 *
 * @function handleSubmit
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 * @returns {void}
 *
 * @remarks
 * The `handleSubmit` function prevents the default form submission behavior,
 * retrieves the search input value, updates the URL search parameters, and navigates to the new URL.
 *
 * @function
 * @name TableSearch
 */

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;