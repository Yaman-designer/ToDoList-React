import "./App.css";
import TodoList from "./Todolist";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./Contexts/todoContext";
import { useState } from "react";

// Create a UUID
import { v4 as uuidv4 } from "uuid";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["tajawal"],
    },
    palette: {
      primary: {
      main: "#512da8",
    },
    },
  });

  const [Todos, setTodos] = useState([
    {
      id: uuidv4(),
      title: "كتابة",
      Description: "sdgsdfgdfgdfg",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "cfbch",
      Description: "sdgsdfgdfgdfg",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "كتابة اي شي",
      Description: "sdgsdfgdfgdfg",
      isCompleted: false,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ direction: "rtl" }}>
        <TodosContext.Provider value={{ Todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
