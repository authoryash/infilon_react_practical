import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserList } from './redux/actions';
import DeleteModal from './components/deleteModal';
import { DELETE_USER_DETAILS, EDIT_USER_DETAILS } from './redux/actiontypes';
import EditModal from './components/editModal';

function App() {
  const users = useSelector((state) => state.users);
  const calledPages = useSelector((state) => state.calledPages);
  const dispatch = useDispatch();
  // const [currentPage] = useState(1);
  const currentPage = 1;
  const [deleteModalStates, setDeleteModalStates] = useState({
    open: false,
    id: null,
  });
  const [editModalStates, setEditModalStates] =
    useState({
      open: false,
      data: null,
    });

  useEffect(() => {
    if (!calledPages.has(currentPage)) {
      dispatch(fetchUserList(currentPage));
    }
  }, [dispatch, currentPage, calledPages]);

  return (
    <Container maxWidth="lg" style={{ marginTop: '30px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.first_name}</TableCell>
                  <TableCell align="center">{user.last_name}</TableCell>
                  <TableCell align="center">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name}-${user.last_name}`}
                      width={50}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setEditModalStates({ open: true, data: user });
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() =>
                        setDeleteModalStates({ open: true, id: user.id })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="subtitle1" color="textSecondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        {...deleteModalStates}
        onClose={() => setDeleteModalStates({ open: false, id: null })}
        onConfirm={() =>
          dispatch({ type: DELETE_USER_DETAILS, payload: deleteModalStates.id })
        }
      />
      <EditModal
        {...editModalStates}
        onClose={() =>
          setEditModalStates({
            open: false,
            data: null,
          })
        }
        onSubmit={(data) => {
          dispatch({ type: EDIT_USER_DETAILS, payload: data });
          setEditModalStates({ open: false, data: null });
        }}
      />
    </Container>
  );
}

export default App;
