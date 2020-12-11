import firebase from "firebase";
import { helpers as validateHelpers } from "vuelidate/lib/validators";
export const uniqueUserName = (value) => {
  if (!validateHelpers.req(value)) {
    return true;
  }
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("users")
      .orderByChild("usernameLower")
      .equalTo(value.toLowerCase())
      .once("value", snapshot => resolve(!snapshot.exists()));
  });
}

export const uniqueEmail = (value) => {
  if (!validateHelpers.req(value)) {
    return true;
  }
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(value.toLowerCase())
      .once("value", snapshot => resolve(!snapshot.exists()));
  });
}
