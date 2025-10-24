import DayView from "./DayView";
import { IDay, IIngredientType } from "@myorg/shared";
import React from "react";
export default function WeekView({
	days,
	addMeal,
	refreshDay,
	ingredientList
}: {
	days: IDay[];
	addMeal: (date: Date) => void;
	refreshDay: (date: Date) => void;
	ingredientList: IIngredientType[];
}) {
	return (
		<>
			{days.map((day, index) => (
				<DayView key={index} index={index} day={day} refreshDay={refreshDay} addMeal={addMeal} ingredientList={ingredientList} />
			))}
		</>
	);
}
