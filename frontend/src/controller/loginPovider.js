const api = import.meta.env.VITE_API_URL_DEV;
export const loginProvider = async (userBody) => {
  const { email, password } = userBody;
  if (!email || !password) {
    return { success: false, message: "Dados invalidos!" };
  }
  try {
    const response = await fetch(`${api}group/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao fazer o login.",
      };
    }

    const data = await response.json();
    const newData = data.data[0];
    localStorage.setItem("user", JSON.stringify(newData));
    return { success: data.success, message: data.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const logout = () => {
  try {
    localStorage.removeItem("user");

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const register = async (registerUser) => {
  const { name, email, password } = registerUser;
  if (!name || !email || !password) {
    return { success: false, message: "Dados inválidos." };
  }
  try {
    const response = await fetch(`${api}group/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "Erro ao registrar usuário",
      };
    }

    const data = await response.json();
    return { success: data.success, message: data.message };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Erro na requisição",
    };
  }
};
