const moongose = require('mongoose');
let PersonSchema = new moongose.Schema({ 
    nombre: String,
    edad: Number,                       //Datos requeridos para la base de datos
    tipoSangre: String,
    nss: String
});

module.exports = moongose.model('Persons', PersonSchema);