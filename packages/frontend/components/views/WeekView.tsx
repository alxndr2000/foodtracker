import { Types } from "mongoose";
import DayView from "./DayView";
import { IDay, IMeal, IMealIngredient } from "@myorg/shared";
import { Button } from "react-native-paper";
import { fetchWeekData } from "@/api/weeks";
import { styles } from "@/styles/styles";
export default function WeekView({ days, add_meal }: { days: (IDay)[], add_meal: (date: Date) => void }) {

	return (
		<>
			{days.map(
				(day) => (
					<DayView day={day} add_meal={add_meal} />
				)
			)}
		</>
	);
}