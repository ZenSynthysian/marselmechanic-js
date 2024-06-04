const db = require('./../helper/sql');
const express = require('express');
const session = require('express-session')
require('dotenv');

const router = express.Router();

router.get('/insert', (req, res) => {
    async function insert(){
        const {idSparepart, user, amount} =  req?.body
        let id;
        // getting user id
        try{
            const query = `select id from accounts where username = '${user}'`
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                    if(err) res.status(400).send(err.message || err);
                    resolve(result[0]);
                })
            })

            id = data.id
        }catch (err) {
            if(err){
                res.status(400).send(err.message || err);
            }
        }
        
        // insert product
        let counter;
        try {
            const query = "select COUNT(*) as count from carts"
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, result) => {
                    if (err) res.status(400).send(err.message || err)
                    resolve(result[0].count)
                })
            })
            
            counter = parseInt(data) + 1
        } catch (err) {
            console.log(err.message || err)
        }

        try{
            const query = `INSERT INTO carts (id, id_accounts, id_sparepart, amount) VALUES ()`
        }catch (err) {
            console.log(err.message || err)
        }
    }

    insert()
})

module.exports = router