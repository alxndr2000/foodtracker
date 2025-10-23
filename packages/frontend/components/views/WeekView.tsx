import DayView from "./DayView";
import { IDay } from "@myorg/shared";
import React from "react";
export default function WeekView({
	days,
	addMeal,
	refreshDay,
}: {
	days: IDay[];
	addMeal: (date: Date) => void;
	refreshDay: (date: Date) => void;
}) {
	return (
		<>
			{days.map((day, index) => (
				<DayView key={index} day={day} refreshDay={refreshDay} addMeal={addMeal} />
			))}
		</>
	);
}
