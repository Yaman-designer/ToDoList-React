import { createContext, useState } from "react";
import MySnackbar from "../MySnackbar";
export const MySnackbarContext = createContext({});
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");

  const handleClick = (message) => {
    setOpen(true);
    setmessage(message);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <MySnackbarContext.Provider value={{ handleClick }}>
      <MySnackbar open={open} handleClose={handleClose} message={message} />

      {children}
    </MySnackbarContext.Provider>
  );
};
