const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // numele serviciului PostgreSQL definit în docker-compose.yml
  database: 'practica',
  password: 'postgres',
  port: 5432,
});

const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
    return 'Connected to the database.';
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};

//const execQuery = async (query:String, params:Array)

const execQuery = async (query, params) => {
  const client = await pool.connect();
  try {
      console.log('Executând interogarea:', query, 'cu parametrii:', params);
      const result = await client.query(query, params);
      return result.rows;
  } catch (error) {
      console.error('Eroare la execuția interogării:', error);
      throw error;
  } finally {
      client.release();
  }
};

// Funcție pentru selectarea utilizatorilor
const selectUsers = async (age) => {
  const query = 'SELECT * FROM users WHERE age > $1';
  const params = [age];
  try {
    const res = await execQuery(query, params);
    console.log('Utilizatori selectați:', res.rows); // Afiseaza rezultatele selectiei
  } catch (err) {
    console.error('Eroare la selectarea utilizatorilor:', err);
  }
};

// Funcție pentru inserarea unui utilizator
const insertUser = async (name, age) => {
  const query = 'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *';
  const params = [name, age];
  try {
    const res = await execQuery(query, params);
    console.log('Utilizator inserat:', res.rows[0]); // Afiseaza utilizatorul inserat
  } catch (err) {
    console.error('Eroare la inserarea utilizatorului:', err);
  }
};

// Funcție pentru ștergerea unui utilizator
const deleteUser = async (userId) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const params = [userId];
  try {
    const res = await execQuery(query, params);
    console.log('Utilizator șters:', res.rows[0]); // Afiseaza utilizatorul șters
  } catch (err) {
    console.error('Eroare la ștergerea utilizatorului:', err);
  }
};

// Exemplu de utilizare a funcțiilor
const main = async () => {
  console.log('Selectare utilizatori cu vârsta peste 30 de ani:');
  await selectUsers(30);

  console.log('Inserare nou utilizator:');
  await insertUser('John Doe', 25);

  console.log('Ștergere utilizator cu ID-ul 1:');
  await deleteUser(1); // Înlocuiește cu ID-ul utilizatorului pe care vrei să-l ștergi
};

// main();

module.exports = { execQuery, selectUsers, insertUser, deleteUser };
const checkConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Connection checked at:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Error checking connection:', err);
  }
};

const disconnectFromDatabase = async () => {
  try {
    await pool.end();
    console.log('Disconnected from the database.');
  } catch (err) {
    console.error('Error disconnecting from the database:', err);
  }
};

module.exports = {
  connectToDatabase,
  checkConnection,
  disconnectFromDatabase,
  selectUsers,
  deleteUser,
  insertUser,
  execQuery
};
