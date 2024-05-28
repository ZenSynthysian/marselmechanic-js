const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());

app.use('/rest/api/spareparts', require('./route/sparepart'));
app.use('/rest/api/accounts', require('./route/accounts'));

app.listen(port, () => {
    console.log('listening on port ' + port);
});
