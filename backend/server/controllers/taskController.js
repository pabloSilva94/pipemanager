const {
  saveTask,
  getATask,
  alterTask,
  deleteATask,
  alterStatusTask,
} = require("../services/taskService");
const { getCurrentDate, getCurrentTime } = require("../utils/ultils");
exports.getAllTask = async (req, res) => {
  try {
    const { group_id } = req.params;
    if (!group_id) {
      res.status(404).send({ success: false, message: "Dados invalidos back" });
    }
    const taskBody = {
      group_id: group_id,
    };
    const tasks = await getATask(taskBody);
    res.status(200).send({ success: true, data: tasks.data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.register = async (req, res) => {
  const { group_id } = req.params;
  const {
    title,
    description,
    user_id,
    type_sys,
    type_inst,
    commits,
    customers_id,
    owner
  } = req.body;

  if (!title || !user_id || !group_id || !customers_id) {
    res.status(404).send({ success: false, message: "Dados invalidos" });
  }
  try {
    const taskBody = {
      id: Math.random().toString(36).substring(2),
      title: title,
      description: description,
      date: getCurrentDate(),
      time: getCurrentTime(),
      status: "Novo",
      owner:owner,
      commits: commits,
      type_sys: type_sys,
      type_inst: type_inst,
      customers_id: customers_id,
      group_id: group_id,
      user_id: user_id,
    };
    const result = await saveTask(taskBody);
    res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

/* exports.put = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      user_id,
      group_id,
      status,
      type_sys,
      type_inst,
      commits,
    } = req.body;

    if (!id || !group_id) {
      res.status(404).send({ success: false, message: "Dados invalidos" });
    }
    const userBody = {
      id,
      title,
      description,
      status,
      type_sys,
      type_inst,
      commits,
      user_id,
      group_id,
    };
    const result = await alterTask(userBody);
    res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
}; */
exports.alterStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { group_id, status, commits } = req.body;
    if (!id || !group_id || !commits) {
      res.status(404).send({ success: false, message: "Dados invalidos" });
    }
    const userBody = {
      id,
      status,
      commits,
      group_id,
    };
    const result = await alterStatusTask(userBody);
    res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const { group_id } = req.body;
    if (!id || !group_id) {
      res.status(404).send({ success: false, message: "Dados invalidos" });
    }
    const userBody = {
      id,
      group_id,
    };
    const result = await deleteATask(userBody);
    res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
