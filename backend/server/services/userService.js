const userData = require("../data/userData");

exports.getAUser = function (userBody) {
  return userData.getAUser(userBody);
};

// exports.findCnpj = function (carteiraBody) {
//   return paymentData.findCnpj(carteiraBody);
// };

exports.saveUser = function (userBody) {
  return userData.saveUser(userBody);
};

exports.alterUser = function (userBody) {
  return userData.alterUser(userBody);
};

exports.deleteAUser = function (userBody) {
  return userData.deleteAUser(userBody);
};
