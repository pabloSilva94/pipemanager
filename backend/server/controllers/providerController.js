const providerService = require("../services/providerService");

exports.register = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, email, password, group_id } = req.body;
    const userBody = {
      id: Math.random().toString(36).substring(2),
      name,
      email,
      password,
      user_id,
      group_id,
      active: true,
    };
    const result = await providerService.saveUser(userBody);
    res.status(200).send({ success: result.success, message: result.message });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.put = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const { name, email, password } = req.body;
    const userBody = {
      id,
      name,
      email,
      password,
      active,
      user_id,
    };
    const result = await providerService.alterUser(userBody);
    res.status(200).send({ success: true, message: result.message });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const result = await providerService.deleteAUser({ id, user_id });
    res.status(200).send({ success: true, message: result.message });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
