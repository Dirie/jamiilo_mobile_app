/**
 Login screen
 */

import React, { useState } from "react";
import Joi from "joi-browser";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
} from "react-native";

import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

const Register = (props) => {
  const [errorState, setErrorState] = useState({
    error: {},
  });
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    confirmPassword,
    userPhoto,
    userType,
  } = props;

  const schema = {
    firstName: Joi.string().required().min(4).max(100).label("First Name"),
    lastName: Joi.string().required().min(2).max(100).label("Last Name"),
    phone: Joi.string().required().min(8).max(100).label("Phone"),
    email: Joi.string().required().email().min(5).max(100).label("Email"),
    password: Joi.string().min(5).max(20).required().label("Password"),
    confirmPassword: Joi.string()
      .min(5)
      .max(20)
      .required()
      .label("Confirm password"),
  };
  // validation property validates the input during onChange event.
  const validateProperty = ({ field, value }) => {
    const obj = { [field]: value };
    const Schema = { [field]: schema[field] };
    const { error } = Joi.validate(obj, Schema);
    return error ? error.details[0].message : null;
  };

  const validate_password = ({ value }) => {
    let error = "";
    if (value !== password) {
      error = "password must match";
      return error;
    }
    return null;
  };

  const handleChange = (field, value) => {
    const input = { field, value };
    const error = { ...errorState.error };
    const errorMessage = validateProperty(input);

    if (errorMessage) error[input.field] = errorMessage;
    else if (input.field === "confirmPassword") {
      error[input.field] = validate_password(input);
    } else delete error[input.field];
    setErrorState({ error });
    props.formUpdate({ prop: field, value });
  };

  const validate = () => {
    const data = {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
    };
    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });

    if (password !== confirmPassword) {
      const err = "password must match!";
      return err;
    }

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const submitHandler = async (e) => {
    props.register({
      firstName,
      lastName,
      phone,
      email,
      password,
      userPhoto,
      userType,
    });
    props.navigation.navigate("Login");
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.fields}>
            <View style={styles.names}>
              <View style={styles.inputName}>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={props.firstName}
                  onChangeText={(value) => handleChange("firstName", value)}
                  leftIcon={
                    <Ionicons
                      style={{ marginRight: 10 }}
                      name={
                        Platform.OS === "android" ? "md-person" : "ios-person"
                      }
                      size={24}
                      color="black"
                    />
                  }
                  errorStyle={{ color: "red" }}
                  errorMessage={errorState.error && errorState.error.firstName}
                />
              </View>

              <View style={styles.inputName}>
                <Input
                  placeholder="Last Name"
                  value={props.lastName}
                  onChangeText={(value) => handleChange("lastName", value)}
                  leftIcon={
                    <Ionicons
                      style={{ marginRight: 10 }}
                      name={
                        Platform.OS === "android" ? "md-person" : "ios-person"
                      }
                      size={24}
                      color="black"
                    />
                  }
                  errorStyle={{ color: "red" }}
                  errorMessage={errorState.error && errorState.error.lastName}
                />
              </View>
            </View>

            <View style={styles.input}>
              <Input
                placeholder="Phone Number"
                value={props.phone}
                onChangeText={(value) => handleChange("phone", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name={Platform.OS === "android" ? "md-call" : "ios-call"}
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.phone}
              />
            </View>

            <View style={styles.input}>
              <Input
                placeholder="Email Address"
                keyboardType={"email-address"}
                value={props.email}
                onChangeText={(value) => handleChange("email", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name={Platform.OS === "android" ? "md-mail" : "ios-mail"}
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.email}
              />
            </View>

            <View style={styles.input}>
              <Input
                placeholder="Password"
                value={props.password}
                onChangeText={(value) => handleChange("password", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder="Confirm Password"
                value={props.confirmPassword}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={
                  errorState.error && errorState.error.confirmPassword
                }
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.submit}>
            <Button
              disabled={validate() === null ? false : true}
              onPress={submitHandler}
              icon={
                <Ionicons
                  style={{ color: "white", marginRight: 10 }}
                  name={
                    Platform.OS === "android"
                      ? "md-person-add"
                      : "ios-person-add"
                  }
                  size={24}
                  color="black"
                />
              }
              title="Sign Up"
            />
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

  fields: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 50,
  },
  names: {
    flex: 1,
    flexDirection: "row",

    marginTop: 50,
  },
  inputName: {
    marginLeft: 10,
    width: "40%",
  },
  input: {
    marginLeft: 10,
    width: "90%",
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    confirmPassword,
    userPhoto,
    userType,
  } = state.auth;

  return {
    firstName,
    lastName,
    phone,
    email,
    password,
    confirmPassword,
    userPhoto,
    userType,
  };
};

export default connect(mapStateToProps, actions)(Register);
