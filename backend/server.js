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
