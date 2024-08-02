import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetch } from "../Model/bridge";
import { useNavigation } from "@react-navigation/native";
import config from "../config/config.development";
import Myloader from "../Model/Myloader";
const EmailVerificationScreen = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [getValue, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const goNavigate = useNavigation();
  const [pass1, setPass1] = useState();
  const [pass2, setPass2] = useState();
  const [deviceid, setDeviceID] = useState();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("UID");
      const UUID = await AsyncStorage.getItem("ID");
      if (storedData !== null && UUID !== null) {
        setValue(storedData);
        setDeviceID(UUID);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  function otpcode() {
    const min = 10000;
    const max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleSend = async () => {
    let mycode = otpcode() + "";
    await AsyncStorage.setItem("mcode", mycode);
    if (email == "") {
      alert("Please enter your email address");
      return;
    }
    const data = {
      email: email,
      body: `You verification code: ${mycode}`,
    };
    Fetch(
      config.otp,
      "POST",
      (response) => {
        if (response.loading) {
          setLoading(true);
        }
        if (!response.loading) {
          setLoading(false);
          const res = JSON.parse(response.data);
          if (res.Error) {
            alert(res.msg);

            return;
          }
          alert("Verification code has been sent");
        }
      },
      data
    );
  };

  const handleSubmit = async () => {
    const storedData = await AsyncStorage.getItem("mcode");
    if (
      verificationCode.length == 0 ||
      pass1.length == 0 ||
      pass2.length == 0
    ) {
      alert("All fields are required");
      return;
    }
    if (storedData !== null) {
      if (verificationCode == storedData) {
        if (pass1 != pass2) {
          alert("Password does not match");
          return;
        }
        _email();
      } else {
        alert("Verification code is incorrect");
      }
    }
  };

  const _email = async () => {
    const data = {
      id: getValue,
      email: email,
      pass: pass1,
      deviceid: deviceid,
    };
    Fetch(
      config.addEmail,
      "POST",
      async (result) => {
        if (result.loading) {
          setLoading(true);
        }
        if (!result.loading) {
          setLoading(false);
          const res = JSON.parse(result.data);
          if (res.Error) {
            alert("Please try again");
          } else {
            await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
            alert("Email has been added successfully");
            goNavigate.replace("Dashboard");
          }
        }
      },
      data
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.heading}>Add Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input1}
            placeholder="Verification Code"
            keyboardType="numeric"
            value={verificationCode}
            onChangeText={(text) => setVerificationCode(text)}
          />
          <Text
            style={{ alignSelf: "flex-start", marginTop: 10, marginBottom: 10 }}
          >
            Change Password
          </Text>
          <TextInput
            style={styles.input1}
            placeholder="New Password"
            secureTextEntry={true}
            value={pass1}
            onChangeText={(text) => setPass1(text)}
          />
          <TextInput
            style={styles.input1}
            placeholder="Confirm Password"
            value={pass2}
            secureTextEntry={true}
            onChangeText={(text) => setPass2(text)}
          />
          <TouchableOpacity style={styles.button1} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Myloader visible={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
  },
  input1: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#eaaa00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button1: {
    backgroundColor: "#eaaa00",
    paddingVertical: 12,
    width: "100%",
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EmailVerificationScreen;
