// calendar.ts
const getLatestMonday = (): Date => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const latestMonday = today;
    latestMonday.setDate(today.getDate() - daysSinceMonday);
    return latestMonday;
  };
  
/**
 * Adjusts the schedule of lessons to the current week based on the latest Monday.
 *
 * @param lessons - An array of lesson objects, each containing a title, start date, and end date.
 * @returns An array of lesson objects with adjusted start and end dates to the current week.
 *
 * The function calculates the latest Monday and adjusts each lesson's start and end dates
 * to the corresponding day of the current week. If the lesson's start date falls on a Sunday,
 * it is considered as the 6th day from Monday.
 *
 * @example
 * ```typescript
 * const lessons = [
 *   { title: "Math", start: new Date("2023-10-02T10:00:00"), end: new Date("2023-10-02T11:00:00") },
 *   { title: "Science", start: new Date("2023-10-03T12:00:00"), end: new Date("2023-10-03T13:00:00") }
 * ];
 * const adjustedLessons = adjustScheduleToCurrentWeek(lessons);
 * console.log(adjustedLessons);
 * ```
 */

  export const adjustScheduleToCurrentWeek = (
    lessons: { title: string; start: Date; end: Date }[]
  ): { title: string; start: Date; end: Date }[] => {
    const latestMonday = getLatestMonday();
  
    return lessons.map((lesson) => {
      const lessonDayOfWeek = lesson.start.getDay();
  
      const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
  
      const adjustedStartDate = new Date(latestMonday);
  
      adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
      adjustedStartDate.setHours(
        lesson.start.getHours(),
        lesson.start.getMinutes(),
        lesson.start.getSeconds()
      );
      const adjustedEndDate = new Date(adjustedStartDate);
      adjustedEndDate.setHours(
        lesson.end.getHours(),
        lesson.end.getMinutes(),
        lesson.end.getSeconds()
      );
  
      return {
        title: lesson.title,
        start: adjustedStartDate,
        end: adjustedEndDate,
      };
    });
  };