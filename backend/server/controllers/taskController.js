import {
  saveTask,
  getATask,
  alterTask,
  deleteATask,
  alterStatusTask,
} from "../services/taskService.js";
import { getCurrentDate, getCurrentTime } from "../utils/ultils.js";

export const getAllTask = async (req, res) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      return res.status(404).send({ success: false, message: "Dados invalidos back" });
    }
    const taskBody = { group_id };
    const tasks = await getATask(taskBody);
    return res.status(200).send({ success: true, data: tasks.data });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const register = async (req, res) => {
  const { group_id } = req.params;
  const {
    title,
    description,
    user_id,
    type_sys,
    type_inst,
    commits,
    customers_id,
    owner,
  } = req.body;

  if (!title || !user_id || !group_id || !customers_id) {
    return res.status(404).send({ success: false, message: "Dados invalidos" });
  }
  try {
    const taskBody = {
      title,
      description,
      date: getCurrentDate(),
      time: getCurrentTime(),
      status: "Novo",
      owner,
      commits,
      type_sys,
      type_inst,
      customers_id,
      group_id,
      user_id,
    };
    const result = await saveTask(taskBody);
    return res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const alterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id, status, commits } = req.body;
    if (!id || !group_id || !commits) {
      return res.status(404).send({ success: false, message: "Dados invalidos" });
    }
    const userBody = {
      id,
      status,
      commits,
      group_id,
    };
    const result = await alterStatusTask(userBody);
    return res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id } = req.body;
    if (!id || !group_id) {
      return res.status(404).send({ success: false, message: "Dados invalidos" });
    }
    const userBody = { id, group_id };
    const result = await deleteATask(userBody);
    return res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};