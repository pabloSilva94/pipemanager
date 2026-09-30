import groupService from "../services/groupService.js";

export const getAllGroup = async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  const groupBody = { user_id };
  try {
    const groups = await groupService.getAGroup(groupBody);
    return res.status(200).send({ success: true, data: groups.data });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const register = async (req, res) => {
  const { user_id } = req.params;
  const { title } = req.body;
  if (!title || !user_id) {
    return res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  try {
    const groupBody = {
      id: Math.random().toString(36).substring(2),
      title,
      code_group: Math.floor(1000 + Math.random() * 9000).toString(),
      user_id,
    };
    const result = await groupService.saveGroup(groupBody);
    return res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, adm } = req.body;
    const userBody = { id, name, email, password, adm };
    await groupService.alterUser(userBody);
    return res.status(200).send({ success: true, message: "alterado com sucesso" });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id, user_id } = req.body;
    const userBody = { id, user_id };
    const result = await groupService.deleteAGroup(userBody);
    return res.status(200).send({
      success: result.success,
      message: result.message,
      data: result.data,
    });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};