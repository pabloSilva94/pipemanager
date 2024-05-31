const groupService = require("../services/groupService");

exports.getAllGroup = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  const groupBody = {
    user_id: user_id,
  };
  try {
    const groups = await groupService.getAGroup(groupBody);
    res.status(200).send({ success: true, data: groups.data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.register = async (req, res) => {
  const { user_id } = req.params;
  const { title } = req.body;
  if (!title || !user_id) {
    res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  try {
    const groupBody = {
      id: Math.random().toString(36).substring(2),
      title: title,
      code_group: Math.floor(1000 + Math.random() * 9000).toString(),
      user_id: user_id,
    };
    const result = await groupService.saveGroup(groupBody);
    res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, adm } = req.body;
    const userBody = {
      id,
      name,
      email,
      password,
      adm,
    };
    const result = await groupService.alterUser(userBody);
    res.status(200).send({ success: true, message: "alterado com sucesso" });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id, user_id } = req.body;
    const userBody = {
      id: id,
      user_id: user_id,
    };
    const result = await groupService.deleteAGroup(userBody);
    res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
