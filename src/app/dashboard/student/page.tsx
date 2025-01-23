import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

/**
 * Asynchronous React component representing the student dashboard page.
 * 
 * This component fetches the class information for the authenticated user
 * and displays the schedule and other relevant information.
 * 
 * @async
 * @function StudentPage
 * @returns {JSX.Element} The rendered student dashboard page.
 * 
 * @remarks
 * - Utilizes the `auth` function to retrieve the authenticated user's ID.
 * - Fetches the class information from the Prisma database where the user is a student.
 * - Displays the schedule using the `BigCalendarContainer` component.
 * - Includes additional components for events and announcements.
 * 
 * @example
 * ```tsx
 * import StudentPage from './path/to/StudentPage';
 * 
 * const App = () => (
 *   <div>
 *     <StudentPage />
 *   </div>
 * );
 * 
 * export default App;
 * ```
 */

const StudentPage = async () => {
  const { userId } = auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  });

  console.log(classItem);
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;