const fastify = require('fastify');
const path = require('path');
const fastifyStatic = require('@fastify/static');
const bcrypt = require('bcrypt');

const postgresConnector = require('./db/postgres');

const server = fastify();

// Servește fișierele statice din directorul "public"
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', //prefix URL
});

// Ruta principală care servește pagina de login
server.get('/', (request, reply) => {
  reply.sendFile('login.html'); // Asigură-te că login.html se află în directorul frontend
});

// Ruta pentru crearea utilizatorului
server.post('/create-user', async (request, reply) => {
  const { username, password, email, role } = request.body;

  // Validarea datelor de intrare
  if (!username || !password || !email || role === undefined) {
    return reply.status(400).send({ error: 'All fields are required' });
  }

  try {
    // Verifică dacă utilizatorul există deja
    const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const existingUser = await postgresConnector.execQuery(checkQuery, [username, email]);

    if (existingUser.length > 0) {
      return reply.status(400).send({ error: 'Username or email already exists' });
    }

    // Hash-urarea parolei
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4)';
    await postgresConnector.execQuery(query, [username, hashedPassword, email, role]);
    reply.send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    reply.status(500).send({ error: 'Error creating user' });
  }
});

// Ruta pentru autentificare (GET)
server.get('/login', async (request, reply) => {
  const { username, password } = request.query;

  if (!username || !password) {
    return reply.status(400).send({ error: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await postgresConnector.execQuery(query, [username]);

    if (result.length === 0) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const user = result[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      reply.send({ message: 'Login successful' });
    } else {
      reply.status(401).send({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    reply.status(500).send({ error: 'Error during login' });
  }
});

// Ruta pentru ștergerea utilizatorului
server.delete('/user', async (request, reply) => {
  const { username } = request.body;

  if (!username) {
    return reply.status(400).send({ error: 'Username is required' });
  }

  try {
    const query = 'DELETE FROM users WHERE username = $1';
    const result = await postgresConnector.execQuery(query, [username]);

    if (result.rowCount === 0) {
      return reply.status(404).send({ error: 'User not found' });
    }

    reply.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    reply.status(500).send({ error: 'Error deleting user' });
  }
});

// Endpoint pentru inserarea unui task
server.post('/tasks', async (request, reply) => {
    const { user_id, assigned_to, titlu, continut, deadline, coordonate } = request.body;

    if (!user_id || !assigned_to || !titlu) {
        return reply.status(400).send({ error: 'user_id, assigned_to, and titlu are required' });
    }

    try {
        const query = `
            INSERT INTO tasks (user_id, assigned_to, titlu, continut, deadline, coordonate)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const result = await postgresConnector.execQuery(query, [user_id, assigned_to, titlu, continut, deadline, coordonate]);
        reply.status(201).send(result[0]); // Răspunde cu task-ul creat
    } catch (error) {
        console.error('Error creating task:', error);
        reply.status(500).send({ error: 'Error creating task' });
    }
});

// Endpoint pentru inserarea unui task
server.post('/addtasks', async (request, reply) => {
    const { user_id, assigned_to, titlu, continut, deadline, coordonate } = request.body;

    if (!user_id || !assigned_to || !titlu) {
        return reply.status(400).send({ error: 'user_id, assigned_to, and titlu are required' });
    }

    try {
        const query = `
            INSERT INTO tasks (user_id, assigned_to, titlu, continut, deadline, coordonate)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const result = await postgresConnector.execQuery(query, [user_id, assigned_to, titlu, continut, deadline, coordonate]);
        reply.status(201).send(result[0]); // Răspunde cu task-ul creat
    } catch (error) {
        console.error('Error creating task:', error);
        reply.status(500).send({ error: 'Error creating task' });
    }
});



// Endpoint pentru ștergerea unui task
server.delete('/tasks/:id', async (request, reply) => {
    const { id } = request.params;

    try {
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const result = await postgresConnector.execQuery(query, [id]);

        if (result.rowCount === 0) {
            return reply.status(404).send({ error: 'Task not found' });
        }

        reply.send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        reply.status(500).send({ error: 'Error deleting task' });
    }
});

// Endpoint pentru actualizarea unui task
server.put('/tasks/:id', async (request, reply) => {
    const { id } = request.params;
    const { assigned_to, titlu, continut, deadline, coordonate } = request.body;

    try {
        const query = `
            UPDATE tasks
            SET assigned_to = COALESCE($1, assigned_to),
                titlu = COALESCE($2, titlu),
                continut = COALESCE($3, continut),
                deadline = COALESCE($4, deadline),
                coordonate = COALESCE($5, coordonate)
            WHERE id = $6 RETURNING *`;
        const result = await postgresConnector.execQuery(query, [assigned_to, titlu, continut, deadline, coordonate, id]);

        if (result.rowCount === 0) {
            return reply.status(404).send({ error: 'Task not found' });
        }

        reply.send(result[0]); // Răspunde cu task-ul actualizat
    } catch (error) {
        console.error('Error updating task:', error);
        reply.status(500).send({ error: 'Error updating task' });
    }
});

// Ruta GET pentru /test
server.get('/test', (request, reply) => {
  postgresConnector.connectToDatabase().then((msg)=>{
    reply.send({ message: msg });
  }).catch(()=>{
    reply.send({ message: 'eroare' });
  })
});

server.get('/users', async (request, reply) => {
  try {
      console.log('Cerere primită la /users');
      const results = await postgresConnector.execQuery("SELECT * FROM users;");
      console.log('Utilizatori obținuți:', results);
      reply.send({ users: results });
  } catch (error) {
      console.error('Eroare la obținerea utilizatorilor:', error);
      reply.send({ error: 'Eroare la obținerea utilizatorilor' });
  }
});

// Ruta pentru roluri
server.get('/roles', async (request, reply) => {
  try {
    console.log('Cerere primită la /roles');
    const results = await postgresConnector.execQuery("SELECT * FROM roles;");
    console.log('Roluri obținute:', results);
    reply.send({ roles: results });
  } catch (error) {
    console.error('Eroare la obținerea rolurilor:', error);
    reply.send({ error: 'Eroare la obținerea rolurilor' });
  }
});

// Ruta pentru task-uri
server.get('/tasks', async (request, reply) => {
  try {
    console.log('Cerere primită la /tasks');
    const results = await postgresConnector.execQuery("SELECT * FROM tasks;");
    console.log('Task-uri obținute:', results);
    reply.send({ tasks: results });
  } catch (error) {
    console.error('Eroare la obținerea task-urilor:', error);
    reply.send({ error: 'Eroare la obținerea task-urilor' });
  }
});

// Ruta pentru log-uri
server.get('/logs', async (request, reply) => {
  try {
    console.log('Cerere primită la /logs');
    const results = await postgresConnector.execQuery("SELECT * FROM logs;");
    console.log('Log-uri obținute:', results);
    reply.send({ logs: results });
  } catch (error) {
    console.error('Eroare la obținerea log-urilor:', error);
    reply.send({ error: 'Eroare la obținerea log-urilor' });
  }
});

server.get('/test-db', async (request, reply) => {
  try {
      const result = await postgresConnector.execQuery('SELECT NOW()'); // Testează conexiunea
      reply.send({ time: result[0].now });
  } catch (error) {
      console.error('Eroare la conexiunea cu baza de date:', error);
      reply.send({ error: 'Eroare la conexiunea cu baza de date' });
  }
});


// Ruta POST pentru /test  
server.post('/test', (request, reply) => {

  reply.send({ message: 'OK' });
});

// Ruta PUT pentru /test
server.put('/test', (request, reply) => {

  reply.send({ message: 'OK' });
});

// Ruta DELETE pentru /test
server.delete('/test', (request, reply) => {

  reply.send({ message: 'OK' });
});

// Ruta pentru buton (POST /button)
server.post('/button', (request, reply) => {

  reply.send({ message: "Buton apasat" })
});

server.listen({ port: 3001 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server listening at http://localhost:3001');
});
