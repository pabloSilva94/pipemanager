import * as groupData from "../data/groupData.js";

export const getAGroup = function (groupBody) {
  return groupData.getAGroup(groupBody);
};

export const saveGroup = function (groupBody) {
  return groupData.saveGroup(groupBody);
};

export const alterUser = function (userBody) {
  return groupData.alterUser(userBody);
};

export const deleteAGroup = function (userBody) {
  return groupData.deleteAGroup(userBody);
};

export default {
  getAGroup,
  saveGroup,
  alterUser,
  deleteAGroup,
};