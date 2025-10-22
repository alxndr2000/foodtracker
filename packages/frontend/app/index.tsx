import WeekSelector from "@/components/input/WeekSelector";
import WeekView from "@/components/unique/WeekView";
import { get_current_week } from "@/util/DateUtils";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
	PaperProvider,
	Text,
	Surface,
	Divider,
	Button,
	DataTable,
	List,
} from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export default function Index() {
	const [selectedWeek, setSelectedWeek] = useState<Date>(get_current_week());
	return (
		<PaperProvider theme={DefaultTheme}>
			<View style={styles.container}>
				<Surface style={styles.surface_main} elevation={1}>
					<WeekSelector
						selectedWeek={selectedWeek}
						onChangeWeek={setSelectedWeek}
					/>
					<WeekView />
					
				</Surface>
			</View>
		</PaperProvider>
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
