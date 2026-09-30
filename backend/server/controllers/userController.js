import userService from "../services/userService.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  const userBody = { email, password };
  try {
    const users = await userService.getAUser(userBody);
    return res.status(200).send({ success: true, data: users.data });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userBody = {
      id: Math.random().toString(36).substring(2),
      name,
      email,
      password,
      adm: true,
    };
    const result = await userService.saveUser(userBody);
    return res.status(200).send({ success: result.success, message: result.message });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, adm } = req.body;
    const userBody = { id, name, email, password, adm };
    await userService.alterUser(userBody);
    return res.status(200).send({ success: true, message: "alterado com sucesso" });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteAUser({ id });
    return res.status(200).send({ success: true, message: "Usuário deletado" });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};