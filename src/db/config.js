const { DocumentStore } = require('ravendb');
const { CreateDatabaseOperation } = require('ravendb');

const serverUrl = 'http://127.0.0.1:1000';
const databaseName = 'CalendárioDeEventos';

const documentStore = new DocumentStore([serverUrl], databaseName);

documentStore.initialize();


// try {
//     const databaseRecord = { databaseName };
//     const createDatabaseOperation = new CreateDatabaseOperation(databaseRecord);

//     documentStore.maintenance.server.send(createDatabaseOperation);
// } catch (err) {
//     if (err.name === 'Database Already Exists') {
//     }
// }

module.exports = { documentStore };
                                                                                                
