import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	button: {
		marginHorizontal: 10,
	},
	button_newday: {
		marginVertical: 5,
	},
	container: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column",
	},
	scrollContent: {
		flexGrow: 1, // allows content to expand if smaller than screen
		alignItems: "center", // center horizontally
        alignContent: "center",
		paddingVertical: 20, // optional spacing
		paddingHorizontal: 10,
         // limit max width for better readability on large screens
	},
	surface_main: {
		minWidth: 520,
        maxWidth: 600,
		padding: 20,
        alignSelf: "center",
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
