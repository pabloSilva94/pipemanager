export const getLocalProvider = () => {
  try {
    const provider = localStorage.getItem("providers");
    if (!provider) {
      return { success: false, message: "Não existe usuarios" };
    }
    return { success: true, data: provider };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateTask = (providerBody) => {
  try {
    const provider = localStorage.getItem("providers");

    if (!provider) {
      return { success: false, message: "Não existe atividades" };
    }
    const data = providerBody;
    localStorage.setItem("providers", JSON.stringify(data));
    return { success: true, data: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
