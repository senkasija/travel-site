
import "../styles/styles.css"//uvezijemo App sa fajlom za stilove i on će biti bandlovan
import "lazysizes";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll"; //uvozimo modul koji je zadužen za efekte prilikom skrolovanja
import StickyHeader from "./modules/StickyHeader"; //uvozimo modul koji je zadužen za sticky header
import ClientArea from "./modules/ClientArea";

// React Related Code Goes Here
import React from 'react'
import ReactDOM from 'react-dom'

// Import React components that we created
import MyAmazingComponent from './modules/MyAmazingComponent';

ReactDOM.render(<MyAmazingComponent />, document.querySelector("#my-react-example"))//metod render aktivira komponentu Reakta: prvi argument ukazuje na komponentu koju ćemo upotrebiti, a druga na mesto gde ćemo je upotrebiti.


new RevealOnScroll(document.querySelectorAll(".feature-item"), 75); 
//ovde kreiramo objekat koja će biti korišćen prilikom skrolovanja
// u slučaju ovakvog kreiranja objekta, unećemo parametre u konstruktor els for elements tako da će querySelectorAll biti parametar
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
// ovo je kod koji reguliše da se osvežava stranica on the fly uz pomoć webpack-dev-servera
//drugi parametar je procenat prozora koji ostaje do mesta gdde je ciljani element, kada će se dati element i pojaviti
new MobileMenu();
// Kreiramo novi objekat kome je prototip klasa MobileMenu
new StickyHeader();
new ClientArea();
/** Kada kreiramo novi objekat u promenljivojj, a kada to ne radimo?
 * Kada znamo da ćemo instanncu koristiti kasnije i želimo da je u varijabli memorišemo, onda koristimo varijablu, kao u slučaju modal
 * Kada želimo da se kod odmah učita, onda nam varijabla  ne traba kao u slučaju objekta StickyHeader i ostala dva objekta
 * Ipak ako je projakt veoma složenn i postoji mogućnosti sudaranja objekata onda treba zadržati varijable, onnstalirati npm event-emiter i staviti ga u zagradu objekta kao parametar
 */

let modal;//ovo je globalna varijabla koja će da zadrži vrednnost instance classe iz x



document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", e => {
        e.preventDefault();
        if(typeof modal == "undefined"){
            //stavljamo u if da bismo izbegli da se iznova učitava JS iz Modal ukoliko je jednom već učitan
            //kad je undefined nije još uvek kreirana instanca pa mu kaže da je kreira
            import(/* webpackChunkName: "modal" */"./modules/Modal").then(x => {//komantarom u zagradi određujemo ime pod kojim ćemo prepoznati bundle.js kad se  učita u Networku
                //x predstavlja fajl koji smo upravo uvezili uspešno i koristimo ga da kreiramo instancu clase Modal
                modal = new x.default();//kreirana instanca, ali da ne bi ostala lokalna izvan funkcije kreiramo let modal
                setTimeout(() => modal.openTheModal(), 20); //ovim kodom dajemo vreme metodu  da se pozove
            }).catch(() => console.log("There was a problem!"));
        } else {
            modal.openTheModal();//metoda koja poziva već postojeći objekat
        }
        /**
         * Ovo vraća PROMISE: Tek kada se učita, a mi ne znamo koliko vremena će trebati da se to uradi, ali kada to uradi možemo modul koristiti kako bismo kreiriali novu instanncu klase.
         * Ovimm obezbeđujemo dve funkcije, than i catch. Koliko god trebalo da se završi učitavanje, mi obezbeđujemo funkciju then koja će se učitati, ili ako se iz  nekog razloga ne učita, mi obezbeđujemo funkciju catch koja će u tom slučaju biti pozvana
         * 
         */
    })
})

if(module.hot){
    module.hot.accept();
}