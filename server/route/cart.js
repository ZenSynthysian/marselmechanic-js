const db = require('./../helper/sql');
const express = require('express');
const session = require('express-session');
require('dotenv');

const router = express.Router();

router.post('/insert', (req, res) => {
    async function insert() {
        const { idSparepart, user, amount } = req?.body;

        // getting user id
        let id;
        try {
            const query = `select id from accounts where username = '${user}'`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                    if (err) res.status(400).send(`getting user id error: ${err.message || err}`);
                    resolve(result[0]);
                });
            });

            id = data.id;
        } catch (err) {
            if (err) {
                res.status(400).send(`getting user id error: ${err.message || err}`);
            }
        }

        // // insert product

        // get count
        let counter;
        try {
            const query = 'select COUNT(*) as count from carts';
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                    if (err) res.status(400).send(err.message || err);
                    resolve(result[0].count);
                });
            });

            counter = parseInt(data) + 1;
        } catch (err) {
            console.log(err.message || err);
        }

        // validate cart
        let status;
        try {
            const query = `select COUNT(*) as count from carts where id_account = ${id} and id_sparepart = ${idSparepart}`;
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                    if (err) res.status(400).send(err.message || err);
                    resolve(result[0].count);
                });
            });

            status = data;

            if (status > 0) {
                const query = `select amount from carts where id_account = ${id} and id_sparepart = ${idSparepart}`;
                const data = await new Promise((resolve, reject) => {
                    db.query(query, (err, result) => {
                        if (err) res.status(400).send(err.message || err);
                        resolve(result[0].amount);
                    });
                });

                const newAmount = parseInt(amount);

                try {
                    const query = `UPDATE carts SET amount = ${newAmount} WHERE id_account = ${id} and id_sparepart = ${idSparepart}`;
                    const data = await new Promise((resolve, reject) => {
                        db.query(query, (err, result) => {
                            if (err) res.status(400).send(err.message || err);
                            resolve(result);
                        });
                    });

                    res.status(200).send({ updated: true });
                } catch (err) {
                    console.log(err.message || err);
                }
            } else {
                try {
                    const query = `INSERT INTO carts (id, id_account, id_sparepart, amount) VALUES (${counter}, ${id}, ${idSparepart}, ${amount})`;
                    const data = await new Promise((resolve, reject) => {
                        db.query(query, (err, result) => {
                            if (err) res.status(400).send(err.message || err);
                            resolve(result);
                        });
                    });

                    res.status(200).send({ success: true });
                } catch (err) {
                    console.log(err.message || err);
                }
            }
        } catch (err) {
            console.log(err.message || err);
        }
    }

    insert();
});

router.post('/amount/account/get', async (req, res) => {
    try {
        const { idSparepart, user } = req?.body;
        let userId;

        // Get user ID from username
        const userData = await new Promise((resolve, reject) => {
            const query = 'SELECT id FROM accounts WHERE username = ?';
            db.query(query, [user], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });

        if (!(await userData)) {
            return res.status(400).send('User not found');
        }

        userId = userData.id;

        // Get amount from carts
        const cartData = await new Promise((resolve, reject) => {
            const query = `SELECT amount FROM carts WHERE id_sparepart = ? AND id_account = ?`;
            db.query(query, [idSparepart, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });

        // Check if cartData is falsy (i.e., no cart data found for the user)
        if (!cartData) {
            return res.status(200).send('Cart data not found for the user');
        }

        res.status(200).send({ amount: cartData.amount });
    } catch (err) {
        // res.status(500).send(err.message || err);
        console.error(err.message);
    }
});

router.post('/account/getall', async (req, res) => {
    try {
        const { user } = req?.body;
        let userId;

        const userData = await new Promise((resolve, reject) => {
            const query = `SELECT id FROM accounts WHERE username = ?`;
            db.query(query, [user], (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result[0]);
            });
        });

        userId = userData.id;

        const cartData = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM carts WHERE id_account = ?`;
            db.query(query, [userId], (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result);
            });
        });

        res.status(200).send(cartData);
    } catch (err) {
        console.log(err.message || err);
    }
});

router.post('/account/get/value', async (req, res) => {
    try {
        const { user } = req?.body;
        let userId;

        const userData = await new Promise((resolve, reject) => {
            const query = `SELECT id FROM accounts WHERE username = ?`;
            db.query(query, [user], (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result[0]);
            });
        });

        userId = userData.id;

        const cartData = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM carts WHERE id_account = ?`;
            db.query(query, [userId], (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result);
            });
        });

        let productId = [];
        cartData.map((item) => {
            productId.push(item.id_sparepart);
        });

        const getProduct = await new Promise((resolve, reject) => {
            const placeholder = productId.map(() => '?').join(', ');

            const query = `SELECT * FROM sparepart WHERE id IN (${placeholder}) ORDER BY FIELD(id, ${productId.join(', ')})`;
            db.query(query, productId, (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result);
            });
        });

        res.status(200).send(getProduct);
    } catch (err) {
        console.log(err.message || err);
    }
});

router.post('/account/pay', async (req, res) => {
    try {
        const { user, totalHarga, metodePembayaran, nomorKartu, namaDepan, namaBelakang, idCart = null, singleProductId = null } = req?.body;

        const userData = await new Promise((resolve, reject) => {
            const query = `SELECT id FROM accounts WHERE username = ?`;
            db.query(query, [user], (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result[0]);
            });
        });
        const userId = userData.id;

        const cartData = await new Promise((resolve, reject) => {
            const query = `SELECT * FROM carts WHERE id_account = ?`;
            db.query(query, [userId], (err, result) => {
                if (err) res.status(400).send(err.message || err);
                resolve(result);
            });
        });
        const productId = cartData.map((item) => item.id_sparepart);
        const productIdJson = JSON.stringify(productId);
        const dateNow = new Date();

        // check cartId
        if (idCart !== null && singleProductId !== null) {
            const insertData = await new Promise((resolve, reject) => {
                const query = `INSERT INTO history (id_account, products, harga, metode, nomor_kartu, nama_depan, nama_belakang, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                db.query(query, [userId, singleProductId, totalHarga, metodePembayaran, nomorKartu, namaDepan, namaBelakang, dateNow], (err, result) => {
                    if (err) res.status(400).send(err.message || err);
                    resolve(result);
                });
            });
        } else {
            const insertData = await new Promise((resolve, reject) => {
                const query = `INSERT INTO history (id_account, products, harga, metode, nomor_kartu, nama_depan, nama_belakang, tanggal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                db.query(query, [userId, productIdJson, totalHarga, metodePembayaran, nomorKartu, namaDepan, namaBelakang, dateNow], (err, result) => {
                    if (err) res.status(400).send(err.message || err);
                    resolve(result);
                });
            });
        }

        // check if single
        if (idCart !== null) {
            const flushSingleData = await new Promise((resolve, reject) => {
                const query = `DELETE FROM carts WHERE id_account = ? AND id = ?`;
                db.query(query, [userId, idCart], (err, result) => {
                    if (err) res.status(400).send(err.message || err);
                    resolve(result);
                });
            });

            res.status(200).send({ message: 'Pembelian Berhasil' });
        } else {
            const flushData = await new Promise((resolve, reject) => {
                const query = `DELETE FROM carts WHERE id_account = ? AND id_sparepart IN (${productId})`;
                db.query(query, [userId], (err, result) => {
                    if (err) res.status(400).send(err.message || err);
                    resolve(result);
                });
            });

            res.status(200).send({ message: 'Pembelian Berhasil' });
        }
    } catch (err) {
        console.log(err.message || err);
    }
});

module.exports = router;
