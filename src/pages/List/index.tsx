import React, { memo, useState, useEffect } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Container from 'components/Container';
import { IUser } from 'interfaces';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from 'react-router-dom';

import { getUsers, selectUsers } from '../userSlice';
import DeleteDialog from './DeleteDialog';

const List = memo(() => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userList = useAppSelector(selectUsers);

  const [users, setUsers] = useState<IUser[]>([]);

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [user, setUser] = useState<IUser>({} as IUser);

  const handleClickOpenDelete = (value: IUser) => {
    setUser(value);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    if (!userList.length) {
      dispatch(getUsers()).then(res => {
        setUsers(res.payload as IUser[]);
      });
      return;
    }

    setUsers(userList);
  }, [dispatch, userList]);

  return (
    <Container>
      <Button onClick={() => navigate('/form')}>Add new user</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>City</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IUser) => (
              <TableRow key={user.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {user.name}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell align='center'>
                  <PopupState variant='popover' popupId='demo-popup-menu'>
                    {popupState => (
                      <React.Fragment>
                        <Button variant='text' {...bindTrigger(popupState)}>
                          <MoreVertIcon />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={() => navigate(`/form/${user.id}`)}>Edit</MenuItem>
                          <MenuItem onClick={() => handleClickOpenDelete(user)}>Delete</MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteDialog open={openDelete} handleClose={handleCloseDelete} user={user} />
    </Container>
  );
});

export default List;
