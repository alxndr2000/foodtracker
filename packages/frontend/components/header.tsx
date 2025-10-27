import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function FoodAppHeader() {
	const router = useRouter();
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Button onPress={() => router.navigate("/")}>Meals</Button>
			<Button onPress={() => router.navigate("/ingredientCreator")}>
				Ingredients
			</Button>
			<Button onPress={() => router.navigate("/purchases")}>
				Purchases
			</Button>
		</View>
	);
}
