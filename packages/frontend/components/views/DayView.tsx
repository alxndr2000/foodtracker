import { styles } from "@/styles/styles";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { IDay } from "@myorg/shared";
import MealView from "./MealView";
import React from "react";

export default function DayView({ day, addMeal }: { day: IDay, addMeal: (date: Date) => void }) {
	console.log("Rendering DayView for date:", typeof day.date);
	const dayWord = day.date.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric' });	
	return (
		<>
			<View>
				<Surface style={styles.surfaceInternal} elevation={2}>
					<Text variant="headlineMedium">{dayWord}{}</Text>
					{/* hacky mess */}
					{day.meals.map((meal, index) => (
						<MealView key={index} meal={meal}/>
					))}
					<Button mode="outlined" onPress={() => (addMeal(day.date))} style={{ marginTop: 10 }}>
						Add Meal
					</Button>
				</Surface>
			</View>
		</>
	);
}
