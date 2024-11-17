const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./helper/sql');
const session = require('express-session');
require('dotenv').config();
const app = express();
const port = 3001;
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

let clients = [];

// Broadcast message to all clients
function broadcast(message) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('A user connected');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        try {
            console.log('Received message:', message);

            // Try to parse the incoming message (expecting JSON)
            const parsedMessage = JSON.parse(message);

            // Log the parsed message
            console.log('Parsed message:', parsedMessage);

            // You can now broadcast the parsed message to all clients as JSON
            // For example, broadcast the same message to all clients
            const response = JSON.stringify({
                sender_id: parsedMessage.sender_id,
                message: parsedMessage.message,
                chatRoomId: parsedMessage.chatRoomId,
                receiverName: parsedMessage.receiverName,
                username: parsedMessage.username,
                timestamp: new Date().toISOString(),
            });

            // Broadcast the message to all connected clients
            broadcast(response);
        } catch (error) {
            console.error('Error parsing message:', error);
            // If parsing fails, send a failure message back to the client
            const errorMessage = JSON.stringify({ error: 'Invalid JSON format' });
            ws.send(errorMessage); // Send an error message to the client
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients = clients.filter((client) => client !== ws);
        console.log('User disconnected');
    });
});

app.use(
    cors({
        origin: `${process.env.CLIENT_API}`,
        credentials: true,
    })
);

// create a session
app.use(
    session({
        secret: 'AYAM-TERBANG',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 30 },
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rest/api/spareparts', require('./route/sparepart'));
app.use('/rest/api/accounts', require('./route/accounts'));
app.use('/rest/api/cart', require('./route/cart'));
app.use('/rest/api/plans', require('./route/plans'));
app.use('/rest/api/chats', require('./route/chats'));

server.listen(port, () => {
    console.log('listening on port ' + port);
    checkAdmin();
});

// check admin and create if empty
async function checkAdmin() {
    try {
        const query = "SELECT * FROM accounts WHERE role = 'admin'";
        const dataCountAdmin = await new Promise((resolve, reject) => {
            db.query(query, (err, res) => {
                if (err) console.log(`error on check admin: ${err.message || err}`);
                resolve(res);
            });
        });

        if (dataCountAdmin.length === 0) {
            const createAdmin = await new Promise((resolve, reject) => {
                const admin = {
                    username: 'admin',
                    email: 'admin@mail.com',
                    password: 'admin',
                    role: 'admin',
                };
                const query = 'INSERT INTO accounts SET ?';
                db.query(query, admin, (err, res) => {
                    if (err) console.log(`error on insert admin: ${err.message || err}`);
                    resolve(res);
                });
            });
            createAdmin;
        }
    } catch (err) {
        console.log(`error on create admin: ${err.message || err}`);
    }
}
