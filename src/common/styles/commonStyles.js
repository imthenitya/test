"use strict";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 45,
    paddingTop: 20,
    paddingBottom: 25,
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
  modalHeading: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 17,
    marginBottom: 15,
    textAlign: "center",
    marginBottom: 35,
  },
  btnStyle: {
    padding: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: "#E20074",
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
