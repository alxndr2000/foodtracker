const API_BASE_URL = "http://localhost:3000/v0/weeks";

export async function fetchWeeks() {
	const res = await fetch(API_BASE_URL);
	if (!res.ok) throw new Error("Failed to fetch weeks");
	return res.json();
}

export async function fetchWeek(id: string) {
	const res = await fetch(`${API_BASE_URL}/${id}`);
	if (!res.ok) throw new Error("Failed to fetch week");
	return res.json();
}

export async function updateWeek(id: string, week: any) {
	const res = await fetch(`${API_BASE_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(week),
	});
	if (!res.ok) throw new Error("Failed to update week");
	return res.json();
}

export async function addMealToWeek(id: string, mealid: string, weekday: number) {
	const res = await fetch(`${API_BASE_URL}/${id}/meals`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ mealid, weekday }),
	});
	if (!res.ok) throw new Error("Failed to update week");
	return res.json();
}

export async function deleteMeal(weekId: string, mealId: string) {
  const res = await fetch(`${API_BASE_URL}/${weekId}/meals/${mealId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete meal');
  return res.json();
}