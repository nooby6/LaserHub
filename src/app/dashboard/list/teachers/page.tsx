import FormContainer from "../../../components/FormContainer";
import Pagination from "../../../components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import prisma from "../../../lib/prisma";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ITEM_PER_PAGE } from "../../../lib/constants";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

/**
 * TeacherListPage component renders a list of teachers with pagination, search, and filter functionalities.
 * It also provides actions for viewing and deleting teachers if the user has admin privileges.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.searchParams - The search parameters from the URL.
 * @param {Object.<string, string | undefined>} props.searchParams - The search parameters object.
 * 
 * @returns {JSX.Element} The rendered TeacherListPage component.
 * 
 * @async
 * 
 * @example
 * ```tsx
 * <TeacherListPage searchParams={{ page: "1", search: "John" }} />
 * ```
 * 
 * @remarks
 * This component fetches the teacher data from the Prisma database based on the search parameters.
 * It includes columns for teacher information, subjects, classes, phone, and address.
 * Admin users have additional actions for managing teachers.
 * 
 * @component
 * 
 * @requires auth - A function to get the session claims for the current user.
 * @requires prisma - The Prisma client for database operations.
 * @requires ITEM_PER_PAGE - A constant defining the number of items per page.
 * @requires Table - A component to render the table.
 * @requires TableSearch - A component to render the search input.
 * @requires Pagination - A component to render the pagination controls.
 * @requires FormContainer - A component to render forms for creating or deleting teachers.
 * @requires Image - A component to render images.
 * @requires Link - A component to render links.
 * 
 * @param {Object} sessionClaims - The session claims of the current user.
 * @param {string} sessionClaims.metadata.role - The role of the current user.
 * 
 * @param {Object[]} columns - The columns configuration for the table.
 * @param {string} columns[].header - The header text for the column.
 * @param {string} columns[].accessor - The accessor key for the column data.
 * @param {string} [columns[].className] - Optional class name for the column.
 * 
 * @param {Function} renderRow - A function to render a table row for a teacher.
 * @param {Object} item - The teacher data.
 * @param {string} item.id - The unique identifier for the teacher.
 * @param {string} item.img - The URL of the teacher's image.
 * @param {string} item.name - The name of the teacher.
 * @param {string} item.email - The email of the teacher.
 * @param {string} item.username - The username of the teacher.
 * @param {Object[]} item.subjects - The subjects taught by the teacher.
 * @param {string} item.subjects[].name - The name of the subject.
 * @param {Object[]} item.classes - The classes taught by the teacher.
 * @param {string} item.classes[].name - The name of the class.
 * @param {string} item.phone - The phone number of the teacher.
 * @param {string} item.address - The address of the teacher.
 * 
 * @param {Object} query - The query object for filtering teachers.
 * @param {Object} query.lessons - The lessons filter.
 * @param {number} query.lessons.classId - The class ID for filtering lessons.
 * @param {Object} query.name - The name filter.
 * @param {string} query.name.contains - The search string for the teacher's name.
 * @param {string} query.name.mode - The search mode (insensitive).
 * 
 * @param {Object[]} data - The fetched teacher data.
 * @param {number} count - The total count of teachers matching the query.
 * 
 * @param {number} p - The current page number.
 */


const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(",")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <FormContainer table="teacher" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.TeacherWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lessons = {
              some: {
                classId: parseInt(value),
              },
            };
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.teacher.findMany({
      where: query,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.teacher.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;