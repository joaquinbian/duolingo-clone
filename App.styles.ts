import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
    alignSelf: "stretch", // lo hace ocupar todo el width
  },
  optionsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionContainer: {
    height: "48%",
    width: "48%",
    backgroundColor: "rgb(153, 235, 242)",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 5,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
