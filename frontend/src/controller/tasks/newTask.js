const api = import.meta.env.VITE_API_URL_DEV;

export const createATask = async (taskBody) => {
  const {
    title,
    description,
    user_id,
    type_sys,
    type_inst,
    commits,
    customers_id,
    group_id,
    owner
  } = taskBody;
  if (!group_id || !title || !user_id || !customers_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}group/task/register/${group_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        user_id,
        type_sys,
        type_inst,
        commits,
        customers_id,
        owner
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao registrar o tarefa",
      };
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Erro na requisição",
    };
  }
};
