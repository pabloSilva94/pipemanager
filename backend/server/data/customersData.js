import supabase from "../infra/database.js";

export const getACustomers = async function (customerBody) {
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

export const saveCustomer = async function (customerBody) {
  const { name, phone, cnpj, cpf, address, user_id } = customerBody;
  try {
    if (!name || !address || !user_id) {
      return { success: false, message: "dados invalidos" };
    }

    const { error: insertError } = await supabase
      .from("customers")
      .insert([{ name, phone, cnpj, cpf, address, user_id }]);

    if (insertError) {
      return { success: false, message: insertError.message };
    }
    console.log(insertError);
    const { data: selectCustomers, error: errorSelectCustomers } =
      await supabase.from("customers").select("*").eq("user_id", user_id);

    if (errorSelectCustomers) {
      return { success: false, message: errorSelectCustomers.message };
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

export const alterCustomer = async function (customerBody) {
  const { id, name, cnpj, cpf, address, user_id } = customerBody;
  if (!id || !name || !address || !user_id) {
    return { success: false, message: "dados invalidos" };
  }
  try {
    const { error } = await supabase
      .from("customers")
      .update({ name, cnpj, cpf, address })
      .eq("id", id)
      .eq("user_id", user_id);

    if (error) {
      return { success: false, message: error.message };
    }

    const { data: selectCustomers, error: errorSelectCustomers } =
      await supabase.from("customers").select("*").eq("user_id", user_id);

    if (errorSelectCustomers) {
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

export const deleteCustomer = async function (customerBody) {
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

    if (errorSelectCustomers) {
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
