const express = require('express'); //Inyección de la dependencia
const router = express.Router();//Instancia del router
const mongoose = require('../node_modules/mongoose');//Inyección de la dependencia de mongoose
let Person = require('../models/person');//Inyección de la dependencia del modelo person

//Ruta 'persons'
router.get('/persons', function(req, res, next){
    Person.find(function(err, persons){
        if(err) return next(err);
        res.render("persons", {'persons': persons});
    })
});
//Ruta para eliminar a una persona de la tabla
router.get('/deletePerson/:id', function(req, res, next){
    Person.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.redirect('/persons');
    })
});

//Ruta para actulizar los datos de la persona
router.get('/findById/:id', function(req, res, next){
    Person.findById(req.params.id, req.body, function(err, person){
        if(err) return next(err);
        res.render('personUpdate', {person});
    })
});

//Ruta para actualizar el documento
router.post('/personUpdate', function(req, res, next){
    Person.findByIdAndUpdate(req.body.objId, {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss}, function(err, post){
            if(err) return next(err);
            res.redirect('/persons')
        });
     });



//Ruta GET parqa renderizar la vista que vamos a enviar los datos de la nueva persona que se agregó en el formulario.
router.get('/person', function (req, res){
    res.render('person');
});

//Ruta GET para acceder a la página principal
router.get('/principal', function (req, res){
    res.render('principal');
});

//Ruta POST para agregar un nuevo documento a la colección
router.post('/addPerson', function(req, res){
   const myPerson = new Person({
       nombre: req.body.nombre,
       edad: req.body.edad,
       tipoSangre: req.body.tipoSangre,
       nss: req.body.nss
    });
    myPerson.save(); //Lo guarda en la base de datos
    res.redirect("./persons") //Redireccionar hacia la lista de personas registradas
});
//Exportar el ruteador
module.exports = router;