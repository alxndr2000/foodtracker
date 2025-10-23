import WeekSelector from "@/components/input/WeekSelector";
import WeekView from "@/components/views/WeekView";
import { getCurrentWeek } from "@myorg/shared/src/util/DateUtils";
import { addMealToDay, fetchDayData, fetchWeekData } from "@/api/weeks";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
	ActivityIndicator,
	PaperProvider,
	Surface,
	Text,
	MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import { IDay } from "@myorg/shared";
import { styles } from "@/styles/styles";

export default function Index() {
	const [selectedWeek, setSelectedWeek] = useState<Date>(getCurrentWeek());
	const [days, setDays] = useState<IDay[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	async function addMeal(date: Date) {
		try {
			setError(null);

			// Call the backend to add the meal
			await addMealToDay(date);

			// Refetch the week so the UI always reloads fresh
			const weekData = await fetchWeekData(selectedWeek);
			setDays(weekData);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || "Failed to add meal");
		}
	}

	async function refreshDay(date: Date) {
		try {
			setError(null);

			const refreshedDay: IDay = await fetchDayData(date);

			setDays((prevDays) => {
				if (!prevDays) return [refreshedDay];

				const dateStr = new Date(refreshedDay.date).toDateString();

				// Check if day already exists
				const dayExists = prevDays.some(
					(d) => new Date(d.date).toDateString() === dateStr
				);

				if (dayExists) {
					console.log("Refreshing existing day in state:", dateStr);
					// Replace that day and force a new array reference
					const newDays = prevDays.map((day) =>
						new Date(day.date).toDateString() === dateStr
							? { ...refreshedDay } // ensure a new object
							: day
					);
					return [...newDays]; // return new array reference
				} else {
					// Add the new day if it's not in the list
					return [...prevDays, refreshedDay];
				}
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setError(err.message || "Failed to refresh day");
		}
	}

	useEffect(() => {
		let cancelled = false;

		async function loadWeek() {
			setLoading(true);
			setError(null);

			try {
				const weekData = await fetchWeekData(selectedWeek);
				if (!cancelled) setDays(weekData);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				if (!cancelled)
					setError(err.message || "Failed to fetch week data");
			} finally {
				if (!cancelled) setLoading(false);
			}
		}

		loadWeek();

		// Cleanup to prevent state updates if component unmounts
		return () => {
			cancelled = true;
		};
	}, [selectedWeek]);

	return (
		<PaperProvider theme={DefaultTheme}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Surface style={styles.surfaceMain} elevation={1}>
					<WeekSelector
						selectedWeek={selectedWeek}
						onChangeWeek={setSelectedWeek}
					/>
					{loading && (
						<ActivityIndicator
							size="large"
							style={{ marginTop: 20 }}
						/>
					)}
					{error && <Text style={{ color: "red" }}>{error}</Text>}
					{days && (
						<WeekView
							days={days}
							addMeal={addMeal}
							refreshDay={refreshDay}
						/>
					)}
				</Surface>
			</ScrollView>
		</PaperProvider>
	);
}
