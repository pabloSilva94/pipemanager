import * as providerData from "../data/providerData.js";

export const getAUser = function (userBody) {
  return providerData.getAUser(userBody);
};

export const saveUser = function (userBody) {
  return providerData.saveUser(userBody);
};

export const alterUser = function (userBody) {
  return providerData.alterUser(userBody);
};

export const deleteAUser = function (userBody) {
  return providerData.deleteAUser(userBody);
};

export default {
  getAUser,
  saveUser,
  alterUser,
  deleteAUser,
};