import { createIngredient, fetchAllIngredients } from "@/api/ingredients";
import { styles } from "@/styles/styles";
import { IIngredientType } from "@myorg/shared";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
	PaperProvider,
	DefaultTheme,
	Surface,
	DataTable,
	TextInput,
	IconButton,
} from "react-native-paper";

export default function IngredientCreator() {
	const [newIngredientName, setNewIngredientName] = useState<string>("");
	const [newIngredientUnit, setNewIngredientUnit] = useState<string>("");
	const [ingredientList, setIngredientList] = useState<IIngredientType[]>([]);
	
	function addIngredient() {
		
		const newIngredient: IIngredientType = {
			name: newIngredientName,
			unit: newIngredientUnit,
		};
		createIngredient(newIngredient)
		setNewIngredientName("");
		setNewIngredientUnit("");
		setIngredientList((prev) => [...prev, newIngredient]);
	}
	

	useEffect(() => {
		async function loadIngredients() {
			try {
				const ingredients = await fetchAllIngredients();
				setIngredientList(ingredients);
			} catch (err) {
				console.error("Failed to load ingredients:", err);
			}
		}
		loadIngredients();
	}, []);

	return (
		<PaperProvider theme={DefaultTheme}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Surface style={styles.surfaceMain} elevation={1}>
					<View style={{ flexDirection: "row" }}>
						<TextInput
							style={{ flex: 3, marginRight: 5 }}
							placeholder="Ingredient Name"
							value={newIngredientName}
							onChangeText={(text) => setNewIngredientName(text)}
						/>
						<TextInput
							style={{ flex: 1 }}
							placeholder="Unit"
							value={newIngredientUnit}
							onChangeText={(text) => setNewIngredientUnit(text)}
						/>
						<IconButton icon="plus" onPress={addIngredient} />
					</View>
					<DataTable.Header>
						<DataTable.Title>Name</DataTable.Title>
						<DataTable.Title>Unit</DataTable.Title>
					</DataTable.Header>
					{ingredientList.map((ingredient, index) => (
						<DataTable.Row key={index}>
							<DataTable.Cell>{ingredient.name}</DataTable.Cell>
							<DataTable.Cell>{ingredient.unit}</DataTable.Cell>
						</DataTable.Row>
					))}
				</Surface>
			</ScrollView>
		</PaperProvider>
	);
}
