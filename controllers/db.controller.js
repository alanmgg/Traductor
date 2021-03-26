const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'traduser',
    password: 'traduser',
    database: 'traddb',
    port: '5432'
});

console.log('Conectado a la base de datos...');

var arreglo = [];
var traduccion = [];
var id = [];
var express = require('express');
var router = express.Router();

var limArray = [];

const getWord = async (tipoPalabra) => {
    //const response = await pool.query('SELECT * FROM es_en');
    
    const response = await pool.query(`SELECT DISTINCT(p_es) FROM es_en WHERE p_es like '` + tipoPalabra + `%' LIMIT 10`);

    var contador = response.rows.length;

    for (var i = 0; i < contador; i++) {
        arreglo.push(response.rows[i].p_es);
        id.push(response.rows[i].id);
    }

};

const getTrad = async (tipoPalabra) => {
    const response = await pool.query(`SELECT p_en FROM es_en WHERE p_es LIKE '` + tipoPalabra + `'`);
    
    var contador = response.rows.length;

    for (var i = 0; i < contador; i++) {
        arreglo.push(response.rows[i].p_en);
    }
};

module.exports = {
    cuentaPalabras: async (tipoPalabra) => {
        limArray = [];
        limArraydos = [];
        limTrad = [];

        console.log("LA PALABRA POR JQUERY:" + tipoPalabra);

        //arreglo = [];
        await getWord(tipoPalabra);
        //console.log(arreglo);
    }

    // traducir: async (tipoPalabra) => {
    //     var limTrad = [];
        
    //     getTrad(tipoPalabra);

    //     var cont = 0;
    //     await arreglo.forEach(item => {
    //             if (cont < arreglo.length) {
    //                 console.log(item);
    //                 limTrad.push(item);
    //             }
    //             cont++;
    //     });
    // }
};

module.exports.palabra = function () {
    return arreglo;
}

// module.exports.traduccion = function () {
//     return traduccion;
// }

// module.exports.trad = function () {
//     return limTrad;
// }

//SELECT DISTINCT(p_es) FROM es_en WHERE p_es like 'viej%' LIMIT 10
//SELECT p_en FROM es_en WHERE p_es LIKE 'viejo'