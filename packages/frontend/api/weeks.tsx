const API_BASE_URL = "http://localhost:3000/v1/day";
import { IDay } from "@myorg/shared";
import { get_week_days, formatLocalDate } from "@myorg/shared/src/util/DateUtils";

export async function addMealToDay(date: Date): Promise<IDay> {
	// Convert the date into an ISO string without the time part
	const dateStr = date.toISOString().split("T")[0]; // e.g. "2025-10-22"
		const res = await fetch(`${API_BASE_URL}/date/${dateStr}/newmeal`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!res.ok) {
		throw new Error(
			`Failed to add meal to day: ${res.status} ${res.statusText}`
		);
	}
	const mealData: IDay = await res.json();
	return mealData;
}

export async function fetchWeekData(startDate: Date): Promise<IDay[]> {
	const days = get_week_days(startDate);
	const results = await Promise.all(days.map(fetchDayData));
	return results;
}

export async function fetchDayData(date: Date): Promise<IDay> { // I AM GOING TO KILL ANYBODY INVOLVED IN DATE STANDARDS
	// Convert the date into an ISO string without the time part
	
	const dateStr = formatLocalDate(date); // e.g. "2025-10-22"

	const res = await fetch(`${API_BASE_URL}/date/${dateStr}`);

	if (!res.ok) {
		throw new Error(`Failed to fetch day: ${res.status} ${res.statusText}`);
	}
	var data = await res.json();
	var dayData: IDay = {} as IDay;
	dayData.date = new Date(dateStr);
	dayData.meals = [];

	if (!data.empty) {
		dayData.date = new Date(data.date as string);
		dayData.meals = data.meals;
	}

	return dayData;
}
