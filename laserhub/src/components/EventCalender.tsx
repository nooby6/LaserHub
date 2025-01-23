"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

/**
 * EventCalendar component renders a calendar and updates the URL query parameter
 * with the selected date.
 *
 * @component
 * @example
 * return (
 *   <EventCalendar />
 * )
 *
 * @returns {JSX.Element} The rendered calendar component.
 *
 * @remarks
 * This component uses the `useState` hook to manage the selected date and the `useEffect` hook
 * to update the URL query parameter whenever the selected date changes.
 *
 * @hook
 * - `useState` to manage the selected date state.
 * - `useEffect` to perform side effects when the selected date changes.
 * - `useRouter` to manipulate the router and update the URL.
 *
 * @dependencies
 * - `Calendar` component to render the calendar UI.
 * - `useRouter` from `next/router` to handle routing.
 *
 * @see https://reactjs.org/docs/hooks-state.html
 * @see https://reactjs.org/docs/hooks-effect.html
 * @see https://nextjs.org/docs/api-reference/next/router
 */

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;