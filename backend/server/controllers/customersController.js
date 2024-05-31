const {
  alterACustomer,
  saveACustomer,
  getACustomers,
  deleteACustomer,
} = require("../services/customersService");

exports.getAllCustomers = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(404).send({ success: false, message: "Dados invalidos back" });
  }
  const customerBody = {
    user_id,
  };
  try {
    const customers = await getACustomers(customerBody);
    res.status(200).send({ success: true, data: customers.data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, cnpj, cpf, address, phone } = req.body;
    if (!user_id) {
      res.status(404).send({ success: false, message: "Dados invalidos back" });
    }
    const customerBody = {
      id: Math.random().toString(36).substring(2),
      name,
      phone,
      cnpj,
      cpf,
      address,
      user_id,
    };
    const result = await saveACustomer(customerBody);
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
    const { user_id } = req.params;
    const { id, name, cnpj, cpf, address } = req.body;
    const customerBody = {
      id,
      name,
      cnpj,
      cpf,
      address,
      user_id,
    };
    const result = await alterACustomer(customerBody);
    res
      .status(200)
      .send({ success: true, message: result.message, data: result.data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const customerBody={
      id, 
      user_id
    }
    const result = await deleteACustomer(customerBody);
    res
      .status(200)
      .send({ success: true, message: result.message, data: result.data });
  } catch (e) {
    res.status(500).send({ success: false, message: e.message });
  }
};
