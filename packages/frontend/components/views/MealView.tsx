import { IIngredientType, IMeal } from "@myorg/shared";
import { View } from "react-native";
import { Button, DataTable, Divider, Text } from "react-native-paper";
import React from "react";
import { deleteMeal } from "@/api/days";
import AddIngredientButton from "../buttons/AddIngredientButton";

export default function MealView({
	meal,
	date,
	refreshDay,
	ingredientList,
}: {
	meal: IMeal;
	date: Date;
	refreshDay: (date: Date) => void;
	ingredientList: IIngredientType[];
}) {
	
	return (
		<>
			<Divider style={{marginVertical: 10}} />
			<Text variant="titleLarge">{meal.name}</Text>

			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Ingredient</DataTable.Title>
					<DataTable.Title numeric>Quantity</DataTable.Title>
				</DataTable.Header>
				{meal.ingredients.map((ingredient, index) => (
					<DataTable.Row key={index}>
						<DataTable.Cell>{ingredient.name}</DataTable.Cell>
						<DataTable.Cell numeric>
							{ingredient.quantity} {ingredient.unit}
						</DataTable.Cell>
					</DataTable.Row>
				))}
				
					<AddIngredientButton ingredientList={ingredientList} />
					
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						alignItems: "center",
						zIndex: -1
					}}
				>
					<Button mode="outlined" style={{ marginRight: 10 }}>
						Load from recipe
					</Button>

					<Button
						mode="outlined"
						onPress={async () => {
							try {
								await deleteMeal(date, meal._id);
								await refreshDay(date);
							} catch (err) {
								console.error("Error deleting meal:", err);
							}
						}}
						style={{ marginRight: 10 }}
					>
						Delete
					</Button>
				</View>
			</DataTable>
		</>
	);
}
