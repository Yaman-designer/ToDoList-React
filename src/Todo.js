import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "./Contexts/todoContext";

export default function Todo({ todo }) {
  const { Todos, setTodos } = useContext(TodosContext);
  const [open, setOpen] = useState(false);
  const [openupdateshow, setOpenupdateshow] = useState(false);
  const [updatetodos, setupdatetodos] = useState({
    title: todo.title,
    Description: todo.Description,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenUpdate = () => {
    setOpenupdateshow(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };
  const handleUpdateClose = () => {
    setOpenupdateshow(false);
  };

  function handlecheckClick() {
    const updateTodos = Todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updateTodos);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
  }


  function handledeleteClick() {
    const updateTodos = Todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updateTodos);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
  }


  function handleUpdateClickconfirm() {
    const updateTodos = Todos.map((t) => {
      if (t.id == todo.id) {
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
    setOpenupdateshow(false);
    localStorage.setItem("todo", JSON.stringify(updateTodos));
  }

  
  return (
    <>
      <Card
        className="todocard"
        sx={{
          minWidth: 275,
          color: "white",
          backgroundColor: "#3b0879ff",
          mb: 2,
          mt: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{ textAlign: "right", fontWeight: "600" ,textDecoration: todo.isCompleted ? "line-through" : "none"}}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  textAlign: "right",
                  fontSize: "20px",
                  marginTop: "7px",
                }}
              >
                {todo.Description}
              </Typography>
            </Grid>
            {/* icons BTN */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* EDIT ICON */}
              <IconButton
                onClick={handleClickOpenUpdate}
                className="iconBtn"
                aria-label="EditIcon"
                size="small"
                style={{
                  backgroundColor: "white",
                  color: "#6e1ad3",
                  border: "solid #6e1ad3  3px",
                }}
              >
                <EditIcon />
              </IconButton>
              {/*== EDIT ICON ==*/}
              {/* CHECK ICON */}
              <IconButton
                onClick={handlecheckClick}
                className="iconBtn"
                aria-label="CheckCircleIcon"
                size="small"
                style={{
                  backgroundColor: todo.isCompleted ? "#40b94d" : "white",
                  color: todo.isCompleted ? "white" : "#40b94d",
                  border: "solid #40b94d  3px",
                }}
              >
                <CheckCircleIcon />
              </IconButton>
              {/*== CHECK ICON ==*/}
              {/* DELETE ICON */}
              <IconButton
                onClick={handleClickOpen}
                className="iconBtn"
                aria-label="delete"
                size="small"
                style={{
                  backgroundColor: "white",
                  color: "#d54747",
                  border: "solid #d54747  3px",
                }}
              >
                <DeleteIcon />
                {/* == DELETE ICON == */}
              </IconButton>
            </Grid>
            {/* == icons BTN == */}
          </Grid>
        </CardContent>
      </Card>
      {/*  DELETE DIALOG   */}
      <Dialog
        open={open}
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
    </>
  );
}
