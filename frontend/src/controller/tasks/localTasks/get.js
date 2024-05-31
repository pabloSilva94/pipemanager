export const getLocalTask = () => {
    try {
      const task = localStorage.getItem("task");
      if (!task) {
        return { success: false, message: "No task data found" };
      }
      return { success: true, data: JSON.parse(task) };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  
  export const updateTask = (taskBody) => {
    try {
      const task = localStorage.getItem("task");
      if (!task) {
        return { success: false, message: "Não existe atividades" };
      }
      const data = taskBody;
      localStorage.setItem("task", JSON.stringify(data));
      return { success: true, data: data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
  