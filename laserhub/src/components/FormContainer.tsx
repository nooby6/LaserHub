import prisma from "../lib/prisma";
import FormModal from "./FormModal";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

/**
 * FormContainer component fetches related data based on the provided table and type,
 * and renders a FormModal component with the fetched data.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.table - The name of the table to fetch related data for.
 * @param {string} props.type - The type of operation (e.g., "create", "update", "delete").
 * @param {Object} props.data - The data to be passed to the FormModal component.
 * @param {string} props.id - The ID of the item being operated on.
 * @returns {JSX.Element} The rendered FormModal component wrapped in a div.
 *
 * @async
 * @function
 *
 * @example
 * <FormContainer table="student" type="create" data={studentData} id="123" />
 *
 * @remarks
 * This component uses Prisma to fetch related data for different tables such as "subject",
 * "class", "teacher", "student", and "exam". The fetched data is then passed to the FormModal
 * component as a prop.
 *
 * The `auth` function is used to get the current user's ID and session claims, which are used
 * to filter data based on the user's role.
 *
 * The `relatedData` object is populated with the fetched data based on the table and type.
 * If the type is "delete", no related data is fetched.
 */


const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  if (type !== "delete") {
    switch (table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: subjectTeachers };
        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "teacher":
        const teacherSubjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        const studentGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        });
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;