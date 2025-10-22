import WeekSelector from "@/components/input/WeekSelector";
import WeekView from "@/components/views/WeekView";
import { get_current_week } from "@myorg/shared/src/util/DateUtils";
import { addMealToDay, fetchWeekData } from "@/api/weeks";
import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
	ActivityIndicator,
	PaperProvider,
	Surface,
	Text,
} from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { IDay } from "@myorg/shared";
import { styles } from "@/styles/styles";

export default function Index() {
	const [selectedWeek, setSelectedWeek] = useState<Date>(get_current_week());
	const [days, setDays] = useState<IDay[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	async function add_meal(date: Date) {
	try {
		setLoading(true);
		setError(null);

		// Call the backend to add the meal
		await addMealToDay(date);

		// Refetch the week so the UI always reloads fresh
		const weekData = await fetchWeekData(selectedWeek);
		setDays(weekData);
	} catch (err: any) {
		setError(err.message || "Failed to add meal");
	} finally {
		setLoading(false);
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
				<Surface style={styles.surface_main} elevation={1}>
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
					{days && <WeekView days={days} add_meal={add_meal} />}
				</Surface>
			</ScrollView>
		</PaperProvider>
	);
}
