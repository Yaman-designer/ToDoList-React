import { v4 as uuidv4 } from "uuid";

export default function TodosReducers(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.titleInput,
        Description: "",
        isCompleted: false,
      };
      const updateTodos = [...currentTodos, newTodo];
      localStorage.setItem("todo", JSON.stringify(updateTodos));

      return updateTodos;
    }
    case "deleted": {
      const updateTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todo", JSON.stringify(updateTodos));
      return updateTodos;
    }

    case "updated": {
      const updateTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            Description: action.payload.Description,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todo", JSON.stringify(updateTodos));

      return updateTodos;
    }
    case "completed": {
      const updateTodos = currentTodos.map((t) =>
        t.id === action.payload.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      localStorage.setItem("todo", JSON.stringify(updateTodos));
      return updateTodos;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
      return storageTodos;
    }
    default: {
      throw Error("Unknown Action");
    }
  }
  return [];
}
