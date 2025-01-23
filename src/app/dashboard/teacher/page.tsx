import Announcements from "../../../components/Announcements";
import BigCalendarContainer from "../../../components/BigCalenderContainer";
import { auth } from "@clerk/nextjs/server";
import React from "react";

/**
 * TeacherPage component renders the dashboard for a teacher.
 * 
 * This component fetches the authenticated user's ID and displays a schedule
 * and announcements section. The layout is responsive, adjusting between
 * a single column on smaller screens and a two-column layout on larger screens.
 * 
 * @returns {JSX.Element} The rendered TeacherPage component.
 */

const TeacherPage = () => {
  const { userId } = auth();
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;