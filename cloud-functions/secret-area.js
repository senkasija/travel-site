/*
* Callback funkcija služi da nas obavesti o uspehu našeg zahteva
* U Secret Cntentu možemo da pišemo kod koji niko ne može da vidi
* Zajedno sa slanjem zahteva putem URL-a, mi šaljemo i vrednost koju smo uneli u polje
* Vrednost koju šaljemo pišemo u JASONu i to pišemo u Postmenu: body - raw, a biramo opciju POST, a onda na dnu ekrana vidimo odgovor: a to iz varijable secretContent. Ovako Postmenom simuliramo slanje podataka koje unosi korisnik, i vraćanje odgovora korisniku.
* Parametar event sadrži informacije o zahtevu koji šaljemo. On ekstraktuje podatke koje korisnik šalje.
* Ako event.body postoje onda treba da podatke, koji su uvek u stringu, parsira (pretvori) iz JSONA  u kom one stižu u JS objekt koji je nama potreban.
* A ako nema odgovora, onda je body prazan objekat.
* Ako je user poslao tačne podatke, onda dobija secretContent, a ako nije poruku o grešci 401
* body je sa JS objekat koji se pravi od JSONA

*/
exports.handler = function(event, context, callback) {

    const secretContent = `
    <h3>Welcome To The Secret Area</h3>
    <p>Here we can tell you that the sky is <strong>blue</strong>, and two plus two equals four.</p>
    `
    let body;
  
    if (event.body) {
      body = JSON.parse(event.body)
    } else {
      body = {}
    }
  
    if (body.password == "javascript") {
      callback(null, {
        statusCode: 200,
        body: secretContent
      })
    } else {
      callback(null, {
        statusCode: 401
      })
    }
  
    
  }