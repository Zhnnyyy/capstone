import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function RequestHistoryList({ status, type, date }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>
          Status: <Text style={styles.subtxt}>{status}</Text>
        </Text>
        <Text style={styles.headertxt}>
          Date: <Text style={styles.subtxt}>{date}</Text>
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.headertxt}>
          Type: <Text style={styles.subtxt}>{type}</Text>
        </Text>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#eaaa00",
    borderRadius: 5,
    marginBottom: 10,
  },
  headertxt: {
    fontWeight: "bold",
  },
  subtxt: {
    fontWeight: "400",
  },
  header: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  content: {
    marginLeft: 10,
    marginTop: 10,
  },
});
