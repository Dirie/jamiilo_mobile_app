/**
 Login screen
 */

import React from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableHighlight,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const Splash = ({ navigation }) => {
  const galery = {
    backgroundImage: { uri: "https://reactjs.org/logo-og.png" },
    logo: { uri: "https://reactjs.org/logo-og.png" },
  };
  return (
    <>
      <SafeAreaView style={styles.saveAreaView}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.buttons}>
          <View>
            <TouchableHighlight
              style={styles.submit}
              onPress={() => navigation.navigate("Login")}
              underlayColor="#5ad5e8"
            >
              <Text style={styles.submitText}>SignIn</Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight
              style={styles.submit}
              onPress={() => navigation.navigate("Register")}
              underlayColor="#5ad5e8"
            >
              <Text style={styles.submitText}>Sign Up</Text>
            </TouchableHighlight>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  saveAreaView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },

  textStyle: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  logo: {
    width: 400,
    height: 180,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 50,
  },
  logoContainer: {
    height: "60%",
  },
  buttons: {
    color: "black",
    height: "40%",
    paddingTop: 50,
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Platform.OS === "android" ? Colors.navy : "",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Splash;
