const api = import.meta.env.VITE_API_URL_DEV;

export const getACustomers = async (customersBody) => {
  const { user_id } = customersBody;
  if (!user_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}group/customers/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao listar os cliente",
      };
    }

    const data = await response.json();
    const newCustomers = data.data;
    localStorage.setItem("customers", JSON.stringify(newCustomers));
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
