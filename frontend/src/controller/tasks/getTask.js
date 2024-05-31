const api = import.meta.env.VITE_API_URL_DEV;

export const getAllTasks = async (taskBody) => {
  const { group_id } = taskBody;
  if (!group_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(
      `${api}group/task/${group_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao listar as atividades",
      };
    }

    const data = await response.json();
    const taskData = data.data;
    localStorage.setItem("task", JSON.stringify(taskData));
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
