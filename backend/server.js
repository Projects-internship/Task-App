const fastify = require('fastify');
const path = require('path');
const fastifyStatic = require('@fastify/static');

const postgresConnector = require('./db/postgres');

const server = fastify();

// Servește fișierele statice din directorul "public"
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', //prefix URL
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
