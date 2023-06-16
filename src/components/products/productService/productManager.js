const fs = require('fs');
const FILE = './productos.json';

class ProductManager {
    static id = 0;

    constructor() {
        this.props = ['title', 'description', 'price', 'code', 'stock'];
        this.path = FILE;
        try {
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        } catch (error) {
            this.products = [];
        }
        ProductManager.id = this.products.reduce((prev, curr) => (
            curr.id >= prev ? curr.id : prev
        ), 0);
    }

    async getProducts() {
        try {
            return this.products;
        } catch (error) {
            console.log(error);
        }
    }

    isValidateCode(product) {
        return this.products.some(item => item.code === product.code);
    }

    async addProduct(product) {
        try {
            for (let prop of this.props) {
                if (!product.hasOwnProperty(prop) || this.isValidateCode(product)) {
                    return 'Producto inválido!';
                }
            }

            const id = ++ProductManager.id;
            const newProduct = {
                id,
                status: true,
                thumbnails: [],
                ...product
            };

            this.products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const product = this.products.find(product => product.id === id);
            return product ?? 'Producto no encontrado';
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, field, newValue) {
        try {
            const product = this.products.find(product => product.id === id);
            if (product) {
                product[field] = newValue;
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            this.products = this.products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.log(error);
        }
    }
}

const productManager = new ProductManager();

module.exports = productManager;

(async () => {
    await productManager.addProduct({
        title: 'pen',
        description: 'this is a pen',
        price: 200,
        code: '1800',
        stock: 5,
        thumbnails: ['imagen.jpg']
    });

    await productManager.addProduct({
        title: 'pencil',
        description: 'this is a pencil',
        price: 200,
        code: '1850',
        stock: 5,
        thumbnails: ['imagen.jpg']
    });

    await productManager.addProduct({
        title: 'stencil',
        description: 'this is a stencil',
        price: 200,
        code: '1500',
        stock: 5,
        thumbnails: ['imagen.jpg']
    });
})();