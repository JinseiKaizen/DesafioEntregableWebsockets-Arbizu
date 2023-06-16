const { Router } = require("express")
const cartsController = require("./cartsController/cartsController.js")

module.exports = app => {
    const router = new Router();

    app.use('/api/carts', router);
    router.get('/:cid', cartsController.get);
    router.post('/', cartsController.create);
    router.post('/:cid/product/:pid', cartsController.add);
}