

exports.caricaMerce = function(){
    var fs = require('fs');
    var filename = "dati/merce.json";

    var content=fs.readFileSync(filename, "utf8");
    if(typeof content !== 'undefined'){
    return content;
    }
    
}
//funzione per salvare le modifiche di un prodotto
exports.salvaModifche = function(id_utente,id_merce,json_mod){
    var fs = require('fs');
    
    writeJson(json_mod);

    //cambio il file delle modifiche
    fs.appendFile('dati/modifiche.txt', id_utente + " ha modificato il prodotto " + id_merce +";\r\n", function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}

//funzione per aggiungere prodotto
exports.aggiungiProdotto = function(id_utente,id_merce,json_mod){
    var fs = require('fs');
    
    writeJson(json_mod);

    //cambio il file delle modifiche
    fs.appendFile('dati/modifiche.txt', id_utente + " ha aggiunto il prodotto " + id_merce +";\r\n", function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}

//funzione per eliminare prodotto
exports.eliminaProdotto = function(id_utente,id_merce,json_mod){
    var fs = require('fs');
    
    writeJson(json_mod);

    //cambio il file delle modifiche
    fs.appendFile('dati/modifiche.txt', id_utente + " ha eliminato il prodotto " + id_merce +";\r\n", function (err) {
        if (err) throw err;
        console.log('Updated!');
      });
}

//funzione per modificare il file json con i prodotti
writeJson = function(data){
    var fs = require('fs');
    var fileName = 'dati/merce.json';
    
    fs.writeFile(fileName, JSON.stringify(data), function (err) {
    if (err) return console.log(err);
        console.log(JSON.stringify(data));
        console.log('writing to ' + fileName);
    });
}