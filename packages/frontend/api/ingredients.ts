import { IIngredientType } from "@myorg/shared";

const API_BASE_URL = "http://localhost:3000/v1/ingredient";

export async function fetchAllIngredients(): Promise<IIngredientType[]> {
	const res = await fetch(`${API_BASE_URL}/`);

	if (!res.ok) {
		throw new Error(
			`Failed to fetch ingredients: ${res.status} ${res.statusText}`
		);
	}
	const data = await res.json();
	const ingredientList: IIngredientType[] = [];
	data.map(
		(
			ingredient: IIngredientType // remapping for safety. I'm unsure if this is even required
		) =>
			ingredientList.push({
				_id: ingredient._id,
				name: ingredient.name,
				unit: ingredient.unit,
			} as IIngredientType)
	);

	return ingredientList;
}

export async function createIngredient(
	newIngredient: IIngredientType
): Promise<IIngredientType> {
	// Convert the date into an ISO string without the time part
	const res = await fetch(`${API_BASE_URL}/new/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newIngredient),
	});
	if (!res.ok) {
		throw new Error(
			`Failed to create ingredient: ${res.status} ${res.statusText}`
		);
	}
	const returnedIngredient: IIngredientType = await res.json();
	return returnedIngredient;
}
