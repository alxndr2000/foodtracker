import { styles } from "@/styles/styles";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import { IDay } from "@myorg/shared";
import MealView from "./MealView";
import React, { useState } from "react";
import { getOrdinalSuffix } from "@myorg/shared/src/util/DateUtils";

export default function DayView({
	day,
	addMeal,
	refreshDay,
}: {
	day: IDay;
	addMeal: (date: Date) => void;
	refreshDay: (date: Date) => void;
}) {
	const [visible, setVisible] = useState<boolean>(false);
	const dayWord = `${day.date.toLocaleDateString("en-GB", {
		weekday: "long",
	})} ${day.date.getDate()}${getOrdinalSuffix(day.date.getDate())}`;
	return (
		<>
			<View>
				<Surface style={styles.surfaceInternal} elevation={2}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text variant="headlineMedium">{dayWord}</Text>
						<Button 
							style={{width: 86}}
							mode="outlined"
							onPress={() => setVisible(!visible)}
						>
							{visible ? "Hide" : "Show"}
						</Button>
					</View>
					{visible
						? day.meals.map((meal, index) => (
								<MealView
									key={index}
									meal={meal}
									refreshDay={refreshDay}
									date={day.date}
								/>
						  ))
						: null}
					<Button
						mode="outlined"
						onPress={() => addMeal(day.date)}
						style={{ marginTop: 10 }}
					>
						Add Meal
					</Button>
				</Surface>
			</View>
		</>
	);
}
