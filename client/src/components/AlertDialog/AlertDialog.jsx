import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({open, setOpen, title, message, yes, no, onYes, onNo}) {

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title.length ?
            <DialogTitle id="alert-dialog-title">
             {title}
            </DialogTitle> : <></>
        }
        {message.length ?
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent> : <></>
        }
        <DialogActions>
          <Button onClick={onNo}>{no}</Button>
          <Button onClick={onYes}>{yes}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}