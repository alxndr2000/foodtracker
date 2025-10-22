/** Returns a new Date with hours, minutes, seconds, and ms set to 0 */
export function normalizeDate(date: Date): Date {
	const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	return d;
}

/** Gets the Monday of the current week, normalized to midnight */
export function getCurrentWeek(): Date {
	const currentDate = normalizeDate(new Date());
	const first = currentDate.getDate() - currentDate.getDay() + 1; // Monday
	const monday = new Date(currentDate);
	monday.setDate(first);
	return normalizeDate(monday);
}

export function normalizeToUTC(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

/** Gets the Sunday of the given week, normalized to midnight */
export function getWeekLastDay(startDate: Date): Date {
	const cloned = normalizeDate(startDate);
	cloned.setDate(startDate.getDate() + 6);
	return normalizeDate(cloned);
}

/** Formats a week range like "21 Oct – 27 Oct 2025" or "29 Dec 2025 – 4 Jan 2026" */
export function formatWeekRange(startDate: Date): string {
	const start = normalizeDate(startDate);
	const end = getWeekLastDay(start);

	const sameMonth = start.getMonth() === end.getMonth();
	const sameYear = start.getFullYear() === end.getFullYear();

	// Build locale options
	const shortDayMonth: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
	};
	const fullDayMonthYear: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};

	// Format date strings based on whether month/year are shared
	const startStr = sameMonth
		? start.toLocaleDateString(undefined, { day: "numeric" })
		: start.toLocaleDateString(undefined, shortDayMonth);

	const endStr = sameYear
		? end.toLocaleDateString(undefined, fullDayMonthYear)
		: end.toLocaleDateString(undefined, fullDayMonthYear);

	return sameMonth
		? `${startStr}–${endStr}` // 21–27 Oct 2025
		: `${startStr} – ${endStr}`; // 29 Dec 2025 – 4 Jan 2026
}

export function formatLocalDate(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function getWeekDays(startDate: Date): Date[] {
	const start = normalizeDate(startDate);
	const days: Date[] = [];

	for (let i = 0; i < 7; i++) {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		days.push(normalizeDate(d));
		
	}
	return days;
}