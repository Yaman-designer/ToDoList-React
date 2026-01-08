import { createContext, useReducer, useContext } from "react";
import TodosReducers from "../Reducers/TodosReducers";

export const TodosContext = createContext({});

const TodosProvider = ({ children }) => {
  const [Todos, dispatch] = useReducer(TodosReducers, []);
  return (
    <TodosContext.Provider value={{ Todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
export const useTodos = () => {
  return useContext(TodosContext)
};

export default TodosProvider;
