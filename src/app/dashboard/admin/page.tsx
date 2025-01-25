import Announcements from "../../../components/Announcements";
import AttendanceChartContainer from "../../../components/Attendance ChartContainer";
import CountChartContainer from "../../../components/CountChartContainer";
import EventCalendarContainer from "../../../components/EventCalenderContainer";
import FinanceChart from "../../../components/FinanceChart";
import UserCard from "../../../components/UserCard";
import React from "react";

// AdminPage component
/**
 * AdminPage component renders the admin dashboard page.
 * 
 * @param {Object} props - The component props.
 * @param {Object} props.searchParams - The search parameters passed to the component.
 * @param {Object.<string, string | undefined>} props.searchParams - An object containing key-value pairs of search parameters.
 * 
 * @returns {JSX.Element} The rendered admin dashboard page.
 * 
 * The layout consists of two main sections:
 * - Left Section: Contains user cards, charts, and finance chart.
 * - Right Section: Contains event calendar and announcements.
 * 
 * The layout is responsive and adjusts between column and row layouts based on screen size.
 */

const AdminPage = ({
    searchParams,
}: {
    searchParams: { [keys: string]: string | undefined };
}) => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT SECTION */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* USER CARDS */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="admin" />
                    <UserCard type="teacher" />
                    <UserCard type="student" />
                    <UserCard type="parent" />
                </div>
                {/* MIDDLE CHARTS */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* COUNT CHART */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChartContainer />
                    </div>
                    {/* ATTENDANCE CHART */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChartContainer />
                    </div>
                </div>
                {/* BOTTOM CHART */}
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>
            {/* RIGHT SECTION */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                {/* EVENT CALENDAR */}
                <EventCalendarContainer searchParams={searchParams}/>
                {/* ANNOUNCEMENTS */}
                <Announcements />
            </div>
        </div>
    );
};

export default AdminPage;
