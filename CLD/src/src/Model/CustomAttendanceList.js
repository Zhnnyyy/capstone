import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CustomAttendanceList({ timeIn, timeOut, date }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#9098B1" }}>{date}</Text>
      <View style={styles.timeBox}>
        <Text style={styles.dateHeader}>Time In</Text>
        <Text style={styles.dateValue}>{timeIn}</Text>
      </View>
      <View style={styles.timeBox}>
        <Text style={styles.dateHeader}>Time Out</Text>
        <Text style={styles.dateValue}>{timeOut}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  timeBox: {
    width: "100%",
    backgroundColor: "#eaaa00",
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateHeader: {
    fontWeight: "bold",
    fontSize: 15,
  },
  dateValue: {
    fontSize: 15,
  },
});
