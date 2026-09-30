import * as userData from "../data/userData.js";

export const getAUser = function (userBody) {
  return userData.getAUser(userBody);
};

export const saveUser = function (userBody) {
  return userData.saveUser(userBody);
};

export const alterUser = function (userBody) {
  return userData.alterUser(userBody);
};

export const deleteAUser = function (userBody) {
  return userData.deleteAUser(userBody);
};

export default {
  getAUser,
  saveUser,
  alterUser,
  deleteAUser,
};