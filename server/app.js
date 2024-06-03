const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3001;
app.use(
    cors({
        origin: `${process.env.CLIENT_API}`,
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rest/api/spareparts', require('./route/sparepart'));
app.use('/rest/api/accounts', require('./route/accounts'));

app.listen(port, () => {
    console.log('listening on port ' + port);
});
