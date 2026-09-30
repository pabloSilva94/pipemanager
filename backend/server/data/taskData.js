import supabase from "../infra/database.js";

export const getATask = async function (taskBody) {
  const { group_id } = taskBody;

  try {
    if (!group_id) {
      return { success: false, message: "dados invalidos" };
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*, customers:customers(name, phone, address)")
      .eq("group_id", group_id);

    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, data };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const saveTask = async function (taskBody) {
  const {
    title,
    description,
    status,
    date,
    time,
    customers_id,
    user_id,
    group_id,
    type_sys,
    type_inst,
    commits,
    owner,
  } = taskBody;
  try {
    if (!title || !user_id || !group_id || !customers_id) {
      return { success: false, message: "dados invalidos" };
    }
  
    const { error: insertError } = await supabase.from("tasks").insert([
      {
        title,
        description,
        status,
        date,
        time,
        user_id,
        group_id,
        type_sys,
        type_inst,
        customers_id,
        commits,
        owner,
      },
    ]);

    if (insertError) {
      return { success: false, message: insertError.message };
    }

    const { data: selectTask, error: errorSelectTask } = await supabase
      .from("tasks")
      .select("*, customers: customers(id, name, cpf, cnpj, address, phone)")
      .eq("group_id", group_id);

    if (errorSelectTask) {
      return { success: false, message: errorSelectTask.message };
    }

    return {
      success: true,
      data: selectTask,
      message: "Cadastrado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const alterTask = async function (taskBody) {
  const {
    id,
    title,
    description,
    status,
    type_sys,
    type_inst,
    commits,
    group_id,
  } = taskBody;
  if (!id || !group_id) {
    return { success: false, message: "dados invalidos" };
  }
  try {
    const { error } = await supabase
      .from("tasks")
      .update({ title, description, status, type_sys, type_inst, commits })
      .eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    const { data: selectTask, error: errorSelectTask } = await supabase
      .from("tasks")
      .select("*, customers: customers(id, name, cpf, cnpj, address, phone)")
      .eq("group_id", group_id);

    if (errorSelectTask) {
      return { success: false, message: errorSelectTask.message };
    }

    return {
      success: true,
      data: selectTask,
      message: "Alterado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const deleteATask = async function (taskBody) {
  const { id, group_id } = taskBody;
  if (!id || !group_id) {
    return { success: false, message: "Dados invalidos" };
  }
  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    const { data: selectTask, error: errorSelectTask } = await supabase
      .from("tasks")
      .select("*, customers: customers(id, name, cpf, cnpj, address, phone)")
      .eq("group_id", group_id);

    if (errorSelectTask) {
      return { success: false, message: errorSelectTask.message };
    }

    return {
      success: true,
      data: selectTask,
      message: "Deletado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export const alterAStatusTask = async function (taskBody) {
  const { id, status, commits: newCommits, group_id } = taskBody;
  if (!id || !group_id) {
    return { success: false, message: "dados invalidos" };
  }
  try {
    const { data: existingTask, error: errorExistingTask } = await supabase
      .from("tasks")
      .select("commits")
      .eq("id", id)
      .single();

    if (errorExistingTask) {
      return { success: false, message: errorExistingTask.message };
    }

    const currentCommits = Array.isArray(existingTask?.commits)
      ? existingTask.commits
      : [];
    const addCommits = [...currentCommits, ...(newCommits || [])];

    const { error } = await supabase
      .from("tasks")
      .update({ status, commits: addCommits })
      .eq("id", id);

    if (error) {
      return { success: false, message: error.message };
    }

    const { data: selectTask, error: errorSelectTask } = await supabase
      .from("tasks")
      .select("*, customers: customers(id, name, cpf, cnpj, address, phone)")
      .eq("group_id", group_id);

    if (errorSelectTask) {
      return { success: false, message: errorSelectTask.message };
    }

    return {
      success: true,
      data: selectTask,
      message: "Status alterado com sucesso!",
    };
  } catch (e) {
    return { success: false, message: e.message };
  }
};