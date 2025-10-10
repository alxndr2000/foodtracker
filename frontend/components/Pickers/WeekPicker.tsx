import { Picker } from "@react-native-picker/picker";

	type WeekPickerProps = {
		weeks: any[];
		selectedWeekId: string;
		onChange: (id: string) => void;
	};

	export default function WeekPicker({ weeks, selectedWeekId, onChange }: WeekPickerProps) {
		return (
			<Picker
				selectedValue={selectedWeekId}
				onValueChange={onChange}
				style={{ height: 50, width: 250 }}
			>
				<Picker.Item label="Select..." value="" />
				{weeks.map((week) => (
					<Picker.Item
						key={week._id}
						label={week.dateRange}
						value={week._id}
					/>
				))}
			</Picker>
		);
	}