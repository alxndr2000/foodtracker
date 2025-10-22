
import { IMeal } from "@myorg/shared";
import { View } from "react-native";
import {
	Button,
	DataTable,
	Divider,
	Text,
} from "react-native-paper";
import React from "react";

export default function MealView({ meal }: { meal: IMeal }) {
	return (
		<>
			<Divider />
			<Text variant="titleSmall">{meal.name}</Text>

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
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						alignItems: "center",
					}}
				>
					<Button mode="outlined" style={{ marginRight: 10 }}>
						Add Ingredient
					</Button>
					<Text>Dropdowns go here</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						padding: 10,
						alignItems: "center",
					}}
				>
					<Button mode="outlined" style={{ marginRight: 10 }}>
						Load from recipe
					</Button>
					<Button mode="outlined" style={{ marginRight: 10 }}>
						Delete
					</Button>
				</View>
			</DataTable>
		</>
	);
}
