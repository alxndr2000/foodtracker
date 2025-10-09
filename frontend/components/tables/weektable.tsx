import * as React from "react";
import { Text, Button, TextInput } from "react-native-paper";
// Import View and ScrollView components from react-native for layout and scrolling
import { View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchWeeks, fetchWeek, updateWeek } from "../../api/weeks";

// Define the Meal type for clarity
type Meal = {
	mealid: number;
	weekday: number;
};

// Main component for displaying and editing a week's meals
export default function WeekTable() {
	// State to hold all available weeks
	const [weeks, setWeeks] = React.useState<any[]>([]);
	// State to hold the currently selected week's ID
	const [selectedWeekId, setSelectedWeekId] = React.useState<string>("");
	// State to hold the currently selected week's data
	const [selectedWeek, setSelectedWeek] = React.useState<any>(null);
	// State to hold editable meals for the selected week
	const [editMeals, setEditMeals] = React.useState<Meal[]>([]);

	// Fetch all weeks when the component mounts
	React.useEffect(() => {
		fetchWeeks().then(setWeeks).catch(console.error);
	}, []);

	// Fetch the selected week's data whenever the selectedWeekId changes
	React.useEffect(() => {
		if (selectedWeekId) {
			fetchWeek(selectedWeekId)
				.then((data) => {
					setSelectedWeek(data); // Set the selected week's data
					// Initialize editable meals from fetched data
					setEditMeals(data.meals.map((m: Meal) => ({ ...m })));
				})
				.catch(console.error);
		}
	}, [selectedWeekId]);

	// Handle changes to a meal's ID in the editable meals array
	const handleMealChange = (idx: number, value: string) => {
		const updated = [...editMeals];
		updated[idx].mealid = parseInt(value, 10); // Update mealid with new value
		setEditMeals(updated); // Update state
	};

	// Handle updating the week with edited meals
	const handleUpdate = () => {
		updateWeek(selectedWeekId, { ...selectedWeek, meals: editMeals })
			.then((data) => {
				setSelectedWeek(data); // Update selected week with response
				// Refresh editable meals from updated data
				setEditMeals(data.meals.map((m: Meal) => ({ ...m })));
			})
			.catch(console.error);
	};

	// Render the component UI
	return (
		<ScrollView>
			{/* Picker for selecting a week */}
			<Picker
				selectedValue={selectedWeekId}
				onValueChange={(itemValue) => setSelectedWeekId(itemValue)}
				style={{ height: 50, width: 250 }}
			>
				<Picker.Item label="Select..." value="" />
				{weeks.map((week) => (
					<Picker.Item
						key={week._id}
						label={week.dateRange}
						value={week._id}
					/>
				))}
			</Picker>

			{/* Display selected week's details and editable meals */}
			{selectedWeek && (
				<View>
					{/* Show the date range for the selected week */}
					<Text>{selectedWeek.dateRange}</Text>
					{/* Render editable fields for each meal */}
					{editMeals.map((meal, idx) => (
						<View
							key={idx}
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginBottom: 8,
							}}
						>
							<Text>Weekday {meal.weekday}: </Text>
							<TextInput
								value={meal.mealid.toString()}
								keyboardType="numeric"
								onChangeText={(val) =>
									handleMealChange(idx, val)
								}
								style={{ width: 60, marginLeft: 8 }}
							/>
						</View>
					))}
					{/* Button to update the week with edited meals */}
					<Button mode="contained" onPress={handleUpdate}>
						Update Week
					</Button>
				</View>
			)}
		</ScrollView>
	);
}
