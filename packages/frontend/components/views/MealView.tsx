import { IIngredientType, IMeal, IMealIngredient } from "@myorg/shared";
import { View } from "react-native";
import { Button, DataTable, Divider, IconButton } from "react-native-paper";
import React, { useState } from "react";
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
	const [locked, setLocked] = useState<boolean>(true);

	function findNameFromIngredientList(
		ingredientTypeID: IMealIngredient["ingredientTypeID"]
	) {
		const ingredient = ingredientList.find(
			(ingredient) => ingredient._id == ingredientTypeID
		);
		return ingredient?.name;
	}
	function findUnitFromIngredientList(
		ingredientTypeID: IMealIngredient["ingredientTypeID"]
	) {
		const ingredient = ingredientList.find(
			(ingredient) => ingredient._id == ingredientTypeID
		);
		return ingredient?.unit;
	}
	return (
		<>
			<Divider style={{ marginVertical: 10 }} />
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Ingredient</DataTable.Title>
					<DataTable.Title numeric>Quantity</DataTable.Title>
					
				</DataTable.Header>
				{meal.ingredients.map((ingredient, index) => (
					<DataTable.Row key={index}>
						<DataTable.Cell>
							{findNameFromIngredientList(
								ingredient.ingredientTypeID
							)}
						</DataTable.Cell>
						<DataTable.Cell numeric>
							{ingredient.quantity}{" "}
							{findUnitFromIngredientList(
								ingredient.ingredientTypeID
							)}
						</DataTable.Cell>
					</DataTable.Row>
				))}
				<IconButton icon={locked ? "lock" : "lock-open"} onPress={() => (setLocked(!locked))}/>
				{locked ? null : (
					<>
						<AddIngredientButton
							meal={meal}
							date={date}
							ingredientList={ingredientList}
							refreshDay={refreshDay}
						/>
						<View
							style={{
								flexDirection: "row",
								padding: 10,
								alignItems: "center",
								zIndex: -1,
							}}
						>
							<Button
								mode="outlined"
								onPress={async () => {
									try {
										await deleteMeal(date, meal._id);
										await refreshDay(date);
									} catch (err) {
										console.error(
											"Error deleting meal:",
											err
										);
									}
								}}
								style={{ marginRight: 10 }}
							>
								Delete Meal
							</Button>
						</View>{" "}
					</>
				)}
			</DataTable>
		</>
	);
}
