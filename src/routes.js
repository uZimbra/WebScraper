const express = require('express');

const ScrapingController = require('./controller/ScrapingController')

const routes = express.Router();



routes.get('/', ScrapingController);

module.exports = routes;