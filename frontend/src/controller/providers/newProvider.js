const api = import.meta.env.VITE_API_URL_DEV;

export const createAProvider = async (providerBody) => {
  const {
    name,
    email,
    user_id,
    password,
    group_id,
  } = providerBody;
  if (!name || !email || !user_id || !password ||!group_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}group/providers/register/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        user_id,
        password,
        group_id
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao registrar o usuario",
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
