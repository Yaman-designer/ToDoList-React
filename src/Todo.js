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
import {MySnackbarContext} from "./Contexts/MySnackbarContext";
import { useContext } from "react";
import { useTodos } from "./Contexts/todoContext";

export default function Todo({ todo, opendialog ,opendialogUpdate}) {
const {handleClick} =useContext(MySnackbarContext);
const {Todos , dispatch} =useTodos()
  const handleClickOpen = () => {
    opendialog(todo);
  };

  const handleClickOpenUpdate = () => {
   opendialogUpdate(todo)
  };

 

  function handlecheckClick() {
dispatch({type:"completed" , payload:{id :todo.id}})
    handleClick("تم بنجاح")
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
                style={{
                  wordBreak:"break-word",
                  textAlign: "right",
                  fontWeight: "600",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
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
    </>
  );
}
