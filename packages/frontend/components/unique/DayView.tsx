import { styles } from "@/styles/styles";
import { View } from "react-native";
import { DataTable, List, Surface, Text } from "react-native-paper";
import { IDay } from "@myorg/shared";

export default function DayView({day}: {day: IDay}) {
    const day_word = day.date.toLocaleDateString("en-GB", { weekday: 'long' });
	return (
		<>
			<View>
				<Surface style={styles.surface_internal} elevation={2}>
					<Text variant="headlineMedium">{day_word}</Text>
					{/* hacky mess */}
					{day.meals.map((meal, index) =>
					<List.Accordion
						title="Meal 1"
						style={{ backgroundColor: "transparent" }}
					>
						<DataTable>
							<DataTable.Header>
								<DataTable.Title>Ingredient</DataTable.Title>
								<DataTable.Title numeric>
									Quantity
								</DataTable.Title>
							</DataTable.Header>
							{meal.ingredients.map((ingredient, index) => (
								<DataTable.Row key={index}>
									<DataTable.Cell>
										{ingredient.name}
									</DataTable.Cell>
									<DataTable.Cell numeric>
										{ingredient.quantity} {ingredient.unit}
									</DataTable.Cell>
								</DataTable.Row>
							))}
						</DataTable>
					</List.Accordion>
					)}
				</Surface>
			</View>
		</>
	);
}
