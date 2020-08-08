import { apiUrl } from "../../config.json";
import AsyncStorage from "@react-native-community/async-storage";

export const selectPerson = (peopleId) => {
  return {
    type: "SELECTED_PERSON",
    selected: peopleId,
  };
};

export const noneSelected = () => {
  return {
    type: "NONE_SELECTED",
  };
};

export const formUpdate = ({ prop, value }) => {
  return {
    type: "FORM_UPDATE",
    payload: { prop, value },
  };
};

export const logout = () => {
  return (dispatch) => {
    AsyncStorage.removeItem("@token")
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((error) => console.log(error));
  };
};

export const register = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  userPhoto,
  userType,
}) => {
  const url = apiUrl + "/auth/register";

  return (dispatch) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
        userPhoto: userPhoto,
        userType: userType,
      }),
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => dispatch({ type: "REGISTER" }))
      .catch((error) => console.log(error));
  };
};

export const login = ({ email, password }) => {
  const url = apiUrl + "/auth/login";
  return (dispatch) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        await AsyncStorage.setItem("@token", data.token);
        dispatch({ type: "LOGIN", payload: { email, token: data.token } });
      })
      .catch((error) => console.log(error));
  };
};

export const loadUsers = (email, userToken) => {
  const url1 = apiUrl + "/auth/user";
  const url = `${url1}/${email}`;
  return (dispatch) => {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: userToken,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "LOAD_USER", payload: data });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteContacts = (id) => {
  return (dispatch) => {
    fetch(`http://192.168.100.114:4000/contact/${id}`, { method: "DELETE" })
      .then(() => dispatch({ type: "DELETE_CONTACT" }))
      .catch((error) => console.log(error));
  };
};

export const updateUser = ({
  firstName,
  lastName,
  phone,
  userPhoto,
  email,
  userToken,
}) => {
  const url1 = apiUrl + "/auth/user";
  const url = `${url1}/${email}`;
  return (dispatch) => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        userPhoto: userPhoto,
      }),
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
        Authorization: userToken,
      },
    }).catch((error) => console.log(error));
  };
};
