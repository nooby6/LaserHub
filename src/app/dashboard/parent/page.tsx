import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";


/**
 * ParentPage component fetches and displays the schedule for students associated with the current parent user.
 * 
 * This component performs the following tasks:
 * 1. Authenticates the current user and retrieves their user ID.
 * 2. Fetches the list of students associated with the current parent user from the database.
 * 3. Renders a schedule for each student using the `BigCalendarContainer` component.
 * 4. Displays announcements in a separate section.
 * 
 * @async
 * @function ParentPage
 * @returns {JSX.Element} The rendered component displaying the students' schedules and announcements.
 * 
 * @remarks
 * - The component uses Tailwind CSS for styling.
 * - The `auth` function is assumed to handle user authentication and provide the user ID.
 * - The `prisma.student.findMany` method is used to fetch students from the database.
 * - The `BigCalendarContainer` component is used to display the schedule for each student.
 * - The `Announcements` component is used to display announcements.
 */


const ParentPage = async () => {
  const { userId } = auth();
  const currentUserId = userId;
  
  const students: { id: string; name: string; surname: string; classId: string }[] = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="">
        {students.map((student) => (
          <div className="w-full xl:w-2/3" key={student.id}>
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;