import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

// POST nuevo carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

// GET carrito por id
router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(id);
    cart ? res.json(cart.products) : res.status(404).json({ error: 'Carrito no encontrado' });
});

// POST agregar producto a carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    updatedCart ? res.json(updatedCart) : res.status(404).json({ error: 'Carrito no encontrado' });
});

export default router;
