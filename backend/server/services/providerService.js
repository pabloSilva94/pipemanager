const providerData = require("../data/providerData");

exports.getAUser = function (userBody) {
  return providerData.getAUser(userBody);
};

// exports.findCnpj = function (carteiraBody) {
//   return paymentData.findCnpj(carteiraBody);
// };

exports.saveUser = function (userBody) {
  return providerData.saveUser(userBody);
};

exports.alterUser = function (userBody) {
  return providerData.alterUser(userBody);
};

exports.deleteAUser = function (userBody) {
  return providerData.deleteAUser(userBody);
};
