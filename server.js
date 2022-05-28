const mongoose = require('mongoose');//Inyección de la dependencia de mongoose
const express = require('express');//"" de express
const personRoutes = require('./routes/persons')//"" del router de person

//Genaración de la app de express/ setear un valor de mongoose
mongoose.Promise = global.Promise;
const app = express();

//Configurar view engine
app.set('view engine', 'ejs');
//Agregar el router y el urluncoded
app.use(express.urlencoded({extended:false}));
app.use(personRoutes);

//Conexión de la base de datos
mongoose.connect(
    `mongodb+srv://nuevo:nuevo1234@cluster0.3vt96.mongodb.net/Datos?retryWrites=true&w=majority`
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully"); //Imprimir en consola cuando se conecte a la base de datos
});

app.listen(3000); //Poner a aescuchar al servidor 