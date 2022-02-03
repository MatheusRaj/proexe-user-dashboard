import React, { memo } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from 'app/hooks';
import { IUser } from 'interfaces';

import { remove } from '../userSlice';

interface IProps {
  open: boolean;
  handleClose: () => void;
  user: IUser;
}

const DeleteDialog = memo(({ open, handleClose, user }: IProps) => {
  const dispatch = useAppDispatch();

  const deleteUser = (id: number) => {
    dispatch(remove(id));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Do you want to delete this user?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {user?.name} - {user?.username} - {user?.email} - {user?.address?.city}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Dismiss</Button>
          <Button onClick={() => deleteUser(user.id)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default DeleteDialog;
