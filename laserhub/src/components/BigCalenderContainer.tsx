import prisma from "@/lib/prisma";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

/**
 * Asynchronous component that fetches and displays a calendar of lessons.
 *
 * @param {Object} props - The properties object.
 * @param {"teacherId" | "classId"} props.type - The type of identifier to filter lessons by.
 * @param {string | number} props.id - The identifier value to filter lessons by.
 * @returns {JSX.Element} A JSX element containing the calendar.
 *
 * @example
 * <BigCalendarContainer type="teacherId" id="12345" />
 *
 * @remarks
 * This component fetches lesson data from a Prisma database based on the provided type and id.
 * It then maps the lesson data to a format suitable for the BigCalendar component and adjusts
 * the schedule to the current week before rendering.
 */
const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;