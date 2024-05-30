const express = require('express');
const router = express.Router();
const db = require('../helper/sql');
router.get('/get', (req, res) => {
    async function fetchSparepart() {
        try {
            const query = 'SELECT * FROM sparepart';
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error('gagal mengambil sparepart'));
                    resolve(res);
                });
            });
            res.status(200).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

    fetchSparepart();
});
module.exports = router;
