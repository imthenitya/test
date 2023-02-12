import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

const DropdownComponent = ({
  setSelected,
  placeholder,
  selected,
  dropdownValues,
}) => {
  const [pickerFocused, setPickerFocused] = useState(false);

  return (
    <Picker
      itemStyle={{ height: 50, width: "100%" }} //Added For iOS
      onFocus={() => setPickerFocused(true)}
      onBlur={() => setPickerFocused(false)}
      selectedValue={selected}
      style={{
        backgroundColor: "#F2F4F9",
        margin: 12,
        borderWidth: 0,
        padding: 0,
      }}
      onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
    >
      <Picker.Item
        style={{ color: "grey" }}
        enabled={!pickerFocused}
        label={placeholder}
        value=""
      />
      {dropdownValues && dropdownValues.length > 0
        ? dropdownValues.map((item, index) => {
            return (
              <Picker.Item
                style={{ color: "black" }}
                key={index}
                label={item}
                value={item}
              />
            );
          })
        : null}
    </Picker>
  );
};
export default DropdownComponent;
