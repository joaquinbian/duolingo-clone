import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-around", //cuando tenemos flexWrap funciona como justyfyContent para
    //las columns o rows dependiendo del valor de flexDirection
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "stretch", // lo hace ocupar todo el width
  },
});
