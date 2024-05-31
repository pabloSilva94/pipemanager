const { getACustomers, saveCustomer, alterCustomer, deleteCustomer } = require("../data/customersData");

exports.getACustomers = function (customerBody) {
  return getACustomers(customerBody);
};

exports.saveACustomer = function (customerBody) {
  return saveCustomer(customerBody);
};

exports.alterACustomer = function (customerBody) {
  return alterCustomer(customerBody);
};

exports.deleteACustomer = function (customerBody) {
  return deleteCustomer(customerBody);
};
