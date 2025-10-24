import React, { useState } from "react";
import { View, Pressable, TextInput, Text } from "react-native";
import {
	Surface,
	IconButton,
} from "react-native-paper";

interface IDropdownData {
    text: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    returnObject: any // allowed to be any because it will be returned 
}
export interface SearchableDropdownProps {
	data: IDropdownData[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	submitCallback: (returnedValue: any) => void; // any disabled here because of above reason
}

export function SearchableDropdown({
	data,
	submitCallback,
}: SearchableDropdownProps) {

	const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
	const [activeValue, setactiveValue] = useState<IDropdownData>({text: "", returnObject: null});
	const [filterString, setFilterString] = useState<string>("");
	const [searchMode, setSearchMode] = useState<boolean>(true);

	function endInput(returnedData: IDropdownData) {
		setactiveValue(returnedData);
		setDropdownVisible(false);
		setSearchMode(false);
		submitCallback(returnedData.returnObject)
	}
	function getFirstDropdownItem() {
		return data.filter((value) =>
			value.text.toLowerCase().startsWith(filterString.toLowerCase())
		)[0];
	}

	return (
		<View>
		
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
						icon={dropdownVisible ? "chevron-up" : "chevron-down"}
						onPress={() => {
							setDropdownVisible(!dropdownVisible);
						}}
					/>
					<TextInput
						style={{ padding: 10, height: "100%" }}
						value={searchMode ? filterString : activeValue.text}
						placeholder="Search Ingredients..."
						onChangeText={(text) => {
							if (searchMode) {
								setDropdownVisible(true);
								setFilterString(text);
							}
						}}
						onKeyPress={(e) => {
							const key = e.nativeEvent.key;
							if (key == "Enter" || key == "Tab") {
								endInput(getFirstDropdownItem());
							}
						}}
						onFocus={() => {
							setDropdownVisible(true);
							setFilterString("");
							setSearchMode(true);
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
							value.text
								.toLowerCase()
								.startsWith(filterString.toLowerCase())
						)
						.map((value, index) => (
							<TextButton
								key={index}
								onSelect={() => {
									endInput(value);
								}}
								textContent={value.text}
							/>
						))}
				</Surface>
			) : null}
		</View>
		)
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