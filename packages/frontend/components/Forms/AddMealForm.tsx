import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

type AddMealFormProps = {
	newMealId: string;
	newMealWeekday: string;
	setNewMealId: (id: string) => void;
	setNewMealWeekday: (day: string) => void;
	onAdd: () => void;
};

export default function AddMealForm({
	newMealId,
	newMealWeekday,
	setNewMealId,
	setNewMealWeekday,
	onAdd,
}: AddMealFormProps) {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginBottom: 8,
			}}
		>
			<Button mode="contained" onPress={onAdd}>
				New Meal
			</Button>
			<TextInput
				label="Meal ID"
				value={newMealId}
				keyboardType="numeric"
				onChangeText={setNewMealId}
				style={{ flex: 1, margin: 8 }}
			/>
			<TextInput
				label="Weekday"
				value={newMealWeekday}
				keyboardType="numeric"
				onChangeText={setNewMealWeekday}
				style={{ flex: 1, margin: 8 }}
			/>
		</View>
	);
}
