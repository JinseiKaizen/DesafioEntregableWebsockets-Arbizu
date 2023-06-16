const { Router } = require('express');
const productsController = require('../components/products/productsController/productsController');
const bodyParser = require("body-parser");

module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    let router = new Router();

    app.use('/api/products', router);
    
    router.get('/', productsController.getProducts);
    router.get('/:pid', productsController.getProductById);
    router.post('/', productsController.addProduct);
    router.put('/:pid', productsController.updateProduct);
    router.delete('/:pid', productsController.deleteProduct);
}
