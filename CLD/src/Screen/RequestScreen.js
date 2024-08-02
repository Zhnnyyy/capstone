import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker from "react-native-ui-datepicker";
import { SelectList } from "react-native-dropdown-select-list";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CustomModal from "../Model/CustomModal";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";
import Myloader from "../Model/Myloader";
export default function RequestScreen() {
  const [startDateModal, setStartDatemodal] = useState(false);
  const [endDateModal, setEndDatemodal] = useState(false);
  const [startDate, setStartDate] = useState("Start Date");
  const [endDate, setEndDate] = useState("End Date");
  const [leave, setLeave] = useState("");
  const [getReason, setReason] = useState("");
  const [getID, setID] = useState();
  const [getData, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const openStartModal = () => {
    setStartDatemodal(true);
  };
  const openEndModal = () => {
    setEndDatemodal(true);
  };
  const closeModal = () => {
    setStartDatemodal(false);
    setEndDatemodal(false);
  };
  const setStartDateText = (date) => {
    setStartDate(date);
  };
  const setEndDateText = (date) => {
    setEndDate(date);
  };
  useEffect(() => {
    loadDropdown();
    loadData();
    return () => {
      setStartDate("Start Date");
      setEndDate("End Date");
      setLeave("");
      setReason("");
    };
  }, []);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("UID");
      if (storedData !== null) {
        setID(storedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadDropdown = () => {
    Fetch(config.loadItem, "GET", (result) => {
      if (!result.loading) {
        const mdata = JSON.parse(result.data);
        setData(mdata);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setStartDate("Start Date");
      setEndDate("End Date");
      setReason("");
      setLeave("");
    }, [])
  );
  currentDate = () => {
    return new Date().toISOString().substr(0, 10);
  };
  const onSubmit = () => {
    if (startDate != "Start Date" && endDate != "End Date") {
      if (leave != "" && leave != null) {
        if (getReason != "" && getReason != null) {
          if (startDate < currentDate() || endDate < currentDate()) {
            Alert.alert("Error", "Date cannot be in the past");
            return;
          }
          sendRequest();
        } else {
          alert("Reason shouldn't be empty");
        }
      } else {
        alert("Please select type of leave");
      }
    } else {
      alert("Please select Date");
    }
  };
  const sendRequest = () => {
    const data = {
      uid: getID,
      startdate: startDate,
      enddate: endDate,
      type: leave,
      reason: getReason,
    };

    Fetch(
      config.sendRequest,
      "POST",
      (result) => {
        if (result.loading) {
          setloading(true);
        }
        if (!result.loading) {
          setloading(false);
          const mdata = JSON.parse(result.data);
          if (mdata.Error == false) {
            alert("Request has been sent to HR");
            setStartDate("Start Date");
            setEndDate("End Date");
            setReason("");
            setLeave("");
          } else {
            setStartDate("Start Date");
            setEndDate("End Date");
            setReason("");
            setLeave("");
            alert(mdata.msg);
          }
        }
      },
      data
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsBox}>
        <View style={styles.datePanel}>
          <TouchableOpacity onPress={openStartModal}>
            <View style={styles.dateBtn}>
              <Text style={styles.dateText}>{startDate}</Text>
              <Image source={require("../icons/arrow-down.png")}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openEndModal}>
            <View style={styles.dateBtn}>
              <Text style={styles.dateText}>{endDate}</Text>
              <Image source={require("../icons/arrow-down.png")}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <SelectList data={getData} setSelected={setLeave} />
        </View>
        <View style={styles.reasonBox}>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Reason..."
            onChangeText={setReason}
            value={getReason}
          />
        </View>
        <TouchableOpacity onPress={onSubmit}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
      <CustomModal
        isVisible={startDateModal}
        target={setStartDateText}
        reqClose={closeModal}
      />
      <CustomModal
        isVisible={endDateModal}
        target={setEndDateText}
        reqClose={closeModal}
      />

      <Myloader visible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  datePanel: {
    width: "100%",
    marginTop: 0,
    marginBottom: 15,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  dateBtn: {
    padding: 16,
    width: "100%",
    marginTop: 10,
    height: 50,
    backgroundColor: "#eaaa00",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  dateText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  inputsBox: {
    marginTop: 10,
    width: "100%",
    padding: 10,
  },
  reasonBox: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
  },
  input: {
    width: "100%",
    fontSize: 16,
    padding: 5,
    height: 100,
    textAlignVertical: "top",
  },
  btn: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaaa00",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
