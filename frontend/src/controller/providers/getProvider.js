const api = import.meta.env.VITE_API_URL_DEV;

export const getAllProvider = async (providerBody) => {
  const { group_id, user_id } = providerBody;
  if (!group_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(
      `${api}/group/${group_id}/${user_id}`,
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
        message: errorData.message || "Erro ao listar os usuarios",
      };
    }

    const data = await response.json();
    const providerData = data.data;
    localStorage.setItem("providers", JSON.stringify(providerData));
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
