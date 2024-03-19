const express = require('express');
const { getClient } = require('./utils');
const {createTable} = require('./schema')

const app = express();
app.use(express.json());

createTable().then(()=>{console.log("new table created")}).catch(e=>console.error(e))

async function registerUser(name, password) {
    const client = await getClient();
    const userValues = [name, password];
    const data = await client.query(`INSERT INTO userDB (name, password) VALUES ($1, $2) RETURNING id`, userValues);
    await client.end();
    return data.rows[0].id;
}

async function getUsers() {
    const client = await getClient();
    const data = await client.query(`SELECT * FROM userDB`);
    await client.end();
    return data.rows.map(user => ({ name: user.name, password: user.password }));
}

app.post('/register', async (req, res) => {
    const { name, password } = req.body;
    try {
        const userId = await registerUser(name, password);
        res.status(200).json({
            msg: `Registration successful with id ${userId}`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-users', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });

