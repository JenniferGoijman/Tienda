const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

const productsRouter = require('./routes/products');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/products', productsRouter);
app.listen(PORT, ()=> console.log('server running on PORT '+PORT));