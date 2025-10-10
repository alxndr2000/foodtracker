import * as React from "react";
import { Text } from "react-native-paper";
import { View, ScrollView } from "react-native";
import {
	fetchWeeks,
	fetchWeek,
	updateWeek,
	addMealToWeek,
	deleteMeal,
} from "../../api/weeks";
import debounce from "lodash.debounce";
import WeekPicker from "../Pickers/WeekPicker";
import AddMealForm from "../Forms/AddMealForm";
import EditableMealsList from "../EditableLists/EditableMealsList";

// Define the Meal type for clarity
type Meal = {
	mealid: string;
	weekday: number;
	_id: string;
};

// Main component for displaying and editing a week's meals
export default function WeekMenu() {
	// State: all available weeks
	const [weeks, setWeeks] = React.useState<any[]>([]);
	// State: selected week's ID
	const [selectedWeekId, setSelectedWeekId] = React.useState<string>("");
	// State: selected week's data
	const [selectedWeek, setSelectedWeek] = React.useState<any>(null);
	// State: editable meals for the selected week
	const [editMeals, setEditMeals] = React.useState<Meal[]>([]);
	// State: new meal input fields
	const [newMealId, setNewMealId] = React.useState<string>("");
	const [newMealWeekday, setNewMealWeekday] = React.useState<string>("");

	// Fetch all weeks on mount
	React.useEffect(() => {
		fetchWeeks().then(setWeeks).catch(console.error);
	}, []);

	// Fetch selected week's data when selectedWeekId changes
	React.useEffect(() => {
		setSelectedWeek(null);
		setEditMeals([]);
		if (selectedWeekId) {
			fetchWeek(selectedWeekId)
				.then((data) => {
					setSelectedWeek(data);
					setEditMeals(data.meals.map((m: Meal) => ({ ...m })));
				})
				.catch(console.error);
		}
	}, [selectedWeekId]);

	// Update mealid for a meal in editMeals
	const handleMealChange = (idx: number, value: string) => {
		const updated = [...editMeals];
		updated[idx].mealid = value;
		setEditMeals(updated);
	};

	// Debounced update for meals
	const debouncedUpdate = React.useMemo(
		() =>
			debounce((meals: Meal[]) => {
				if (selectedWeekId && selectedWeek) {
					updateWeek(selectedWeekId, { ...selectedWeek, meals })
						.then((data) => {
							setSelectedWeek(data);
							setEditMeals(
								data.meals.map((m: Meal) => ({ ...m }))
							);
						})
						.catch(console.error);
				}
			}, 500),
		[selectedWeekId, selectedWeek]
	);

	// Trigger debounced update when editMeals changes
	React.useEffect(() => {
		if (selectedWeek) {
			debouncedUpdate(editMeals);
		}
		return () => {
			debouncedUpdate.cancel();
		};
	}, [editMeals, debouncedUpdate, selectedWeek]);

	// Add a new meal to the week
	const handleNewMeal = () => {
		addMealToWeek(selectedWeekId, newMealId, parseInt(newMealWeekday))
			.then((data) => {
				setSelectedWeek(data);
				setEditMeals(data.meals.map((m: Meal) => ({ ...m })));
				setNewMealId("");
				setNewMealWeekday("");
			})
			.catch(console.error);
	};

	const handleDeleteMeal = async (mealId: string) => {
		if (!selectedWeekId) return;
		await deleteMeal(selectedWeekId, mealId);
		setEditMeals(editMeals.filter((m) => m._id !== mealId));
	};

	// Render UI
	return (
		<ScrollView>
			<WeekPicker
				weeks={weeks}
				selectedWeekId={selectedWeekId}
				onChange={setSelectedWeekId}
			/>

			{selectedWeek && (
				<View>
					<Text>{selectedWeek.dateRange}</Text>
					<AddMealForm
						newMealId={newMealId}
						newMealWeekday={newMealWeekday}
						setNewMealId={setNewMealId}
						setNewMealWeekday={setNewMealWeekday}
						onAdd={handleNewMeal}
					/>
					<EditableMealsList
						meals={editMeals}
						onMealChange={handleMealChange}
						onDelete={handleDeleteMeal}
					/>
				</View>
			)}
		</ScrollView>
	);
}
