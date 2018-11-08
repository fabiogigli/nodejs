
var readline = require('readline')
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Benvenuto');

//richiesta username e password (non ho fatto nessun controllo sulla lunghezza)
rl.question('Inserire username : ', (answer1) => {
    rl.question('Inserire la password ', (answer2) => {
        rl.close();
        checklogin(answer1,answer2);
    });
});



checklogin = function(user1,pass1){
    var auth = false
    //lettura del file con accessi criptato
    var fs = require('fs')
    var crypto = require('crypto');

    filename = "dati/accessi.txt";

    var content=fs.readFileSync(filename, "utf8");
    var cipher = crypto.createDecipher('aes-256-ecb', "123");
    content = cipher.update(content, 'hex', 'utf8') + cipher.final('utf8');

    if(typeof content !== 'undefined'){
        var id_utente;
        var linea = content.split(";")
        console.log(linea)
        linea.forEach(element => {
            var cred = element.split(",");
            console.log(cred)
            if(cred[0]==user1 && cred[1]== pass1){auth = true; id_utente = user1;}
            });
    
        if(!auth){console.log("credenziali errate")}
        else{
            console.log("login ok")
            var dt = require('./gestioneMerce');
            var merce = dt.caricaMerce();
            var merce_parse = JSON.parse(merce);
            merce_parse.merce.forEach(element => {
                console.log('\x1b[36m%s\x1b[0m',"id = ", element.id);
                console.log("nome = ", element.name);
                console.log("costo = ", element.costo,"\r\n");
            });

            var readline = require('readline')
            var rl1 = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl1.question("premere 1 per aggiungere un prodotto, 2 per modificare un prodotto, 3 per eliminare \r\n", (answer1) => {

            //modifica del prodotto
            if(answer1 == 2){
                rl1.question('inserire id da modificare\r\n', (id_mod) => {
                    console.log(id_mod);          
                    var oggetto_mod = null;
                    merce_parse.merce.forEach(element => {
                        if(element.id == id_mod){
                            oggetto_mod = element;
                            
                        }
                    });

                    if(oggetto_mod == null){console.log("oggetto non trovato\r\n"); rl1.close(); } 
                    else {
                        console.log(oggetto_mod);
                        rl1.question('inserire 1 per nome, 2 per costo,\r\n', (modifica) => {

                            rl1.question('inserire nuovo valore \r\n', (val_nuovo) => {
                                    //modifica del file json(passiamo array,id prodotto, nuovo valore, quale campo mdoficiare)
                                    var merce_mod = modifica_json( merce_parse.merce,id_mod,val_nuovo,modifica);
                                    merce_parse.merce = merce_mod;
                                
                                    dt.salvaModifche(id_utente,id_mod,merce_parse);
                                    rl1.close();
                            });
                        });
                        
                    }
                    
                });    
            }else if(answer1 == 1){ //aggiunta di un prodotto
                rl1.question('inserire id del nuovo prodotto \r\n', (id_nuovo) => {
                    rl1.question('inserire nome del nuovo prodotto \r\n', (nome_nuovo) => {
                        rl1.question('inserire costo del nuovo prodotto \r\n', (costo_nuovo) => {
                            var nuovo_prod = {"id":id_nuovo,"name":nome_nuovo,"costo":costo_nuovo};
                            console.log(nuovo_prod);
                            var json_agg = merce_parse.merce;
                            json_agg.push(nuovo_prod);
                            merce_parse.merce = json_agg;
                            console.log("sad" + json_agg);
                            dt.aggiungiProdotto(id_utente,id_nuovo,merce_parse);
                            rl1.close();

                        });
                    });
                });
                   


            }else if(answer1 == 3){ // elimazione di un prodotto
                rl1.question('inserire id da eliminare \r\n', (id_quest_del) => { 
                    var index = merce_parse.merce.findIndex(p => p.id == id_quest_del);
                    console.log(index);
                    merce_parse.merce.splice(index,1);
                    console.log(merce_parse.merce);  
                    dt.eliminaProdotto(id_utente,id_quest_del,merce_parse);
                    rl1.close();
                });
            }
            else{//casi nel gestiti
                console.log("scelta non valida");
                rl1.close();
            } 
            });
        }
    }
}

modifica_json = function(array,id_prod,val_nuovo,modifica){
    switch (parseInt(modifica)) {
        case 1 :
            array.forEach(element => {
                if(element.id == id_prod){
                    element.name = val_nuovo;
                }
            });
            break;
        case 2 : 
             array.forEach(element => {
                if(element.id == id_prod){
                    element.costo = val_nuovo;
                }
             });
            break;
    }
    return array;
}