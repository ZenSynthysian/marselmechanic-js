const express = require('express');
const db = require('../helper/sql');
const router = express.Router();
require('dotenv').config();

router.get('/get', (req, res) => {
    try {
        async function fetchPlans() {
            const query = 'SELECT * FROM plans';
            let data = await new Promise((resolve, reject) => {
                db.query(query, (err, res) => {
                    if (err) reject(new Error('Fail to fetch plans'));
                    resolve(res);
                });
            });
            res.status(200).send(data);
        }
        fetchPlans();
    } catch (error) {
        console.log(error);
    }
});

router.post('/add', (req, res) => {
    try {
        async function addPlan() {
            const { classes, classTier } = req.body;
            const query = 'INSERT INTO plans (class, tier) VALUES (?, ?)';
            let data = await new Promise((resolve, reject) => {
                db.query(query, [classes, classTier], (err, res) => {
                    if (err) console.log(err.message || err);
                    resolve(res);
                });
            });
        }
        addPlan();
        res.status(200).send('Plan added');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
