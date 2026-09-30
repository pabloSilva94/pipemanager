import {
  getATask as getTaskData,
  saveTask as saveTaskData,
  alterTask as alterTaskData,
  alterAStatusTask,
  deleteATask as deleteTaskData,
} from "../data/taskData.js";

export const getATask = function (taskBody) {
  return getTaskData(taskBody);
};

export const saveTask = function (taskBody) {
  return saveTaskData(taskBody);
};

export const alterTask = function (taskBody) {
  return alterTaskData(taskBody);
};

export const alterStatusTask = function (taskBody) {
  return alterAStatusTask(taskBody);
};

export const deleteATask = function (taskBody) {
  return deleteTaskData(taskBody);
};