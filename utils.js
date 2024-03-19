const {Client} = require('pg')

async function getClient(){
    const client = new Client("postgres://wubsvppw:qFD2QZPU7SOoXPBKfJebd8bottFNqyQ2@surus.db.elephantsql.com/wubsvppw")
    await client.connect();
    return client;
}

module.exports = {
    getClient
}