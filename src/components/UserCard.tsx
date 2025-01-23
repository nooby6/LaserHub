import prisma from "../src/lib/prisma";
import Image from "next/image";
import React from "react";

/**
 * UserCard component that displays the count of users based on the type provided.
 * 
 * @param {Object} props - The properties object.
 * @param {"admin" | "teacher" | "student" | "parent"} props.type - The type of user to count.
 * 
 * @returns {JSX.Element} A JSX element representing a user card.
 * 
 * @example
 * ```tsx
 * <UserCard type="admin" />
 * ```
 * 
 * @remarks
 * This component fetches the count of users from the database using Prisma based on the user type.
 * It displays the count along with a label indicating the user type.
 * The card has a dynamic background color based on its position (odd/even).
 * 
 * @async
 * @function
 */

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;