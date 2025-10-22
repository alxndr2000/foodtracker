import { styles } from "@/styles/styles";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { IDay } from "@myorg/shared";
import MealView from "./MealView";

export default function DayView({ day, add_meal }: { day: IDay, add_meal: (date: Date) => void }) {
	console.log("Rendering DayView for date:", typeof day.date);
	const day_word = day.date.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric' });	
	return (
		<>
			<View>
				<Surface style={styles.surface_internal} elevation={2}>
					<Text variant="headlineMedium">{day_word}{}</Text>
					{/* hacky mess */}
					{day.meals.map((meal) => (
						<MealView meal={meal}/>
					))}
					<Button mode="outlined" onPress={() => (add_meal(day.date))} style={{ marginTop: 10 }}>
						Add Meal
					</Button>
				</Surface>
			</View>
		</>
	);
}
