import "./App.css";
import TodoList from "./Todolist";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./Contexts/todoContext";
import { useState } from "react";
import MySnackbar from "./MySnackbar";
import { MySnackbarContext } from "./Contexts/MySnackbarContext";

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
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");

  const handleClick = (message) => {
    setOpen(true);
    setmessage(message)
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <MySnackbarContext.Provider value={{ handleClick }}>
        <div className="App" style={{ direction: "rtl" }}>
          <TodosContext.Provider value={{ Todos, setTodos }}>
            <TodoList />
            <MySnackbar open={open} handleClose={handleClose}  message={message}/>
          </TodosContext.Provider>
        </div>
      </MySnackbarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
