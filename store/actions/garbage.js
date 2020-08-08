import { apiUrl } from "../../config.json";

const url = apiUrl + "/auth/register";

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

export const Register = ({ firstName, lastName, phone, email, password }) => {
  return (dispatch) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: password,
      }),
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log("data was saved!  ", response))
      .then(() => dispatch({ type: "REGISTER" }))
      .catch((error) => console.log(error));
  };
};

export const loadInitialContacts = () => {
  return (dispatch) => {
    fetch("http://192.168.100.114:4000/contact")
      .then((response) => {
        return response.json();
      })
      .then((data) => dispatch({ type: "INITIAL_FETCH", payload: data }))
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

export const updateContact = (person) => {
  return {
    type: "UPDATE_CONTACT",
    payload: person,
  };
};

export const saveContact = ({
  firstName,
  lastName,
  phone,
  email,
  company,
  notes,
  _id,
}) => {
  return (dispatch) => {
    fetch(`http://192.168.100.114:4000/contact/${_id}`, {
      method: "PUT",
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        company: company,
        notes: notes,
      }),
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => console.log(response))
      .then(() => dispatch({ type: "SAVE_CONTACT" }))
      .catch((error) => console.log(error));
  };
};
