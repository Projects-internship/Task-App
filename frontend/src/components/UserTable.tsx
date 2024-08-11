import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import React from 'react';

const UserTable: React.FC = () => {
  const users = [
    {
      id: 1,
      username: 'ionpopescu',
      email: 'ion.popescu@example.com',
      data_creeare: '2024-01-15',
      rol: 1,
    },
    {
      id: 2,
      username: 'mariaionescu',
      email: 'maria.ionescu@example.com',
      data_creeare: '2024-01-16',
      rol: 2,
    },
    {
      id: 3,
      username: 'georgegeorgescu',
      email: 'george.georgescu@example.com',
      data_creeare: '2024-01-17',
      rol: 2,
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Data Creare</TableCell>
            <TableCell>Rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.data_creeare}</TableCell>
              <TableCell>{user.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
