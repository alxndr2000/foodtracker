import { Types } from "mongoose";
import DayView from "./DayView";
import { IDay, IMeal, IMealIngredient } from "@myorg/shared";
export default function WeekView() {
	const dummyMealIngredient: IMealIngredient = {
		name: "Chicken Breast",
		unit: "grams",
		quantity: 200,
	};
    const dummyMeal: IMeal = {
		name: "Sample Meal",
		ingredients: [dummyMealIngredient],
	}
	
	const dummyDay: IDay = {
        date: new Date(),
        meals: [dummyMeal],
    };

	return (
		<>
			{[dummyDay].map(
				(day) => (
					<DayView day={day} />
				)
			)}
		</>
	);
}
