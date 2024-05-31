const api = import.meta.env.VITE_API_URL_DEV;

export const delAGroup = async (groupBody) => {
  const { id, user_id } = groupBody;
  if (!id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}group/register/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, user_id }), // Incluindo o corpo na requisição
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao registrar o grupo",
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
