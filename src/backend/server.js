'use strict';

const fs = require('fs');
const express = require('express');
const path = require('path');
const config = require('config');


const serverConfig = config.get('server');
const navigationConfig = config.get('navigation');
const pathToWeb = path.join(__dirname, '../../dist');
const indexFile = path.join(pathToWeb, 'index.html');


module.exports = function () {
    const app = express();
    
    app.get('/navigation-config', (req, res) => {
        res.end(JSON.stringify(navigationConfig));
    });
    
    app.use(express.static(pathToWeb), (req, res) => {
        res.sendFile(indexFile);
    });
    
    app.listen(serverConfig.port);
    
    console.log('Server started on localhost', serverConfig.port);
};