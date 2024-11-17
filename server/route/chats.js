const express = require('express');
const db = require('../helper/sql');
const router = express.Router();
require('dotenv').config();

router.get('/get', (req, res) => {
    try {
        const query = `SELECT * FROM messages`;
        db.query(query, (err, result) => {
            if (err) res.status(400).send(err.message || err);
            res.status(200).send(result);
        });
    } catch (err) {
        console.log(`error on chat get: ${err.message || err}`);
    }
});

router.get('/geteach', (req, res) => {
    try {
        const query = `
            SELECT m.*, p.class, p.tier, a.username
            FROM messages m
            JOIN carts c ON m.id_chat_room = c.chat_room
            JOIN plans p ON c.id_plan = p.id
            JOIN accounts a ON m.sender_id = a.id
            WHERE m.id IN (
                SELECT MAX(id) AS id
                FROM messages
                GROUP BY id_chat_room
            )
        `;

        db.query(query, (err, result) => {
            if (err) {
                res.status(400).send(err.message || err);
                return;
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.log(`Error on chat get: ${err.message || err}`);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/get/:id_chat_room', (req, res) => {
    try {
        const { id_chat_room } = req.params;

        // SQL query to get messages for a specific chat room and include username
        const query = `
            SELECT m.*, a.username
            FROM messages m
            JOIN accounts a ON m.sender_id = a.id
            WHERE m.id_chat_room = ?
        `;

        db.query(query, [id_chat_room], (err, result) => {
            if (err) {
                res.status(400).send(err.message || err);
                return;
            }
            res.status(200).send(result);
        });
    } catch (err) {
        console.log(`Error on chat get: ${err.message || err}`);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    let userId;
    try {
        const { id_chat_room, username_user, message, receiver_id } = req.body;

        // Validate required fields
        if (!id_chat_room || !username_user || !message) {
            return res.status(400).send('Missing required fields');
        }

        // Query to get the sender's user ID from the username
        const query = `SELECT id FROM accounts WHERE username = ?`;
        const result = await new Promise((resolve, reject) => {
            db.query(query, [username_user], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        // Check if user was found
        if (!result || result.length === 0) {
            return res.status(404).send('User not found');
        }

        userId = result[0].id;

        // Insert the message into the 'messages' table
        let insertQuery;
        let params;

        if (receiver_id) {
            // If receiver_id is provided, include it in the query
            insertQuery = `INSERT INTO messages (id_chat_room, sender_id, receiver_id, message) VALUES (?, ?, ?, ?)`;
            params = [id_chat_room, userId, receiver_id, message];
        } else {
            // If no receiver_id, insert without it
            insertQuery = `INSERT INTO messages (id_chat_room, sender_id, message) VALUES (?, ?, ?)`;
            params = [id_chat_room, userId, message];
        }

        // Execute the query to insert the message
        db.query(insertQuery, params, (err, result) => {
            if (err) return res.status(400).send(err.message || err);
            console.log('Message inserted:', result);
            res.status(200).send(result);
        });
    } catch (err) {
        console.log(`Error on chat add: ${err.message || err}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
