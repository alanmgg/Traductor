var fs = require('fs');
var parser = require('xml2json');

var json_Es_En = {};

var letras_Es_En = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

fs.readFile( process.env.DICT_ES_EN, "utf8", function(err, data) {
  if (err) throw err;
  console.log("Archivo leido");
	json_Es_En = parser.toJson(data, {object: true});
  if ( process.env.MODE == "big" ) {
    console.log(json_Es_En.dic.l[1].w.length);

    // for(var i=0; i<json_Es_En.dic.l.length; i++) {
    //   console.log(json_Es_En.dic.l[i].w[0].c.charAt(0));
    // }

  } else {
    console.log(json_Es_En.dic.l.w.length);
    console.log(json_Es_En.dic.l.w[0].c);
    console.log(json_Es_En.dic.l.w[0].d);
    console.log(json_Es_En.dic.l.w[0].t);
  }
});

module.exports = {
  traducir_es_en: function(word, callback) {
    var listaFound = [];
    var found = false;
    var lIndex = -1;
    if ( process.env.MODE == "big" ) {
      var firstLetter = word.charAt(0).toLocaleLowerCase();
      if ( firstLetter == "á" ) firstLetter = "a";
      if ( firstLetter == "é" ) firstLetter = "e";
      if ( firstLetter == "í" ) firstLetter = "i";
      if ( firstLetter == "ó" ) firstLetter = "o";
      if ( firstLetter == "ú" ) firstLetter = "ú";
      if ( firstLetter == "ñ" ) firstLetter = "n";
      if ( firstLetter == "ç" ) firstLetter = "c";
      for(var i=0; i<letras_Es_En.length; i++) {
        if (firstLetter == letras_Es_En[i]) {
          lIndex = i;
          break;
        }
      }
    }

    if ( process.env.MODE == "big" ) {
      (json_Es_En.dic.l[lIndex].w).forEach((item) => {
        // console.log( item.c );
        word = word.toLocaleLowerCase();
        // console.log( ">" + word + "< vs >" + item.c.trim() + "<" );
        if ( word == item.c.trim() ) {
          console.log("Found!");
          found = true;
          listaFound.push(item.d);
          // return callback(item.d);
        }
      });
    } else {
      (json_Es_En.dic.l.w).forEach((item) => {
        // console.log( item.c );
        word = word.toLocaleLowerCase();
        // console.log( ">" + word + "< vs >" + item.c.trim() + "<" );
        if ( word == item.c.trim() ) {
          console.log("Found!");
          found = true;
          listaFound.push(item.d);
          // return callback(item.d);
        }
      });
    }
    if ( found == false ) {
      return callback(null);
    } else {
      return callback(listaFound);
    }
  }
};