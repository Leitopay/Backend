import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();

// Middlewares para recibir JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Levantar servidor
app.listen(8080, () => {
  console.log('Servidor escuchando en puerto 8080');
});
