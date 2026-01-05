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

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "./Contexts/todoContext";

// Create a UUID
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  // useState
  const [Textfield, setTextfield] = useState("");
  const { Todos, setTodos } = useContext(TodosContext);
  const [displeyedTodos, setDispleyedTodos] = useState("all");
  const [Showdeletedialog, setShowdeletedialog] = useState(false);
  const [dialogtodo, setDiyalogtodo] = useState(null);
  const [openupdateshow, setOpenupdateshow] = useState(false);
  const [opendialogUpdate ,setopendialogUpdate] =useState(null);
   const [updatetodos, setupdatetodos] = useState({
    title: "",
    Description:"",
  });

  // filteration Todos
  const Completed = useMemo(() => {
    return Todos.filter((t) => {
      return t.isCompleted;
    });
  }, [Todos]);
  const notCompleted = useMemo(() => {
    return Todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [Todos]);
  let DisplayTodos = Todos;

  if (displeyedTodos == "Completed") {
    DisplayTodos = Completed;
  } else if (displeyedTodos == "nonCompleted") {
    DisplayTodos = notCompleted;
  } else {
    DisplayTodos = Todos;
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayedTodos(e) {
    setDispleyedTodos(e.target.value);
  }

  // handelers
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

  // hande Delete Dialog
  const handleDeleteClose = () => {
    setShowdeletedialog(false);
  };
  function opendialog(todo) {
    setShowdeletedialog(true);
    setDiyalogtodo(todo);
  }
  function handledeleteClick() {
    const updateTodos = Todos.filter((t) => {
      return t.id !== dialogtodo.id;
    });
    setTodos(updateTodos);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
    setShowdeletedialog(false);
  }


  // hande Update Dialog
  const handleUpdateClose = () => {
    setOpenupdateshow(false);
  };
 function openUpdateDialog(todo) {
    setOpenupdateshow(true);
   setopendialogUpdate(todo);
setupdatetodos({
  title:todo.title,
  Description:todo.Description
})

  }
  function handleUpdateClickconfirm() {
    const updateTodos = Todos.map((t) => {
      if (t.id == opendialogUpdate.id) {
        return {
          ...t,
          title: updatetodos.title,
          Description: updatetodos.Description,
        };
      } else {
        return t;
      }
    });
    setTodos(updateTodos);
   
    localStorage.setItem("todo", JSON.stringify(updateTodos));
      setOpenupdateshow(false);
  }

  // Todos maping
  const todoslist = DisplayTodos.map((t) => {
    return <Todo key={t.id} todo={t} opendialog={opendialog} opendialogUpdate={openUpdateDialog}/>;
  });
  return (
    <>
      {/* UPDATE DIALOG  */}
      <Dialog
        open={openupdateshow}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "right" }}>
          تعديل مهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            value={updatetodos.title}
            id="name"
            label="عنوان مهمة"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setupdatetodos({ ...updatetodos, title: event.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            value={updatetodos.Description}
            label="التفاصيل"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setupdatetodos({
                ...updatetodos,
                Description: event.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateClickconfirm}
            autoFocus
            style={{ color: "#d54747" }}
          >
            تأكيد
          </Button>
          <Button onClick={handleUpdateClose} style={{ color: "#6e1ad3" }}>
            تراجع
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===  UPDATE DIALOG  === */}

      {/*  DELETE DIALOG   */}
      <Dialog
        open={Showdeletedialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "right" }}>
          هل أنت متأكد من حذف هذه المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هذا الإجراء سيؤدي إلى حذف المهمة بشكل نهائي ولا يمكن التراجع عنه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handledeleteClick}
            autoFocus
            style={{ color: "#d54747" }}
          >
            تأكيد الحذف
          </Button>
          <Button onClick={handleDeleteClose} style={{ color: "#6e1ad3" }}>
            تراجع
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===  DELETE DIALOG  === */}
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
