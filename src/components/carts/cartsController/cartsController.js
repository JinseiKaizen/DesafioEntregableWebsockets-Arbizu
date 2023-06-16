const CartService = require('../cartService/cartService');

class CartController {

    getAllCarts(req, res) {
        try {
            res.send(CartService.getAllCarts());
        } catch (error) {
            res.status(500).send('Error al obtener los carritos.');
        }
    }

    async createCart(req, res) {
        try {
            const { products } = req.body;

            const newCart = await CartService.createCart(products);

            res.json(newCart);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear carrito' });
        }
    }

    async products(req, res) {
        try {
            const cartId = parseInt(req.params.cid);

            const products = await CartService.getProducts(cartId);

            res.json(products);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async addProduct(req, res) {
        try {
            const cartId = parseInt(req.params.cid);
            const productId = parseInt(req.params.pid);

            const { products } = req.body;

            const cart = await CartService.addProduct(cartId, productId, products);

            res.json(cart);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new CartController();