const express = require('express');
const path = require('path');
const { engine } = require('express-edge');
const antibot = require('./app/middleware/antibot');
const app = new express();
const port = process.env.PORT || 3000;

// Bot Detection Middlewares
app.use(antibot);

// Middlewares
app.use(express.static(path.join(`${__dirname}/public`)));
app.use(express.urlencoded({ extended: true }));

// Template Engine
app.use(engine);
app.set('views', path.join(`${__dirname}/views`));

// Routes
const router = require('./app/routers/router');
app.use('/', router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
