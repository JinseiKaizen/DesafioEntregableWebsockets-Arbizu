const express = require('express');
const exphbs = require('express-handlebars');
const Products = require('../../productos.json')

module.exports = (app) => {
        app.set('views', './src/views');
        app.use(express.static('public'));

        app.engine('handlebars', exphbs.engine());
        app.set('view engine', 'handlebars');

        app.get('/', (req, res) => {
            res.render('home', { Products })
        });
}