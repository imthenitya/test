import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Button from "./Button";
import globalStyles from "../../style/styles";
const DeleteOffer = ({
  onPressHandlerEvent,
  close,
  msgArr,
  btnTexts,
  isLoading,
  heading,
}) => {
  return (
    <TouchableOpacity style={styles.modalOverlay}>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {msgArr.map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={
                      heading && index == 0
                        ? styles.modalHeading
                        : styles.modalText
                    }
                  >
                    {item}
                  </Text>
                );
              })}
              <View style={styles.buttonStyleContainer}>
                <Button
                  isDisabled={isLoading}
                  btnStyle={globalStyles.btnStyle}
                  onPressHandler={onPressHandlerEvent}
                  textStyle={globalStyles.btnText2}
                  buttonText={btnTexts[0]}
                />
                <Button
                  isDisabled={isLoading}
                  btnStyle={globalStyles.btnStyle}
                  onPressHandler={() => close(false)}
                  textStyle={globalStyles.btnText2}
                  buttonText={btnTexts[1]}
                />
              </View>
            </View>
          </View>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          ) : null}
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalHeading: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    textAlign:'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 19,
    marginBottom: 15,
    textAlign:'justify'
  },
  buttonStyleContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginHorizontal: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
});

export default DeleteOffer;
