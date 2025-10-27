import { IIngredientType, IMeal, IMealIngredient } from "@myorg/shared";
import {
	SearchableDropdown,
	SearchableDropdownProps,
} from "../dropdowns/SearchableDropdown";
import { View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { useState } from "react";
import { addIngredientToMeal } from "@/api/days";

export default function AddIngredientButton({
	ingredientList,
	date,
	meal,
	refreshDay
}: {
	ingredientList: IIngredientType[];
	date: Date,
	meal: IMeal,
	refreshDay: (date: Date) => void
}) {
	const [activeIngredient, setActiveIngredient] = useState<IIngredientType>();
	const [amountValue, setAmountValue] = useState<string>("");
	function transformDropdownData(): SearchableDropdownProps["data"] {
		const data: SearchableDropdownProps["data"] = [];
		ingredientList.map((value) =>
			data.push({ text: value.name, returnObject: value })
		);
		return data;
	}
	async function addIngredient() {
		if (!activeIngredient || !activeIngredient._id || amountValue == "") {
			console.log("missing data for addIngredient");
			return;
		}
		const newMealIngredient: IMealIngredient = {
			ingredientTypeID: activeIngredient._id,
			quantity: parseInt(amountValue),
		};
		setAmountValue("");
		console.log(newMealIngredient, meal._id, date); //TODO send to server and update ui
		await addIngredientToMeal(date, meal._id, newMealIngredient)
		await refreshDay(date)
	}

	return (
		<View
			style={{
				marginRight: 5,
				zIndex: 999,
				flexDirection: "row",
				padding: 10,
				alignItems: "center",
			}}
		>
			<View style={{ flex: 3 }}>
				<SearchableDropdown
					data={transformDropdownData()}
					submitCallback={setActiveIngredient}
				/>
			</View>
			<TextInput
				keyboardType="numeric"
				value={amountValue}
				onChangeText={(text) => {
					setAmountValue(text.replace(/[^0-9]/g, ""));
				}}
				placeholder="Amount"
				style={{ marginLeft: 10, flex: 1 }}
			/>
			<IconButton icon="plus" onPress={addIngredient} />
		</View>
	);
}
