import FoodAppHeader from "@/components/header";
import { styles } from "@/styles/styles";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
	PaperProvider,
	MD3DarkTheme,
	MD3LightTheme,
	IconButton,
} from "react-native-paper";

export default function RootLayout() {
	const [darkMode, setDarkMode] = useState<boolean>(true)
	return (
		<>
			<PaperProvider theme={darkMode ? MD3DarkTheme : MD3LightTheme}>
				<View
					style={{
						backgroundColor: (darkMode ? MD3DarkTheme : MD3LightTheme).colors.background,
						height: "100%",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-evenly",
						}}
					>
						<FoodAppHeader />
						<IconButton icon={darkMode ? "weather-sunny" : "weather-night"} onPress={() => setDarkMode(!darkMode)} />
					</View>
					<ScrollView contentContainerStyle={styles.scrollContent}>
						<Stack
							screenOptions={{
								headerShown: false,
							}}
						></Stack>
					</ScrollView>
				</View>
			</PaperProvider>
		</>
	);
}
