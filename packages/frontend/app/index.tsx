import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
	PaperProvider,
	Text,
	Surface,
	Divider,
	Button,
	DataTable,
	List,
} from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

/** Returns a new Date with hours, minutes, seconds, and ms set to 0 */
function normalize_date(date: Date): Date {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

/** Gets the Monday of the current week, normalized to midnight */
function get_current_week(): Date {
	const currentDate = normalize_date(new Date());
	const first = currentDate.getDate() - currentDate.getDay() + 1; // Monday
	const monday = new Date(currentDate);
	monday.setDate(first);
	return normalize_date(monday);
}

/** Gets the Sunday of the given week, normalized to midnight */
function get_week_last_day(startDate: Date): Date {
	const cloned = normalize_date(startDate);
	cloned.setDate(startDate.getDate() + 6);
	return normalize_date(cloned);
}

/** Formats a week range like "21 Oct – 27 Oct 2025" or "29 Dec 2025 – 4 Jan 2026" */
function format_week_range(startDate: Date): string {
	const start = normalize_date(startDate);
	const end = get_week_last_day(start);

	const sameMonth = start.getMonth() === end.getMonth();
	const sameYear = start.getFullYear() === end.getFullYear();

	// Build locale options
	const shortDayMonth: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
	};
	const fullDayMonthYear: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	// Format date strings based on whether month/year are shared
	const startStr = sameMonth
		? start.toLocaleDateString(undefined, { day: "numeric" })
		: start.toLocaleDateString(undefined, shortDayMonth);

	const endStr = sameYear
		? end.toLocaleDateString(undefined, fullDayMonthYear)
		: end.toLocaleDateString(undefined, fullDayMonthYear);

	return sameMonth
		? `${startStr}–${endStr}` // 21–27 Oct 2025
		: `${startStr} – ${endStr}`; // 29 Dec 2025 – 4 Jan 2026
}

export default function Index() {
	const [selectedWeek, setSelectedWeek] = useState<Date>(get_current_week());
	const dummyMealIngredients = [
		{ name: "Chicken Breast", quantity: 200, unit: "g" },
		{ name: "Rice", quantity: 150, unit: "g" },
		{ name: "Broccoli", quantity: 100, unit: "g" },
	];
	return (
		<PaperProvider theme={DefaultTheme}>
			<View style={styles.container}>
				<Surface style={styles.surface_main} elevation={1}>
					<View style={styles.weekHeader}>
						<Button
							style={styles.button}
							mode="contained"
							onPress={() =>
								setSelectedWeek((prev) => {
									const newWeek = new Date(prev);
									newWeek.setDate(prev.getDate() - 7);
									return normalize_date(newWeek);
								})
							}
						>
							←
						</Button>

						<Text variant="headlineLarge">
							{format_week_range(selectedWeek)}
						</Text>

						<Button
							style={styles.button}
							mode="contained"
							onPress={() =>
								setSelectedWeek((prev) => {
									const newWeek = new Date(prev);
									newWeek.setDate(prev.getDate() + 7);
									return normalize_date(newWeek);
								})
							}
						>
							→
						</Button>
					</View>

					{[
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
					].map((day) => (
						<View key={day}>
							
							<Surface
								style={styles.surface_internal}
								elevation={2}
							>
								<Text variant="headlineMedium">{day}</Text>
								{/* hacky mess */}
								<List.Accordion title="Meal 1" style={{backgroundColor: 'transparent'}}>
								<DataTable>
									<DataTable.Header>
										<DataTable.Title>
											Ingredient
										</DataTable.Title>
										<DataTable.Title numeric>
											Quantity
										</DataTable.Title>
									</DataTable.Header>
									{dummyMealIngredients.map(
										(ingredient, index) => (
											<DataTable.Row key={index}>
												<DataTable.Cell>
													{ingredient.name}
												</DataTable.Cell>
												<DataTable.Cell numeric>
													{ingredient.quantity}{" "}
													{ingredient.unit}
												</DataTable.Cell>
											</DataTable.Row>
										)
									)}
								</DataTable>
								</List.Accordion>
							</Surface>
						</View>
					))}
				</Surface>
			</View>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	button: {
		marginHorizontal: 10,
	},
	container: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
	},
	surface_main: {
		minWidth: 520,
		flex: 1,
		padding: 20,
		margin: 20,
		flexDirection: "column",
		borderRadius: 12,
	},
	surface_internal: {
		flex: 1,
		padding: 20,
		marginVertical: 5,
		flexDirection: "column",
		borderRadius: 12,
	},
	weekHeader: {
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 10,
		justifyContent: "space-between",
	},
});
