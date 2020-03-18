const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.listen(PORT, ()=> console.log('server running on PORT '+PORT));