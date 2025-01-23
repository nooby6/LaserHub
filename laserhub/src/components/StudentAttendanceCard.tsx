import prisma from "../lib/prisma";
import React from "react";

/**
 * Component to display the attendance percentage of a student.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.id - The ID of the student whose attendance is to be displayed.
 * 
 * @returns {JSX.Element} A JSX element displaying the attendance percentage.
 * 
 * @async
 * @function StudentAttendanceCard
 * 
 * @description
 * This component fetches the attendance records of a student from the database using Prisma.
 * It calculates the total number of days and the number of days the student was present.
 * The attendance percentage is then displayed in a styled card.
 * 
 * @example
 * ```tsx
 * <StudentAttendanceCard id="student123" />
 * ```
 */

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: new Date(new Date().getFullYear(), 0, 1),
      },
    },
  });

  const totalDays = attendance.length;
  const presentDays = attendance.filter((day: { present: boolean }) => day.present).length;
  const percentage = (presentDays / totalDays) * 100;
  return (
    <div className="">
      <h1 className="text-xl font-semibold">{percentage || "-"}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;