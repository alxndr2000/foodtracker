import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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