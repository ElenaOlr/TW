//cu require includem pachetele folosite in proiect
//o constanta (const) nu isi poate schimba valoarea pe parcursul programului
//var= vizibile doar in functie, nu si in afara
const express = require('express');
const fs = require('fs');
const path = require('path');
const {Client} =require('pg');
const url = require('url');
const sharp = require('sharp');
const serverNetwork = require('ip');
var app = express(); //am creat serverul
app.set("view engine", "ejs");//setez ca motor de template ejs
// __dirname este o variabilă de mediu care vă indică
//calea absolută a directorului care conține fișierul în curs de executare.
console.log("Dirname: ", __dirname);

var requestIp = require('request-ip');
const ejs = require('ejs');
const {exec}= require('child_process');
var serverIp = serverNetwork.address();

//setam datele clentului PostgreSQL
const client = new Client({
    host: 'localhost',
    user: 'olaru',
    password: 'lilieci',
    database: 'db_test',
    port:5432
});
client.connect()



app.get('/resurse/json/galerie.json',function(req,res){
    res.status(403).render("pagini/403");
})
app.use("/resurse", express.static(__dirname+"/resurse")); //setez folderul de resurse ca static, ca sa caute fisierele in el, in urma cererilor

function verificaImagini() {
	var textFisier = fs.readFileSync("resurse/json/galerie.json") //citeste tot fisierul
	var jsi = JSON.parse(textFisier); //am transformat in obiect	
	var caleGalerie = jsi.cale_galerie;
	let vectImagini = []

	for (let im of jsi.imagini) {
		var imVeche = path.join(caleGalerie, im.cale_imagine);
		var ext = path.extname(im.cale_imagine);
		var numeFisier = path.basename(im.cale_imagine, ext)
		let imNoua = path.join(caleGalerie + "/mic/", numeFisier + "mic" + ".webp");
		//console.log(imNoua);
		//vectImagini.push({mare:imVeche, mic:imNoua}); //adauga in vector un element
		var data = new Date();
		var minute = data.getMinutes();
		
		if(vectImagini.length>11)
		break;

		if (im.sfert_ora == "1" && (minute >= 0 && minute <= 15))
			vectImagini.push({ normal: imVeche, small: imNoua, descriere: im.descriere, titlu: im.titlu });
		else
			if (im.sfert_ora == "2" && (minute >= 16 && minute <= 30))
				vectImagini.push({ normal: imVeche, small: imNoua, descriere: im.descriere, titlu: im.titlu });
			else
				if (im.sfert_ora == "3" && (minute >= 31 && minute <= 45))
					vectImagini.push({ normal: imVeche, small: imNoua, descriere: im.descriere, titlu: im.titlu });
				else
					if (im.sfert_ora == "4" && (minute >= 46 && minute <= 59))
						vectImagini.push({ normal: imVeche, small: imNoua, descriere: im.descriere, titlu: im.titlu });

		if (!fs.existsSync(imNoua)) {
			sharp(imVeche)
				.resize(150)
				.toFile(imNoua, function (err) {
					if (err)
						console.log("eroare conversie", imVeche, "->", imNoua, err);
				});
		}
		
		
	}
	//console.log('salut, ', vectImagini);
	return vectImagini;
};

function verificaImaginiAnim(numar_img)
{
	var textFisier = fs.readFileSync("resurse/json/galerie.json") //citeste tot fisierul
	var jsi = JSON.parse(textFisier); //am transformat in obiect	
	var caleGalerie = jsi.cale_galerie;
	let vectImag=[];
	let counter=0;
	for(let im of jsi.imagini)
	{
		var imVeche = path.join(caleGalerie, im.cale_imagine);
		var ext = path.extname(im.cale_imagine);
		var numeFisier = path.basename(im.cale_imagine, ext)
		let imNoua = path.join(caleGalerie + "/mic/", numeFisier + "mic" + ".webp");

		if(counter%2==0){
			vectImag.push({ normal: imVeche, small: imNoua, descriere: im.descriere, titlu: im.titlu });

		}
		counter+=1;
		if (!fs.existsSync(imNoua)) {
			sharp(imVeche)
				.resize(150)
				.toFile(imNoua, function (err) {
					if (err)
						console.log("eroare conversie", imVeche, "->", imNoua, err);
				});
		if(counter==2*numar_img)
		break;
		}
	}
	return vectImag;
};

