import "./App.css";
import TodoList from "./Todolist";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TodosProvider from "./Contexts/todoContext";
import { useState } from "react";
import { ToastProvider } from "./Contexts/MySnackbarContext";

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
      <TodosProvider>
        <ToastProvider>
          <div className="App" style={{ direction: "rtl" }}>
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
