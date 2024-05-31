const api = import.meta.env.VITE_API_URL_DEV;

export const createAGroup = async (groupBody) => {
  const { title, user_id } = groupBody;
  if (!title || !user_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}group/register/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, user_id }),
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
