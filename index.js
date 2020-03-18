const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);

app.listen(PORT, ()=> console.log('server running on PORT '+PORT));