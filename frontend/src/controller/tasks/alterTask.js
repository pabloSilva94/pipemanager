const api = import.meta.env.VITE_API_URL_DEV;

export const alterATask = async (taskBody) => {
  const {
    id,
    title,
    description,
    user_id,
    group_id,
    status,
    type_sys,
    type_inst,
    commits,
  } = taskBody;
  if (!id || !group_id || !user_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(
      `${api}${api}${group_id}/task/register/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          user_id,
          group_id,
          status,
          type_sys,
          type_inst,
          commits,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao alterar uma atividade",
      };
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      data: data.data[0],
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Erro na requisição",
    };
  }
};
export const alterAStatusTask = async (taskBody) => {
  const { id, status, commits, group_id } = taskBody;
  if (!id || !group_id || !status) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(
      `${api}group/task/${group_id}/register/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          commits,
          group_id,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao alterar o status da atividade",
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
export const addACommitTask = async (taskBody) => {
  const { id, status, commits, group_id } = taskBody;
  if (!id || !group_id || !status) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(
      `${api}group/task/${group_id}/register/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          commits,
          group_id,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao alterar o status da atividade",
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