import WeekTable from "@/components/Tables/weektable";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export default function Index() {
	return (
		<PaperProvider theme={DefaultTheme}>
			<View
				style={{
					flex: 1,
					padding: 20,
				}}
			>
				<WeekTable />
			</View>
		</PaperProvider>
	);
}
