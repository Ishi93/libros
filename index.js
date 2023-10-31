const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/biblioteca', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas de api
const bookRoutes = require('./routes/books');
app.use('/api', bookRoutes);

app.use(express.static('public')); 

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
