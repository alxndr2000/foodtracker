import {
	IconButton,
	Surface,
	Text,
	TextInput as PaperTextInput,
} from "react-native-paper";
import { TextInput } from "react-native";
import { Pressable, View } from "react-native";
import { useState } from "react";

export default function AddIngredientButton() {
	const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
	const [activeIngredient, setActiveIngredient] = useState<string>("");
	const [filterString, setFilterString] = useState<string>("");
	const [searchMode, setSearchMode] = useState<boolean>(true);
	const data = ["eggs", "potatoes", "nathan", "beans", "rice", "pasta"];

	function endInput(newActiveIngredient: string) {
		setActiveIngredient(newActiveIngredient);
		setDropdownVisible(false);
        setSearchMode(false)
	}
	function getFirstDropdownItem() {
		return data.filter((value) =>
			value.toLowerCase().startsWith(filterString.toLowerCase())
		)[0];
	}

	return (
		<View
			style={{
				flexDirection: "row",
				padding: 10,
				alignItems: "center",
			}}
		>
			<View style={{ marginRight: 5, flex: 3, zIndex: 999 }}>
				<Pressable onPress={() => setDropdownVisible(true)}>
					<Surface
						style={{
							height: 55,
							justifyContent: "flex-start",
							alignItems: "center",
							flexDirection: "row",
						}}
					>
						<IconButton
							icon={
								dropdownVisible ? "chevron-up" : "chevron-down"
							}
							onPress={() => {
								setDropdownVisible(!dropdownVisible);
							}}
						/>
						<TextInput
							style={{ padding: 10, height: "100%" }}
                            value={searchMode ? filterString : activeIngredient}
                            placeholder="Search Ingredients..."
							onChangeText={(text) => {
								if (searchMode) {
                                    setDropdownVisible(true)
									setFilterString(text);
								}
							}}
                            onKeyPress={(e) => {
                                const key = e.nativeEvent.key
                                if (key=="Enter" || key=="Tab") {
                                    endInput(getFirstDropdownItem())
                                }
                            }}
                            onFocus={() => {
                                setDropdownVisible(true)
                                setFilterString("")
                                setSearchMode(true)
                            }}
						/>
					</Surface>
				</Pressable>
				{dropdownVisible ? (
					<Surface
						elevation={3}
						style={{
							position: "absolute",
							width: "100%",
							padding: 10,
							backgroundColor: "white",
							zIndex: 999,
							top: "100%",
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						}}
					>
						{data
							.filter((value) =>
								value
									.toLowerCase()
									.startsWith(filterString.toLowerCase())
							)
							.map((value, index) => (
								<TextButton
									key={index}
									onSelect={() => {
										endInput(value)
									}}
									textContent={value}
								/>
							))}
					</Surface>
				) : null}
			</View>
			<PaperTextInput style={{ marginRight: 5, flex: 1 }} />
			<IconButton icon="plus" onPress={() => console.log(activeIngredient)} />
		</View>
	);
}

function TextButton({
	onSelect,
	textContent,
}: {
	onSelect: () => void;
	textContent: string;
}) {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<Pressable
			focusable={true}
			onFocus={() => {
				onSelect();
			}}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			style={{
				backgroundColor: isHovered ? "#d1e0ff" : "#ffffff", // light blue on hover
				padding: 10,
				borderRadius: 6,
				marginVertical: 4,
			}}
		>
			<Text>{textContent}</Text>
		</Pressable>
	);
}
