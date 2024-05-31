const {
  getATask,
  saveTask,
  alterTask,
  alterAStatusTask,
  deleteATask,
} = require("../data/taskData");

exports.getATask = function (taskBody) {
  return getATask(taskBody);
};

// exports.findCnpj = function (carteiraBody) {
//   return paymentData.findCnpj(carteiraBody);
// };

exports.saveTask = function (taskBody) {
  return saveTask(taskBody);
};

exports.alterTask = function (taskBody) {
  return alterTask(taskBody);
};
exports.alterStatusTask = function (taskBody) {
  return alterAStatusTask(taskBody);
};

exports.deleteATask = function (taskBody) {
  return deleteATask(taskBody);
};
