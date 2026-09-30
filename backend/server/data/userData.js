import supabase from "../infra/database.js";

export const getAUser = async function (userBody) {
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

    if (data.length === 0) {
      const { data: dataProvider, error: errorProvider } = await supabase
        .from("providers")
        .select(
          "id, email, name, active, group: group(id, title, code_group, user_id)"
        )
        .eq("email", email)
        .eq("password", password);

      if (errorProvider) {
        return { success: false, message: errorProvider.message };
      }
      return { success: true, data: dataProvider };
    }

    return { success: true, data };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const saveUser = async function (userBody) {
  const { id, name, email, password, adm } = userBody;
  try {
    if (!id || !name || !email || !password) {
      return { success: false, message: "dados invalidos back" };
    }

    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (selectError) {
      return { success: false, message: selectError.message };
    }

    if (existingUser) {
      return { success: false, message: "Usuário já existe" };
    }

    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id, name, email, password, adm }]);

    if (insertError) {
      return { success: false, message: insertError.message };
    }

    return { success: true, message: "Cadastrado com sucesso!" };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const alterUser = async function (userBody) {
  const { id, name, email, password, adm } = userBody;
  try {
    const { error } = await supabase
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

export const deleteAUser = async function (userBody) {
  const { id } = userBody;
  try {
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true };
  } catch (e) {
    throw new Error(e.message);
  }
};