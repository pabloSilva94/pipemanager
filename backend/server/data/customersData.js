const supabase = require("../infra/database");

exports.getACustomers = async function (customerBody) {
  const { user_id } = customerBody;
  try {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", user_id);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, data };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.saveCustomer = async function (customerBody) {
  const { id, name, phone, cnpj, cpf, address, user_id } = customerBody;
  try {
    if (!id || !name || !address || !user_id) {
      return { success: false, message: "dados invalidos" };
    }
    const { data: existingCustomer, error: selectError } = await supabase
      .from("customers")
      .select("id")
      .eq("id", id)
      .single();
    if (selectError && selectError.code !== "PGRST116") {
      return { success: false, message: selectError.message };
    }
    if (existingCustomer) {
      return { success: false, message: "Cliente já existe" };
    }
    const { error: insertError } = await supabase
      .from("customers")
      .insert({ id, name, phone, cnpj, cpf, address, user_id });
    if (insertError) {
      return { success: false, message: insertError.message };
    }
    const { data: selectCustomers, error: errorselectCustomers } =
      await supabase.from("customers").select("*").eq("user_id", user_id);
    if (errorselectCustomers) {
      return { success: false, message: errorselectCustomers.message };
    }
    return {
      success: true,
      data: selectCustomers,
      message: "Cadastrado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.alterCustomer = async function (customerBody) {
  const { id, name, cnpj, cpf, address, user_id } = customerBody;
  if (!id || !name || !address || !user_id) {
    return { success: false, message: "dados invalidos" };
  }
  try {
    const { data: existingCustomer, error: selectError } = await supabase
      .from("customers")
      .select("id")
      .eq("id", id)
      .single();
    if (selectError && selectError.code !== "PGRST116") {
      return { success: false, message: selectError.message };
    }
    if (existingCustomer) {
      return { success: false, message: "Cliente já existe" };
    }
    const { error } = await supabase
      .from("customers")
      .update({ id, name, cnpj, cpf, address })
      .eq("id", id)
      .eq("user_id", user_id);
    if (error) {
      return { success: false, message: error.message };
    }
    const { data: selectCustomers, error: errorSelectCustomers } =
      await supabase.from("customers").select("*").eq("user_id", user_id);
    if (selectCustomers) {
      return { success: false, message: errorSelectCustomers.message };
    }
    return {
      success: true,
      data: selectCustomers,
      message: "Alterado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.deleteCustomer = async function (customerBody) {
  const { id, user_id } = customerBody;
  if (!id || !user_id) {
    return { success: false, message: "Dados invalidos" };
  }
  try {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }
    const { data: selectCustomers, error: errorSelectCustomers } =
      await supabase.from("customers").select("*").eq("user_id", user_id);
    if (selectCustomers) {
      return { success: false, message: errorSelectCustomers.message };
    }
    return {
      success: true,
      data: selectCustomers,
      message: "Deletado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};
