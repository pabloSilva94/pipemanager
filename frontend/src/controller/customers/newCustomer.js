const api = import.meta.env.VITE_API_URL_DEV;

export const createACustomers = async (customersBody) => {
  const { user_id, name, phone, cnpj, cpf, address } = customersBody;
  if (!name || !address || !user_id) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}customers/register/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, cnpj, cpf, address }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao registrar o cliente",
      };
    }

    const data = await response.json();
    const newCustomers = data.data[0];
    localStorage.setItem("customers", JSON.stringify(newCustomers));
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
