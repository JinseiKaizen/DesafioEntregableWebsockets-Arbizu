const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, 'carrito.json');

class CartService {
    constructor() {
        this.carritos = [];
        this.path = FILE;

        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, '[]');
        }

        try {
            this.carritos = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        } catch (error) {
            this.carritos = [];
        }

        CartService.id = this.carritos.reduce((prev, curr) => (
            curr.id >= prev ? curr.id : prev
        ), 0);
    }

    getAllCarts(){
        try{
            return this.carritos;
        }catch(error) {
            console.log(error);
        }
    }

    async createCart() {
        try {
            const id = ++CartService.id;
            const newCart = {
                id,
                products: []
            };
    
            this.carritos.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2));
        } catch (error) {
            console.log(`[ERROR] -> ${error}`);
        }
    }
    

    async getProducts(cartId) {
        try {
            const cart = this.carritos.find(cart => cart.id === cartId);

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            return cart.products;
        } catch (error) {
            console.log(`[ERROR] -> ${error}`);
        }
    }

    async addProduct(cartId, productId) {
        try {
            const selectedCartIndex = this.carritos.findIndex(cart => cart.id === cartId);

            if (selectedCartIndex === -1) {
                throw new Error('Carrito no encontrado');
            }

            const selectedCart = this.carritos[selectedCartIndex];

            const selectedProduct = selectedCart.products.find(cart => cart.product === productId);


            if (selectedProduct) {
                selectedProduct.quantity += 1;
                console.log(selectedProduct)
            }else{
                    selectedCart.products.push({ product: productId, quantity: 1 });
            }
                this.carritos[selectedCartIndex] = selectedCart;
                await fs.promises.writeFile(this.path, JSON.stringify(this.carritos, null, 2));
        } catch (error) {
            console.log(`[ERROR] -> ${error}`);
        }
    }
}

const cartService = new CartService();

module.exports = cartService;