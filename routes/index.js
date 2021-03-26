var express = require('express');
var router = express.Router();
var dbcontroller = require('../controllers/db.controller');

var translate = require('./action/traslate');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/buscarPalabra', function (req, res) {
  // console.log(req.query.palabra);
  dbcontroller.cuentaPalabras(req.query.palabra);
  //res.status(200).json({ p: ['perro', 'puerta', 'piso'] });

  if (dbcontroller && dbcontroller.palabra) {
    //console.log("VARIABLE: " + dbcontroller.palabra());
    res.status(200).json({ 
      p: dbcontroller.palabra()
    });
    console.log(dbcontroller.palabra());
  }
  //console.log(res.json(limArray));
});

router.get('/traducir',(req, res) => {
  var palabra = req.query.palabra;
  if (palabra) {
    // console.log(palabra);
    translate.traducir_es_en(palabra, (traducida) => {
      console.log("Traducida: " + traducida);
      // if (res.headersSent) return;
      if (traducida == null) {
        res.status(200).json({wordStatus: "NotFound"});
      } else {
        res.status(200).json({wordStatus: "Found", translated: traducida});
      }
    })
  } else {
    res.status(404).json({wordStatus: "Invalid"});
  }
});

module.exports = router;