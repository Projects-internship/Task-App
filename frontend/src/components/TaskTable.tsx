import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Container,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | ''>('');
  const [assignedTo, setAssignedTo] = useState('');
  const [titlu, setTitlu] = useState('');
  const [continut, setContinut] = useState('');
  const [deadline, setDeadline] = useState('');
  const [coordonate, setCoordonate] = useState('');
  const [taskId, setTaskId] = useState<number | ''>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          assigned_to: assignedTo,
          titlu,
          continut,
          deadline,
          coordonate,
        }),
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3001/tasks/${taskId}`, { method: 'DELETE' });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignedTo,
          titlu,
          continut,
          deadline,
          coordonate,
        }),
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleCreateTask} style={{ marginBottom: '1rem' }}>
        <TextField
          label='User ID'
          type='number'
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Assigned To'
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Titlu'
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Continut'
          value={continut}
          onChange={(e) => setContinut(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Deadline'
          type='date'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Coordonate'
          value={coordonate}
          onChange={(e) => setCoordonate(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Create Task
        </Button>
      </form>

      <form onSubmit={handleDeleteTask} style={{ marginBottom: '1rem' }}>
        <TextField
          label='Delete Task'
          type='number'
          value={taskId}
          onChange={(e) => setTaskId(Number(e.target.value))}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='secondary'>
          Delete Task
        </Button>
      </form>

      <form onSubmit={handleUpdateTask} style={{ marginBottom: '1rem' }}>
        <TextField
          label='Update Task'
          type='number'
          value={taskId}
          onChange={(e) => setTaskId(Number(e.target.value))}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Assigned To'
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Titlu'
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Continut'
          value={continut}
          onChange={(e) => setContinut(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Deadline'
          type='date'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label='Coordonate'
          value={coordonate}
          onChange={(e) => setCoordonate(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='secondary'>
          Update Task
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Titlu</TableCell>
              <TableCell>Continut</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Coordonate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.user_id}</TableCell>
                <TableCell>{task.assigned_to}</TableCell>
                <TableCell>{task.titlu}</TableCell>
                <TableCell>{task.continut}</TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell>{task.coordonate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TaskTable;
