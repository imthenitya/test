import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../style/styles";

const TouchableButton = ({ iconName, text, onPressHandler, isDisable,isLast }) => {
  return (
    <TouchableOpacity
      style={[styles.firstScreenBtns, isLast? {flexDirection: "row",borderBottomWidth:0}:{flexDirection: "row"} ]}
      disabled={isDisable}
      onPress={onPressHandler}
    >
      <Icon style={{ marginRight: 10, fontSize: 18 }} name={iconName}></Icon>
      <Text style={{ fontSize: 15 }}>{text}</Text>
      <Icon
        style={localStyles.forwardIcon}
        name="chevron-forward-outline"
      ></Icon>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  forwardIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    fontSize: 18,
  },
});
export default TouchableButton;
