const groupData = require("../data/groupData");

exports.getAGroup = function (groupBody) {
  return groupData.getAGroup(groupBody);
};

// exports.findCnpj = function (carteiraBody) {
//   return paymentData.findCnpj(carteiraBody);
// };

exports.saveGroup = function (groupBody) {
  return groupData.saveGroup(groupBody);
};

exports.alterUser = function (userBody) {
  return groupData.alterUser(userBody);
};

exports.deleteAGroup = function (userBody) {
  return groupData.deleteAGroup(userBody);
};
