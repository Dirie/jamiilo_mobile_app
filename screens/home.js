import React, { useState } from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
} from "react-native";

import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";

export default Home = (props) => {
  const { navigation } = props;

  //   const products = useSelector((state) => state.products.availableProducts);
  //   const dispatch = useDispatch();

  const selectHandler = (id, title) => {
    props.navigation.navigate("UserProfileView", {
      productId: id,
      productTitle: title,
    });
    // props.navigation.setOptions({ title: "Product Detail" });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.submit}>
                <Button title="show" onPress={() => {}} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  body: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  textStyle: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
  },
  logo: {
    width: 110,
    height: 150,
  },
  emailView: {
    padding: 20,
    marginTop: 60,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 20,
  },
  input: {
    backgroundColor: "white",
    margin: 10,
    paddingLeft: 20,
    fontSize: 15,
    color: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
});
