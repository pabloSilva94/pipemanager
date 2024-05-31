const supabase = require("../infra/database");

exports.groupData = async function (groupBody) {
  const { user_id } = groupBody;
  try {
    const { data, error } = await supabase
      .from("group")
      .select("id, title, code_group")
      .eq("user_id", user_id);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, data: data };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.saveGroup = async function (groupBody) {
  const { id, title, code_group, user_id } = groupBody;
  try {
    if (!id || !title || !code_group || !user_id) {
      return { success: false, message: "dados invalidos" };
    }
    const { data: existingGroup, error: selectError } = await supabase
      .from("group")
      .select("id")
      .eq("id", id)
      .single();
    if (selectError && selectError.code !== "PGRST116") {
      return { success: false, message: selectError.message };
    }
    if (existingGroup) {
      return { success: false, message: "Grupo já existe" };
    }
    const { data, error: insertError } = await supabase
      .from("group")
      .insert({ id, title, code_group, user_id });
    if (insertError) {
      return { success: false, message: insertError.message };
    }
    const { data: selectUserGroup, error: errorSelectUserGroup } =
      await supabase
        .from("users")
        .select(
          "id, email, name, adm, group: group(id, title, code_group, user_id)"
        )
        .eq("id", user_id);
    if (errorSelectUserGroup) {
      return { success: false, message: errorSelectUserGroup.message };
    }
    return {
      success: true,
      data: selectUserGroup,
      message: "Cadastrado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

exports.alterUser = async function (groupBody) {
  const { id, name, email, password, adm } = groupBody;
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ name, email, password, adm })
      .eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true };
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.deleteAGroup = async function (groupBody) {
  const { id, user_id } = groupBody;
  if (!id || !user_id) {
    return { success: false, message: "Dados invalidos" };
  }
  try {
    const { data, error } = await supabase.from("group").delete().eq("id", id);
    if (error) {
      return { success: false, message: error.message };
    }
    const { data: selectUserGroup, error: errorSelectUserGroup } =
      await supabase
        .from("users")
        .select(
          "id, email, name, adm, group: group(id, title, code_group, user_id)"
        )
        .eq("id", user_id);
    if (errorSelectUserGroup) {
      return { success: false, message: errorSelectUserGroup.message };
    }
    return { success: true, data: selectUserGroup };
  } catch (e) {
    throw new Error(e.message);
  }
};
