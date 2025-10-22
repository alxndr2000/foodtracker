/** Returns a new Date with hours, minutes, seconds, and ms set to 0 */
export function normalize_date(date: Date): Date {
	const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	return d;
}

/** Gets the Monday of the current week, normalized to midnight */
export function get_current_week(): Date {
	const currentDate = normalize_date(new Date());
	const first = currentDate.getDate() - currentDate.getDay() + 1; // Monday
	const monday = new Date(currentDate);
	monday.setDate(first);
	return normalize_date(monday);
}

export function normalizeToUTC(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

/** Gets the Sunday of the given week, normalized to midnight */
export function get_week_last_day(startDate: Date): Date {
	const cloned = normalize_date(startDate);
	cloned.setDate(startDate.getDate() + 6);
	return normalize_date(cloned);
}

/** Formats a week range like "21 Oct – 27 Oct 2025" or "29 Dec 2025 – 4 Jan 2026" */
export function format_week_range(startDate: Date): string {
	const start = normalize_date(startDate);
	const end = get_week_last_day(start);

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

export function get_week_days(startDate: Date): Date[] {
	const start = normalize_date(startDate);
	const days: Date[] = [];

	for (let i = 0; i < 7; i++) {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		days.push(normalize_date(d));
		
	}
	return days;
}