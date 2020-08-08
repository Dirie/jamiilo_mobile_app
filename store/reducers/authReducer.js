import { act } from "react-test-renderer";

const initialState = {
  people: [],
  detailView: false,
  personSelected: null,

  currentUser: "",
  userToken: "",
  isSignout: true,

  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  userPhoto: "https://bootdey.com/img/Content/avatar/avatar6.png",
  userType: "User",
  error: "",
  _id: "",
  toUpdate: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        email: action.payload.email,
        password: action.payload.password,
        userPhoto: action.payload.userPhoto,
        userType: action.payload.userType,
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
        confirmPassword: "",
        userPhoto: "https://bootdey.com/img/Content/avatar/avatar6.png",
        userType: "User",
      };
    case "LOGIN":
      return {
        userToken: action.payload.token,
        isSignout: false,
        currentUser: action.payload.email,
        email: "",
        password: "",
      };
    case "LOGOUT":
      return {
        userToken: "",
        isSignout: true,
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