app.get("*/galerie-animata.css",function(req, res){
    
    /*Atentie modul de rezolvare din acest app.get() este strict pentru a demonstra niste tehnici
    si nu pentru ca ar fi cel mai eficient mod de rezolvare*/
    res.setHeader("Content-Type","text/css");//pregatesc raspunsul de tip css
    let sirScss=fs.readFileSync("./resurse/scss/galerie_animata.scss").toString("utf-8");//citesc scss-ul cs string
	rNr = [2,4,8,16];
	random = rNr[Math.floor(Math.random() * rNr.length)];
    
   console.log('....................');
    //transmit nr de poze
    let rezScss=ejs.render(sirScss,{nrPoze:random});// transmit culoarea catre scss si obtin sirul cu scss-ul compilat
    
    fs.writeFileSync("./temp/galerie-animata.scss",rezScss);//scriu scss-ul intr-un fisier temporar
    exec("sass ./temp/galerie-animata.scss ./temp/galerie-animata.css", (error, stdout, stderr) => {//execut comanda sass (asa cum am executa in cmd sau PowerShell)
        if (error) {
            console.log(`error: ${error.message}`);
            res.end();//termin transmisiunea in caz de eroare
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.end();
            return;
        }
        console.log(`stdout: ${stdout}`);
        //totul a fost bine, trimit fisierul rezultat din compilarea scss
        res.sendFile(path.join(__dirname,"temp/galerie-animata.css"));
    });
    

});

// req este un obiect care conține informatii despre solicitarea HTTP care a generat evenimentul.
//Ca raspuns la cerere, utilizam res pentru a trimite înapoi răspunsul HTTP dorit
// res.render este utilizată pentru a reda o vizualizare și trimite șirul HTML redat către client.
app.get(["/","/index"], function (req, res) {
	var userIp = requestIp.getClientIp(req);
	res.render("pagini/index", { imagini: verificaImagini(), ip:req.ip });
});

app.get("/autocar", function (req, res) {
	nr = [2,4,8,16];
	random = Math.floor(Math.random() * nr.length);
	console.log(nr[random]);
	let vectorAnim=verificaImaginiAnim(nr[random]);
	res.render ("pagini/autocar",{imagini:vectorAnim});
});

app.get("/angajare", function (req, res) {
	var userIp = requestIp.getClientIp(req);
	res.render("pagini/angajare", { imagini: verificaImagini(), ip:req.ip });
});

app.get("/produse",function(req, res){
    let conditie= req.query.tip ?  " and categorie='"+req.query.tip+"'" : "";
	//daca am parametrul tip in cale (tip=cofetarie, de exemplu) adaug conditia pentru a selecta doar produsele de acel tip
    client.query("select id, nume, descriere, categorie, imagine,pret_km,culoare, data_achizitionare, aer_contidionat, caracteristici from autoturisme where 1=1"+conditie, function(err,rez){
        client.query("select unnest(enum_range( null::cat_autoturism)) as categ", function(err,rezCateg){
			//selectez toate valorile posibile din enum-ul categorie
			console.log(err);
            res.render("pagini/produse", {produse:rez.rows, categorii:rezCateg.rows});
            });
        console.log(err);
       
    });

    
});

app.get("/produs/:id_autoturism",function(req, res){
		const rezultat= client.query("select * from autoturisme where id="+req.params.id_autoturism, function(err,rez){
			res.render("pagini/produs", {prod:rez.rows[0]});
		});
	
		
	});

app.get("/*", function (req, res) {
	console.log(req.url);
	res.render("pagini" + req.url + ".ejs", { ip:req.ip }, function (err, rezultatRandare) {

		if (err) {
			if (err.message.includes("Failed to lookup view"))
				res.status(404).render("pagini/404");
				else
					throw err;
		}
		else {
			res.send(rezultatRandare);
		}
	});
});
app.get("/produse",function(req, res){
    let conditie= req.query.tip ?   " and tip_transport='"+req.query.tip+"'" : "";//daca am parametrul tip in cale (tip=cofetarie, de exemplu) adaug conditia pentru a selecta doar produsele de acel tip
    console.log("select id, nume, pret, gramaj, calorii, categorie, imagine from prajituri where 1=1"+conditie);
    client.query("select id, nume, pret, gramaj, calorii, categorie, imagine from prajituri where 1=1"+conditie, function(err,rez){
        console.log(err, rez);
        //console.log(rez.rows);
        client.query("select unnest(enum_range( null::categorie)) as categ", function(err,rezCateg){//selectez toate valorile posibile din enum-ul categ_prajitura

            console.log(rezCateg);
            res.render("pagini/produse", {produse:rez.rows, categorii:rezCateg.rows});//obiectul {a:10,b:20} poarta numele locals in ejs  (locals["a"] sau locals.a)
            });
        
       
    });

    
});


//pagina proprie produsului
app.get("/produs/:id_prajitura",function(req, res){
    console.log(req.params);
    
    const rezultat= client.query("select * from prajituri where id="+req.params.id_prajitura, function(err,rez){
        //console.log(err, rez);
        console.log(rez.rows);
        res.render("pagini/produs", {prod:rez.rows[0]});//obiectul {a:10,b:20} poarta numele locals in ejs  (locals["a"] sau locals.a)
    });

    
});


app.listen(8080);
console.log("A pornit serverul.")