import { Button, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { format_week_range, normalize_date } from "@/util/DateUtils";

export default function WeekSelector({
	selectedWeek,
	onChangeWeek,
}: {
	selectedWeek: Date;
	onChangeWeek: (date: Date) => void;
}) {
	return (
		<View style={styles.weekHeader}>
			<Button
				style={styles.button}
				mode="contained"
				onPress={() => {
					const newWeek = new Date(selectedWeek);
					newWeek.setDate(selectedWeek.getDate() - 7);
					onChangeWeek(normalize_date(newWeek));
				}}
			>
				←
			</Button>

			<Text variant="headlineLarge">
				{format_week_range(selectedWeek)}
			</Text>

			<Button
				style={styles.button}
				mode="contained"
				onPress={() => {
					const newWeek = new Date(selectedWeek);
					newWeek.setDate(selectedWeek.getDate() + 7);
					onChangeWeek(normalize_date(newWeek));
				}}
			>
				→
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		marginHorizontal: 10,
	},
	container: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
	},
	surface_main: {
		minWidth: 520,
		flex: 1,
		padding: 20,
		margin: 20,
		flexDirection: "column",
		borderRadius: 12,
	},
	surface_internal: {
		flex: 1,
		padding: 20,
		marginVertical: 5,
		flexDirection: "column",
		borderRadius: 12,
	},
	weekHeader: {
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 10,
		justifyContent: "space-between",
	},
});
