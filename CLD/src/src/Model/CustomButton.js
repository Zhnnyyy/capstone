import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ isPressed }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor={"#ccc"}
      onPress={isPressed}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>Login</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
    justifyContent: "center",
    backgroundColor: "#eaaa00",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
  },
});
