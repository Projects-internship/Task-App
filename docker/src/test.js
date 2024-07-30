const {
    connectToDatabase,
    checkConnection,
    disconnectFromDatabase,
  } = require('./postgres');
  
  const runTests = async () => {
    await connectToDatabase();
    await checkConnection();
    await disconnectFromDatabase();
  };
  
  runTests();
  