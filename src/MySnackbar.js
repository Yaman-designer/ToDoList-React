import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function MySnackbar({open ,handleClose , message}) {

  return (
    <div>
    
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} style={{direction:"ltr"}}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
