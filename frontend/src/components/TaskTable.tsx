import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import SimpleMap from './SimpleMap';

interface Task {
  id: number;
  titlu: string;
  continut: string;
  deadline: string;
  coordonate?: {
    lat: number;
    lng: number;
  };
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [titlu, setTitlu] = useState('');
  const [continut, setContinut] = useState('');
  const [deadline, setDeadline] = useState('');
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
          titlu,
          continut,
          deadline,
        }),
      });
      fetchTasks(); // Reîncarcă lista de sarcini
      setTitlu('');
      setContinut('');
      setDeadline('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });
      fetchTasks(); // Reîncarcă lista de sarcini
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (taskId) {
      try {
        await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titlu,
            continut,
            deadline,
          }),
        });
        fetchTasks(); // Reîncarcă lista de sarcini
        setTaskId('');
        setTitlu('');
        setContinut('');
        setDeadline('');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  return (
    <Container>
      <SimpleMap tasks={tasks} />
      <form onSubmit={handleCreateTask} style={{ marginBottom: '1rem' }}>
        <TextField
          label='Titlu'
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Continut'
          value={continut}
          onChange={(e) => setContinut(e.target.value)}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='Deadline'
          type='date'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          Create Task
        </Button>
      </form>

      <form onSubmit={handleUpdateTask} style={{ marginBottom: '1rem' }}>
        <TextField
          label='Update Task ID'
          type='number'
          value={taskId}
          onChange={(e) => setTaskId(Number(e.target.value))}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='New Titlu'
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='New Continut'
          value={continut}
          onChange={(e) => setContinut(e.target.value)}
          fullWidth
          margin='normal'
          required
        />
        <TextField
          label='New Deadline'
          type='date'
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          fullWidth
          margin='normal'
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          Update Task
        </Button>
      </form>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titlu</TableCell>
              <TableCell>Continut</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.titlu}</TableCell>
                <TableCell>{task.continut}</TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setTaskId(task.id);
                      setTitlu(task.titlu);
                      setContinut(task.continut);
                      setDeadline(task.deadline);
                    }}
                    style={{ marginLeft: '8px' }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TaskTable;
