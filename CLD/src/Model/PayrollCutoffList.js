import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import React from "react";

const PayrollCutoffList = ({ cutoff, date, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.btn}
      onPress={onPress}
      underlayColor={"#fff"}
    >
      <View style={styles.container}>
        <Text style={styles.txt}>{cutoff}</Text>
        <Text style={styles.txt}>{date}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default PayrollCutoffList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 50,
    borderRadius: 7,
    backgroundColor: "#eaaa00",

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  txt: {
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#fff",
    borderRadius: 7,
  },
});
