const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./helper/sql');
require('dotenv').config();

const app = express();
const port = 3001;
app.use(
    cors({
        origin: `${process.env.CLIENT_API}`,
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rest/api/spareparts', require('./route/sparepart'));
app.use('/rest/api/accounts', require('./route/accounts'));
app.use('/rest/api/cart', require('./route/cart'));

app.listen(port, () => {
    console.log('listening on port ' + port);
    checkAdmin();
});

// check admin and create if empty
async function checkAdmin() {
    try {
        const query = "SELECT * FROM accounts WHERE role = 'admin'";
        const dataCountAdmin = await new Promise((resolve, reject) => {
            db.query(query, (err, res) => {
                if (err) console.log(`error on check admin: ${err.message || err}`);
                resolve(res);
            });
        });

        if (dataCountAdmin.length === 0) {
            const createAdmin = await new Promise((resolve, reject) => {
                const admin = {
                    username: 'admin',
                    email: 'admin@mail.com',
                    password: 'admin',
                    role: 'admin',
                };
                const query = 'INSERT INTO accounts SET ?';
                db.query(query, admin, (err, res) => {
                    if (err) console.log(`error on insert admin: ${err.message || err}`);
                    resolve(res);
                });
            });
            createAdmin;
        }
    } catch (err) {
        console.log(`error on create admin: ${err.message || err}`);
    }
}
