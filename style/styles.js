"use strict";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E20074",
    alignItems: "center",
    justifyContent: "center",
  },
  containerGrow: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F2F4F9",
  },
  firstScreenCollection: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    top: 140,
  },
  firstScreenBtns: {
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
  },

  secondScreenContainer: {
    flex: 1,
    backgroundColor: "#F2F4F9",
    alignItems: "center",
    justifyContent: "center",
  },

  collections: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    height: "90%",
  },
  input: {
    color: "black",
    backgroundColor: "#F2F4F9",
    borderStyle: "solid",
    borderWidth: 1,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#F2F4F9",
  },
  center: {
    textAlign: "center",
    padding: 10,
  },
  left: {
    textAlign: "left",
    padding: 15,
    width: "95%",
    fontSize: 15,
  },
  heading: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonStyleContainer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginHorizontal: 1,
    marginTop: 5,
  },
  btnStyle: {
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: "#E20074",
  },
  whiteBtnStyle: {
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "#E20074",
    borderWidth: 1,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText1: {
    color: "#E20074",
    fontWeight: "bold",
    textAlign: "center",
  },
  btnText2: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  addedBtn: {
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "#E20074",
    borderWidth: 1,
  },
  headingExistingUser: {
    textAlign: "left",
    padding: 7,
    paddingTop: 15,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  texts: {
    textAlign: "left",
    padding: 7,
    paddingLeft: 10,
    fontSize: 15,
  },
  emptyScreen:{
    textAlign: "center", fontWeight: "bold", fontSize: 18
  },

  emptyContainer: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F2F4F9",
  },
});
