const api = import.meta.env.VITE_API_URL_DEV;

export const deleteATask = async (taskBody) => {
  const { user_id, id, group_id } = taskBody;
  if (!id || !user_id || !group_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(
      `${api}group/task/${group_id}/register/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          group_id,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao deletar a atividade",
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
