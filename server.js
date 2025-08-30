import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

// Para manejar __dirname con ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Middlewares para recibir JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta para la vista home
app.get('/', (req, res) => {
  res.render('home', { title: 'Lista de Productos' });
});

// Ruta para la vista realtimeproducts
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { title: 'Productos en tiempo real' });
});

// Levantar servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Configuración WebSocket con socket.io
const io = new Server(httpServer);

io.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  // Escuchar y emitir eventos de productos
  socket.on('nuevoProducto', data => {
    console.log('Producto recibido:', data);
    io.emit('actualizarProductos', data); // Actualiza a todos los clientes
  });

  socket.on('eliminarProducto', id => {
    console.log('Producto eliminado:', id);
    io.emit('productoEliminado', id);
  });
});
