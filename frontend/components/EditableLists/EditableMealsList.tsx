import { View } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";

type Meal = {
	mealid: string;
	weekday: number;
	_id: string;
};

type EditableMealsListProps = {
	meals: Meal[];
	onMealChange: (idx: number, value: string) => void;
	onDelete: (mealId: string) => void;
};

export default function EditableMealsList({
	meals,
	onMealChange,
	onDelete,
}: EditableMealsListProps) {
	return (
		<>
			{meals
				.sort((a, b) => a.weekday - b.weekday)
				.map((meal, idx) => (
					<View
						key={meal._id}
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
							onChangeText={(val) => onMealChange(idx, val)}
							style={{ flex: 1, marginLeft: 8 }}
						/>
						<Button
							onPress={() => onDelete(meal._id)}
							style={{ marginLeft: 8 }}
						>
							Delete
						</Button>
					</View>
				))}
		</>
	);
}
