"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import React from "react";

const localizer = momentLocalizer(moment);

/**
 * BigCalendar component renders a calendar with specified events and allows view customization.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.data - An array of event objects.
 * @param {string} props.data[].title - The title of the event.
 * @param {Date} props.data[].start - The start date and time of the event.
 * @param {Date} props.data[].end - The end date and time of the event.
 *
 * @returns {JSX.Element} The rendered BigCalendar component.
 *
 * @example
 * const events = [
 *   { title: "Meeting", start: new Date(2025, 1, 1, 10, 0, 0), end: new Date(2025, 1, 1, 11, 0, 0) },
 *   { title: "Lunch", start: new Date(2025, 1, 1, 12, 0, 0), end: new Date(2025, 1, 1, 13, 0, 0) }
 * ];
 * 
 * <BigCalendar data={events} />
 */
const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;