const {getClient} = require('./utils')

async function createTable(){
    const client = await getClient();
    await client.query(`CREATE TABLE IF NOT EXISTS userDB (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`);
    await client.end();

}

module.exports = {
    createTable
}