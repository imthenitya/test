import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../style/styles";

const Button = ({
  btnStyle,
  isDisabled,
  onPressHandler,
  buttonText,
  textStyle,
  iconName,
}) => {
  return (
    <View style={styles.buttonStyleContainer}>
      <TouchableOpacity
        style={btnStyle}
        disabled={isDisabled}
        onPress={onPressHandler}
      >
        <Text style={textStyle}>
          {buttonText}{" "}
          {iconName ? (
            <Icon style={{ fontSize: 15 }} name="checkmark-outline"></Icon>
          ) : (
            ""
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Button;
