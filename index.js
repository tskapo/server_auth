const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require("./router");
const mongoose = require('mongoose');

// მონაცემთა ბაზის გამართვა
mongoose.connect('mongodb://localhost:auth/auth');

// აპლიკაციის გამართვა
app.use(morgan('combined'));
app.use(bodyParser.json({type : '*/*'}));
router(app);

// სერვერის გამართვა

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port)
console.log("სერვერი გაშვებულია :", port)
