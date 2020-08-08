/**
 Login screen
 */

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
  Platform,
} from "react-native";

import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

import * as actions from "../../store/actions";

const Login = (props) => {
  const [errorState, setErrorState] = useState({
    error: {},
  });
  const { email, password } = props;

  const schema = {
    email: Joi.string().required().email().min(5).max(100),
    password: Joi.string().min(5).max(20).required().label("Password"),
  };
  const validateProperty = ({ field, value }) => {
    const obj = { [field]: value };
    const Schema = { [field]: schema[field] };
    const { error } = Joi.validate(obj, Schema);
    return error ? error.details[0].message : null;
  };

  const handleChange = (field, value) => {
    const input = { field, value };
    const error = { ...errorState.error };
    const errorMessage = validateProperty(input);

    if (errorMessage) error[input.field] = errorMessage;
    else delete error[input.field];
    setErrorState({ error });
    props.formUpdate({ prop: field, value });
  };

  const validate = () => {
    const data = {
      email,
      password,
    };
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const submitHandler = async (e) => {
    props.login({
      email,
      password,
    });
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <Image
              source={require("../../assets/img/logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.emailView}>
            <View>
              <Input
                placeholder="Email Address"
                keyboardType={"email-address"}
                value={props.email}
                onChangeText={(value) => handleChange("email", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="ios-mail"
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.email}
              />
            </View>
            <View>
              <Input
                placeholder="Password"
                value={props.password}
                onChangeText={(value) => handleChange("password", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name="ios-lock"
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.password}
                secureTextEntry={true}
              />
            </View>

            <View>
              <Button
                disabled={validate() === null ? false : true}
                icon={
                  <Ionicons
                    style={{ color: "white", marginRight: 10 }}
                    name={
                      Platform.OS === "android" ? "md-log-in" : "ios-log-in"
                    }
                    size={24}
                    color="black"
                  />
                }
                title="Login"
                onPress={submitHandler}
              />
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
    backgroundColor: "#743A3A",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  const { email, password } = state.auth;

  return {
    email,
    password,
  };
};

export default connect(mapStateToProps, actions)(Login);
