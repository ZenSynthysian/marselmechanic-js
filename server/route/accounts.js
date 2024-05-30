const express = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('../helper/sql');
const crypto = require('crypto');

const router = express.Router();

// create a hash secret key
const secretKey = crypto.randomBytes(32).toString('hex');
const hashedSecretKey = crypto.createHash('sha256').update(secretKey).digest('hex');

// create a session
router.use(
    session({
        secret: hashedSecretKey,
        resave: false,
        saveUninitialized: false,
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

router.post('/login', (req, res) => {
    async function login() {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ error: 'Missing username or password' });
            }

            const query = `SELECT * FROM accounts WHERE (username = '${username}' OR email='${username}') AND password = '${password}'`;
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, response) => {
                    if (err) {
                        reject(new Error('Fail to fetch accounts'));
                    } else {
                        if (!response[0]) {
                            res.status(400).json({ error: 'Invalid username or password' });
                        }

                        req.session.user = { username: username };
                        resolve(response);
                    }
                });
            });

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
        res.status(200).json({ isLoggedIn: true });
    } else {
        res.status(200).json({ isLoggedIn: false });
    }
});

module.exports = router;
