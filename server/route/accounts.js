const express = require('express');
const router = express.Router();
const db = require('../helper/sql');
router.get('/get', (req, res) => {
    async function fetchAccounts() {
        try {
            const query = 'SELECT * FROM accounts';
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error('gagal mengambil accounts'));
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
    db.end();
});
module.exports = router;
