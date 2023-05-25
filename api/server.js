const path = require('path');

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const cookieParser = require('cookie-parser');

const db = require('./app/models');

const app = express();

app.use(express.json());

app.use(cors());

app.use(upload.array());
app.use(express.static('public'));
app.use(cookieParser());

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Ecom Shop API' });
});

const serverRoute = require('./app/routes/router');
app.use('/api/v1', serverRoute);

// handle error request
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({
        message: message,
        success: false,
        data: data,
    });
});

db.mongoose
    .connect(
        `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ecomshopcluster.evimone.mongodb.net/${process.env.DATABASE_NAME}`,
    )
    .then(() => {
        console.log('connect success');
    })
    .catch((err) => {
        console.error('connection error', err);
        process.exit;
    });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
