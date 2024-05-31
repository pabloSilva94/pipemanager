export const getLocal = () => {
  try {
    const user = localStorage.getItem("user");
    if (!user) {
      return { success: false, message: "No user data found" };
    }
    return { success: true, data: JSON.parse(user) };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateGroups = (userBody) => {
  try {
    const user = localStorage.getItem("user");
    if (!user) {
      return { success: false, message: "Não existe usuarios" };
    }
    const data = userBody;
    localStorage.setItem("user", JSON.stringify(data));
    return { success: true, data: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
