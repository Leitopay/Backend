import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

// GET all
router.get('/', async (req, res) => {
    res.json(await productManager.getProducts());
});

// GET by id
router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' });
});

// POST
router.post('/', async (req, res) => {
    const product = req.body;
    const newProduct = await productManager.addProduct(product);
    res.status(201).json(newProduct);
});

// PUT
router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const updated = await productManager.updateProduct(id, req.body);
    updated ? res.json(updated) : res.status(404).json({ error: 'Producto no encontrado' });
});

// DELETE
router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const deleted = await productManager.deleteProduct(id);
    deleted ? res.json({ message: 'Producto eliminado' }) : res.status(404).json({ error: 'Producto no encontrado' });
});

export default router;
