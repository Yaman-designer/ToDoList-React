import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Todo from "./Todo";

import { useState, useContext, useEffect } from "react";
import { TodosContext } from "./Contexts/todoContext";

// Create a UUID
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [Textfield, setTextfield] = useState("");
  const { Todos, setTodos } = useContext(TodosContext);
  const [displeyedTodos, setDispleyedTodos] = useState("all");

  // filteration Todos
  const Completed = Todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompleted = Todos.filter((t) => {
    return !t.isCompleted;
  });
  let DisplayTodos = Todos;

  if (displeyedTodos == "Completed") {
    DisplayTodos = Completed;
  } else if (displeyedTodos == "nonCompleted") {
    DisplayTodos = notCompleted;
  } else {
    DisplayTodos = Todos;
  }

  const todoslist = DisplayTodos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  function changeDisplayedTodos(e) {
    setDispleyedTodos(e.target.value);
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
    setTodos(storageTodos);
  }, []);

  function handleAddClick() {
    if (Textfield.trim() === "") return;
    const newTodo = {
      id: uuidv4(),
      title: Textfield,
      Description: "",
      isCompleted: false,
    };
    const updateTodos = [...Todos, newTodo];
    setTodos(updateTodos);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
    setTextfield(""); // تفريغ الحقل بعد الإضافة
  }

  return (
    <>
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h3" style={{ fontWeight: "700" }}>
              مهامي
            </Typography>
            <Divider />
            {/* filter buttons */}
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "10px" }}
              color="primary"
              value={displeyedTodos}
              exclusive
              onChange={changeDisplayedTodos}
              aria-label="Platform"
            >
              <ToggleButton value="nonCompleted">غير منجزة</ToggleButton>
              <ToggleButton value="Completed">منجزة</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/*  ===filter buttons === */}
            {/* all todos */}
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                scrollbarWidth: "thin", // Firefox
              }}
            >
              {todoslist}
            </div>
            {/*== all todos == */}
            {/* input & ADD BTN */}

            <Grid container spacing={1} style={{ marginTop: "20px" }}>
              <Grid size={8}>
                <TextField
                  value={Textfield}
                  onChange={(event) => {
                    setTextfield(event.target.value);
                  }}
                  fullWidth
                  id="outlined-basic"
                  label="أضف المهمة"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={handleAddClick}
                  variant="contained"
                  style={{ fontWeight: "500" }}
                  color="primary"
                  sx={{
                    height: "100%",
                    width: "100%",
                  
                  }}
                  disabled={Textfield.length == 0}
                >
                  اضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
