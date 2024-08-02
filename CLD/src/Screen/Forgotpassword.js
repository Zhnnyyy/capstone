import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";
import Myloader from "../Model/Myloader";
const Forgotpassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (email == "" || email == null) {
      alert("Email cannot be empty");
      return;
    }
    Fetch(
      config.forgotpassword,
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
          setEmail("");
          alert("Email has been sent");
        }
      },
      { email: email }
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          FORGOT PASSWORD
        </Text>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            onChangeText={(txt) => {
              setEmail(txt);
            }}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#eaaa00",
            borderRadius: 8,
            height: 45,
            padding: 10,
            justifyContent: "center",
            marginTop: 20,
            alignItems: "center",
          }}
          onPress={handleSubmit}
        >
          <View>
            <Text>Submit</Text>
          </View>
        </TouchableOpacity>
        <Myloader visible={loading} />
      </View>
    </SafeAreaView>
  );
};

export default Forgotpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputs: {
    width: "100%",
    height: 60,
  },
  input: {
    marginTop: 9,
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    backgroundColor: "#eee",
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
  },
});
