import WeekTable from "@/components/tables/weektable";
import { Text, View } from "react-native";
import { PaperProvider, Provider } from "react-native-paper";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export default function Index() {
	return (
		<PaperProvider theme={DefaultTheme}>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text>Dummy Main Page</Text>
				<WeekTable />
			</View>
		</PaperProvider>
	);
}
