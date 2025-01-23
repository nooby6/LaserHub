import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "../lib/prisma";
import React from "react";

// Define the AttendanceChartContainer component as an async function
const AttendanceChartContainer = async () => {
    // Get the current date
    const today = new Date();
    // Get the current day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayOfWeek = today.getDay();
    // Calculate the number of days since the last Monday
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Create a new date object for the last Monday
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);

    // Fetch attendance data from the database for the current week
    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday,
            },
        },
        select: {
            date: true,
            present: true,
        },
    });

    // Define the days of the week
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    // Initialize an attendance map to store present and absent counts for each day
    const attendanceMap: { [key: string]: { present: number; absent: number } } =
        {
            Mon: { present: 0, absent: 0 },
            Tue: { present: 0, absent: 0 },
            Wed: { present: 0, absent: 0 },
            Thu: { present: 0, absent: 0 },
            Fri: { present: 0, absent: 0 },
        };

    // Iterate over the fetched attendance data
    resData.forEach((item) => {
        const itemDate = new Date(item.date);
        const dayOfWeek = itemDate.getDay();
        
        // Check if the day is a weekday (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            const dayName = daysOfWeek[dayOfWeek - 1];

            // Update the attendance map based on whether the student was present or absent
            if (item.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent += 1;
            }
        }
    });

    // Create a data array for the chart component
    const data = daysOfWeek.map((day) => ({
        name: day,
        present: attendanceMap[day].present,
        absent: attendanceMap[day].absent,
    }));

    // Return the JSX for the AttendanceChartContainer component
    return (
        <div className="bg-white rounded-lg p-4 h-full">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} />
            </div>
            <AttendanceChart data={data}/>
        </div>
    );
};

// Export the AttendanceChartContainer component as the default export
export default AttendanceChartContainer;