import React from "react";
import prisma from "../lib/prisma";

/**
 * Fetches and displays a list of events for a given date.
 *
 * @param {Object} props - The properties object.
 * @param {string | undefined} props.dateParam - The date parameter in string format. If not provided, the current date will be used.
 * @returns {Promise<JSX.Element[]>} A promise that resolves to an array of JSX elements representing the events.
 *
 * @example
 * ```tsx
 * <EventList dateParam="2024-12-05" />
 * ```
 *
 * @remarks
 * This component fetches events from the Prisma database where the event's start time is within the specified date.
 * The events are displayed in a styled div with alternating top border colors.
 *
 * @throws {Error} If there is an issue with fetching data from the database.
 */

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;