const userService = require("../services/userService");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  const userBody = {
    email,
    password,
  };
  try {
    const users = await userService.getAUser(userBody);
    res.status(200).send({ success: true, data: users.data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.register = async (req, res) => {
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
    res.status(200).send({ success: result.success, message: result.message });
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
    const result = await userService.alterUser(userBody);
    res.status(200).send({ success: true, message: "alterado com sucesso" });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteAUser({ id });
    res.status(200).send({ success: true, message: "Usuário deletado" });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
