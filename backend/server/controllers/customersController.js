import {
  alterACustomer,
  saveACustomer,
  getACustomers,
  deleteACustomer,
} from "../services/customersService.js";

export const getAllCustomers = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res
      .status(404)
      .send({ success: false, message: "Dados invalidos back" });
  }
  const customerBody = { user_id };
  try {
    const customers = await getACustomers(customerBody);
    return res.status(200).send({ success: true, data: customers.data });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const register = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, cnpj, cpf, address, phone } = req.body;
    if (!user_id) {
      return res
        .status(404)
        .send({ success: false, message: "Dados invalidos back" });
    }
    const customerBody = {
      name,
      phone,
      cnpj,
      cpf,
      address,
      user_id,
    };
    const result = await saveACustomer(customerBody);
    console.log(result);
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
    return res
      .status(200)
      .send({ success: true, message: result.message, data: result.data });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id, user_id } = req.params;
    const customerBody = { id, user_id };
    const result = await deleteACustomer(customerBody);
    return res
      .status(200)
      .send({ success: true, message: result.message, data: result.data });
  } catch (e) {
    return res.status(500).send({ success: false, message: e.message });
  }
};
