import {
  getACustomers as getCustomersData,
  saveCustomer,
  alterCustomer,
  deleteCustomer,
} from "../data/customersData.js";

export const getACustomers = function (customerBody) {
  return getCustomersData(customerBody);
};

export const saveACustomer = function (customerBody) {
  return saveCustomer(customerBody);
};

export const alterACustomer = function (customerBody) {
  return alterCustomer(customerBody);
};

export const deleteACustomer = function (customerBody) {
  return deleteCustomer(customerBody);
};