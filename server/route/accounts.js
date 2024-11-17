const express = require('express');
// const cookieParser = require('cookie-parser');
const db = require('../helper/sql');
const router = express.Router();
require('dotenv').config();

router.get('/get/:id', (req, res) => {
    const { id } = req.params;
    async function fetchAccounts() {
        try {
            const query = `SELECT username FROM accounts WHERE id = ${id}`;
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error('Fail to fetch accounts'));
                    resolve(res);
                });
            });
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    fetchAccounts();
});

router.post('/getID', (req, res) => {
    const { nama } = req.body;
    async function fetchAccounts() {
        try {
            const query = `SELECT id FROM accounts WHERE username = '${nama}'`;
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error(err.message));
                    resolve(res);
                });
            });
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    fetchAccounts();
});

router.get('/get', (req, res) => {
    async function fetchAccounts() {
        try {
            const query = 'SELECT * FROM accounts';
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error('Fail to fetch accounts'));
                    resolve(res);
                });
            });
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    fetchAccounts();
});

router.post('/register', (req, res) => {
    async function register() {
        try {
            const { username, email, password } = req.body;
            const role = 'user';
            if (!username || !email || !password) {
                res.status(400).json({ error: 'Missing username, email or password' });
            }

            const checkEmailQuery = `SELECT * FROM accounts WHERE email = '${email}'`;
            const emailData = await new Promise((resolve, reject) => {
                db.query(checkEmailQuery, (err, result) => {
                    if (err) {
                        reject(new Error('Fail to fetch accounts'));
                        res.status(400).send(err.message || err);
                    }
                    resolve(result);
                });
            });
            if (emailData.length > 0) {
                res.status(400).json({ error: 'Email sudah dipakai' });
                return;
            }

            const query = `INSERT INTO accounts ( username, email, password, role) VALUES ( '${username}', '${email}', '${password}', ?)`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, [role], (err, response) => {
                    if (err) {
                        res.status(500).json('gagal register');
                    } else {
                        resolve(response);
                    }
                });
            });
            console.log('register success');
            res.status(200).redirect(`${process.env.CLIENT_API}/login`);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    register();
});

router.post('/login', (req, res) => {
    async function login() {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'Missing username or password' });
            }

            const query = `SELECT * FROM accounts WHERE (username = '${username}' OR email='${username}') AND password = '${password}'`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, response) => {
                    if (err) {
                        reject(new Error('Fail to fetch accounts'));
                    } else {
                        if (!response[0]) {
                            return res.status(200).json({ error: 'Invalid username or password' });
                        }
                        resolve(response);
                    }
                });
            });

            const setStatus = await new Promise((resolve, reject) => {
                db.query(`UPDATE accounts SET status = 1 WHERE username = '${username}'`, (err, result) => {
                    if (err) console.log(`error on accounts for set status = ${err.message || err}`);
                    resolve(result);
                });
            });

            const setRole = await new Promise((resolve, reject) => {
                db.query(`SELECT role FROM accounts WHERE username = '${username}'`, (err, result) => {
                    if (err) console.log(`error on accounts for set role = ${err.message || err}`);
                    resolve(result);
                });
            });

            req.session.role = setRole[0].role;
            req.session.status = true;
            req.session.user = username; // Set session setelah query selesai
            res.status(200).json({ message: 'login successful' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
    login();
});

router.get('/logout', (req, res) => {
    // set status
    if (req.session.user) {
        db.query(`UPDATE accounts SET status = 0 WHERE username = '${req.session.user}'`, (err, result) => {
            if (err) console.log(`error on accounts for logout: ${err.message || err}`);
        });
    }

    req.session.destroy();
    res.status(200).json({ message: 'logged out successfully' });
});

router.get('/isloggedin', (req, res) => {
    if (req.session.user) {
        // res.status(200).json({ isLoggedIn: true });
        res.status(200).json({ isLoggedIn: true, user: req.session.user, status: req.session.status, role: req.session.role });
    } else {
        res.status(200).json({ isLoggedIn: false, user: null, status: false, role: null });
    }
});

router.get('/session', (req, res) => {
    res.status(200).json(req.session);
});

router.get('/online', async (req, res) => {
    try {
        const onlineData = await new Promise((resolve, reject) => {
            const query = `SELECT COUNT(*) as count FROM accounts WHERE status = 1`;
            db.query(query, (err, result) => {
                if (err) res.status(400).send(`error on get online db query: ${err.message || err}`);
                resolve(result);
            });
        });

        res.status(200).send(onlineData);
    } catch (err) {
        console.error(`error on get online: ${err.message || err}`);
    }
});

router.patch('/edit', async (req, res) => {
    try {
        const { username, email, password, role, id } = req.body;
        const userRole = req.session.role;

        if (userRole !== 'admin') return res.status(401).send('Unauthorized');
        const query = `UPDATE accounts SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`;
        const data = await new Promise((resolve, reject) => {
            db.query(query, [username, email, password, role, id], (err, result) => {
                if (err) console.log(`error on update accounts, query: ${err.message || err}`);
                resolve(result);
            });
        });
        res.status(200).send(data);
    } catch (err) {
        console.log(`error on update accounts: ${err.message || err}`);
    }
});

router.post('/delete', async (req, res) => {
    try {
        const role = req.session.role;
        if (role === 'admin') {
            const { idAccount } = req.body;
            const query = `DELETE FROM accounts WHERE id = ?`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, [idAccount], (err, result) => {
                    if (err) console.log(`error on delete accounts, query: ${err.message || err}`);
                    resolve(result);
                });
            });
            return;
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(`error on delete accounts: ${err.message || err}`);
    }
});

router.post('/add', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const userRole = req.session.role;

        if (userRole === 'admin') {
            const query = `INSERT INTO accounts (username, email, password, role) VALUES (?, ?, ?, ?)`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, [username, email, password, role], (err, result) => {
                    if (err) console.log(`error on add accounts, query: ${err.message || err}`);
                    resolve(result);
                });
            });
            res.status(200).send({ message: 'account added' });
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(`error on add accounts: ${err.message || err}`);
    }
});

module.exports = router;
