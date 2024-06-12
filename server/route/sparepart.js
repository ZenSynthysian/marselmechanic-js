const express = require('express');
const router = express.Router();
const session = require('express-session');
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

router.post('/add', async (req, res) => {
    try {
        const { nama, harga, foto } = req?.body;
        const role = req.session.role;
        if (role === 'admin') {
            const insertData = await new Promise((resolve, reject) => {
                const query = `INSERT INTO sparepart ( nama, harga, foto) VALUES ( ?, ?, ?)`;
                db.query(query, [nama, harga, foto], (err, result) => {
                    if (err) console.log(`err on Sparepart insertData sql query, add: ${err.message || err}`);
                    resolve(result);
                });
            });

            insertData;
            res.status(200).send('Sparepart added');
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(`err on Sparepart, add: ${err.message || err}`);
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { id, nama, harga, foto } = req?.body;
        const role = req.session.role;
        if (role === 'admin') {
            // check product id
            const checkId = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM sparepart WHERE id = ?';
                db.query(query, [id], (err, result) => {
                    if (err) console.log(`err on Sparepart checkId sql query, edit: ${err.message || err}`);
                    resolve(result);
                });
            });
            if (checkId.length === 0) {
                res.status(400).send('Sparepart not found');
                return;
            }

            const editData = await new Promise((resolve, reject) => {
                const query = `UPDATE sparepart SET id = ?, nama = ?, harga = ?, foto = ? WHERE id = ?`;
                db.query(query, [id, nama, harga, foto, req?.body?.id], (err, result) => {
                    if (err) console.log(`err on Sparepart editData sql query, edit: ${err.message || err}`);
                    resolve(result);
                });
            });
            res.status(200).send('Sparepart edited');
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err) {
        console.log(`err on Sparepart, edit: ${err.message || err}`);
    }
});
module.exports = router;
