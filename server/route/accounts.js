const express = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../helper/sql');
const router = express.Router();
require('dotenv').config();

// create a session
router.use(
    session({
        secret: 'AYAM-TERBANG',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 30 },
    })
);

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
        let counter;

        try {
            const query = `
            SELECT COUNT(*) as count from accounts
        `;

            let dataCount = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error('Fail to fetch accounts'));
                    resolve(res[0].count);
                });
            });
            counter = dataCount;
        } catch (err) {
            console.log(err.message);
        }

        try {
            let id = counter + 1;

            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ error: 'Missing username, email or password' });
            }

            const checkEmailQuery = `SELECT * FROM accounts WHERE email = '${email}'`;
            const emailData = await new Promise((resolve, reject) => {
                db.query(checkEmailQuery, (err, res) => {
                    if (err) reject(new Error('Fail to fetch accounts'));
                    resolve(res);
                });
            });
            if (emailData.length > 0) {
                res.status(400).json({ error: 'Email sudah dipakai' });
                return;
            }

            const query = `INSERT INTO accounts (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${password}')`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, response) => {
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
                            return res.status(400).json({ error: 'Invalid username or password' });
                        }
                        resolve(response);
                    }
                });
            });

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
    req.session.destroy();
    res.status(200).json({ message: 'logged out successfully' });
});

router.get('/isloggedin', (req, res) => {
    if (req.session.user) {
        // res.status(200).json({ isLoggedIn: true });
        res.status(200).json({ isLoggedIn: true, user: req.session.user });
    } else {
        res.status(200).json({ isLoggedIn: false, user: null });
    }
});

router.get('/session', (req, res) => {
    res.status(200).json(req.session);
});

module.exports = router;
