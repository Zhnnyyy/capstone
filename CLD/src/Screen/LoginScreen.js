import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomTextInput from "../Model/CustomTextInput";
import CustomButton from "../Model/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";
import Myloader from "../Model/Myloader";
import * as Application from "expo-application";
const LoginScreen = () => {
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [installationID, setInstallationID] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const goNavigate = useNavigation();

  useEffect(() => {
    const fetchInstallationId = async () => {
      try {
        const id = await Application.getAndroidId;
        setInstallationID(id);
      } catch (error) {
        console.error("Error fetching installation ID:", error);
      }
    };

    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem("isLoggedIn");
        setisLoggedIn(data);
      } catch (error) {
        console.error("Error fetching Login details:", error);
      }
    };
    loadData();
    fetchInstallationId();
  }, []);
  console.log(isLoggedIn);
  if (isLoggedIn == "true") {
    goNavigate.replace("Dashboard");
  }
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("UID", getUsername);
      await AsyncStorage.setItem("ID", installationID);
      setUsername("");
      setPassword("");
      CheckUserEmail();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const CheckUserEmail = async () => {
    const data = {
      id: getUsername,
    };
    Fetch(
      config.checkUserEmail,
      "POST",
      async (result) => {
        if (!result.loading) {
          const res = JSON.parse(result.data);
          if (res.Error) {
            alert("Please try again...");
            return;
          }
          if (!res.Error) {
            if (res.haveEmail) {
              await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
              goNavigate.replace("Dashboard");
            } else {
              goNavigate.replace("OTP");
            }
          }
        }
      },
      data
    );
  };

  const LoginPressed = () => {
    const data = {
      username: getUsername,
      password: getPassword,
    };
    if (getUsername == "" || getPassword == "") {
      alert("Please fill all the fields");
      return;
    }
    Fetch(
      config.login,
      "POST",
      (result) => {
        if (result.loading) {
          setLoading(true);
        }

        if (!result.loading) {
          setLoading(false);
          const data = JSON.parse(result.data);
          if (data.Error) {
            alert(data.msg);
            return;
          }
          saveData();
        }
      },
      data
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require("../img/logo.png")} style={styles.img} />
      <Text style={styles.text}>Login to continue</Text>
      <View style={{ width: "90%" }}>
        <CustomTextInput
          placeholder={"Username"}
          icon={require("../icons/username.png")}
          onchangetxt={setUsername}
        />
      </View>
      <View style={{ width: "90%" }}>
        <CustomTextInput
          placeholder={"Password"}
          passwordChar={true}
          icon={require("../icons/password.png")}
          onchangetxt={setPassword}
        />
      </View>
      <View style={{ width: "90%", marginTop: 30 }}>
        <CustomButton isPressed={LoginPressed} />
      </View>

      <View style={styles.forgotContainer}>
        <TouchableOpacity
          onPress={() => {
            goNavigate.navigate("forgot");
          }}
        >
          <Text style={styles.forgotTxt}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Myloader visible={loading} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  img: {
    width: "60%",
    height: 230,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#BABFCE",
    fontWeight: "bold",
    marginBottom: 10,
  },
  forgotTxt: {
    color: "#eaaa00",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  forgotContainer: {
    marginRight: 25,
    alignSelf: "flex-end",
  },
});
