import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
    marginVertical: 5,
  },
  sentenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentence: {
    alignSelf: "center",
    marginBottom: 50,
    marginLeft: 6,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 3,
    padding: 7,
  },
  mascot: {
    width: "30%",
    aspectRatio: 3 / 4, //si especificamos el width y ponemos el aspectRatio,
    //el height se calcula automaticamente y viceversa
  },
  input: {
    flex: 1,
    backgroundColor: "#ebebeb",
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 8,
    color: "black",
    padding: 10,
    fontSize: 16,
    // fontSize: 30,
  },
});
