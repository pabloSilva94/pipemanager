export const getLocalCostumer = () => {
  try {
    const costumer = localStorage.getItem("customers");
    if (!costumer) {
      return { success: false, message: "No customers data found" };
    }
    return { success: true, data: JSON.parse(costumer) };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateCostumer = (costumerBody) => {
  try {
    const costumer = localStorage.getItem("customers");

    if (!costumer) {
      return { success: false, message: "Não existe clientes" };
    }
    const data = costumerBody;
    localStorage.setItem("customers", JSON.stringify(data));
    return { success: true, data: data };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
