const supabase = require("../infra/database");

exports.getAUser = async function (userBody) {
  const { email, password } = userBody;
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        "id, email, name, adm, group: group(id, title, code_group, user_id)"
      )
      .eq("email", email)
      .eq("password", password);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, data: data };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.saveUser = async function (userBody) {
  const { id, name, email, password, user_id, active, group_id } = userBody;
  try {
    if (!id || !name || !email || !password || !user_id || !group_id) {
      return { success: false, message: "dados invalidos!" };
    }
    const { data: existingUser, error: selectError } = await supabase
      .from("providers")
      .select("id")
      .eq("email", email)
      .eq("user_id", user_id)
      .single();
    if (selectError && selectError.code !== "PGRST116") {
      return { success: false, message: selectError.message };
    }
    if (existingUser) {
      return { success: false, message: "Usuário já existe" };
    }
    const { error: insertError } = await supabase
      .from("providers")
      .insert({ id, name, email, password, user_id, active, group_id });
    if (insertError) {
      return { success: false, message: insertError.message };
    }
    return { success: true, message: "Cadastrado com sucesso!" };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.alterUser = async function (userBody) {
  const { id, name, email, password, user_id, active } = userBody;
  try {
    const { error } = await supabase
      .from("providers")
      .update({ name, email, password, adm, active })
      .eq("id", id)
      .eq("user_id", user_id);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Alterado com sucesso" };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.deleteAUser = async function (userBody) {
  const { id, user_id } = userBody;
  try {
    const { error } = await supabase
      .from("providers")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message:"Deletado com sucesso" };
  } catch (e) {
    return { success: false, message: e.message };
  }
};
