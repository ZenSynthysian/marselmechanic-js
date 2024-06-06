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

router.get('/get/:limit', (req, res) => {
    async function fetchSparepart() {
        try {
            const query = 'SELECT * FROM sparepart where id < ' + req.params.limit;
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

router.post('/get/some', async (req, res) => {
    try {
        const { id = [] } = req.body;

        const sparepartData = await new Promise((resolve, reject) => {
            const placeholder = id.map(() => '?').join(', ');
            const query = `SELECT * FROM sparepart where id in (${placeholder}) ORDER BY FIELD(id, ${id.join(',')})`;

            db.query(query, id, (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result);
            });
        });

        res.status(200).send(sparepartData);
    } catch (err) {}
});
module.exports = router;
