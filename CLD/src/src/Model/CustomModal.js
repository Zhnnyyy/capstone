import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { React, useState } from "react";

import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
export default function CustomModal({ isVisible, target, reqClose }) {
  const [date, setDate] = useState(dayjs());
  return (
    <Modal
      style={styles.container}
      visible={isVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.calendarBox}>
        <DateTimePicker
          mode="single"
          date={date}
          onChange={(params) => {
            target(dayjs(params.date).format("YYYY-MM-DD"));
            setDate(params.date);
          }}
        />
        <Button title="Close" onPress={reqClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
  },
  calendarBox: {
    marginTop: 140,
    backgroundColor: "#fff",
    width: "100%",
    elevation: 10,
    padding: 10,
  },
});
