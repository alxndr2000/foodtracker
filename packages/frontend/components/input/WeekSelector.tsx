import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import { formatWeekRange, normalizeDate } from "@myorg/shared/src/util/DateUtils";
import React from "react";
import { styles } from "@/styles/styles";

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
					onChangeWeek(normalizeDate(newWeek));
				}}
			>
				←
			</Button>

			<Text variant="headlineLarge">
				{formatWeekRange(selectedWeek)}
			</Text>

			<Button
				style={styles.button}
				mode="contained"
				onPress={() => {
					const newWeek = new Date(selectedWeek);
					newWeek.setDate(selectedWeek.getDate() + 7);
					onChangeWeek(normalizeDate(newWeek));
				}}
			>
				→
			</Button>
		</View>
	);
}