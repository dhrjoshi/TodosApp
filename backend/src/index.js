const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const connect = require('./config/database');

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRoutes = require('./routers/index');
app.use('/api', apiRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
    console.log(`Server started on PORT ${PORT}`);
    await connect();
    console.log('Mongodb Connected');
});