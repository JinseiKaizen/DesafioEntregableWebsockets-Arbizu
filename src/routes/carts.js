const { Router } = require('express');
const cartsController = require('../components/cart/cartController/cartController')
const bodyParser = require("body-parser");


module.exports = app => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    let router = new Router();

    app.use('/api/carts', router);
    
    router.get('/', cartsController.getAllCarts);
    router.post('/', cartsController.createCart);
    router.get('/:cid', cartsController.products);
    router.post('/:cid/product/:pid', cartsController.addProduct);
}
