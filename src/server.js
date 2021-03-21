const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const treasureRouter = require('./routes/treasure.route');
const userRouter = require('./routes/user.route');

// Init express
const app = express();
// Init environment
app.use(helmet());
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
app.use(morgan('tiny'))
app.use(compression());

const port = Number(process.env.PORT || 3331);

app.use('/api/treasure', treasureRouter, userRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`));


module.exports = app;