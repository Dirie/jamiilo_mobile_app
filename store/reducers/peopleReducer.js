import { act } from "react-test-renderer";

const initialState = {
  people: [],
  detailView: false,
  personSelected: null,

  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  _id: "",
  toUpdate: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INITIAL_FETCH":
      return {
        ...state,
        people: action.payload,
      };
    case "SELECTED_PERSON":
      return {
        ...state,
        detailView: true,
        personSelected: action.selected,
      };
    case "NONE_SELECTED":
      return {
        ...state,
        detailView: false,
        personSelected: null,
      };
    case "FORM_UPDATE":
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case "REGISTER":
      return {
        ...state,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
      };
    case "ADD_PERSON":
      return {
        ...state,
        ...action.newPerson,
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        email: action.payload.email,
        company: action.payload.company,
        notes: action.payload.notes,
        _id: action.payload._id,
        toUpdate: true,
      };
    case "SAVE_CONTACT":
      return {
        ...state,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        company: "",
        notes: "",
        _id: "",
        toUpdate: false,
        detailView: false,
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        detailView: false,
        personSelected: null,
      };
    default:
      return state;
  }
};
