
import "../styles/styles.css"//uvezijemo App sa fajlom za stilove i on će biti bandlovan
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll"; //uvozimo modul koji je zadužen za efekte prilikom skrolovanja


new RevealOnScroll(document.querySelectorAll(".feature-item"), 75); 
//ovde kreiramo objekat koja će biti korišćen prilikom skrolovanja
// u slučaju ovakvog kreiranja objekta, unećemo parametre u konstruktor els for elements tako da će querySelectorAll biti parametar
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
// ovo je kod koji reguliše da se osvežava stranica on the fly uz pomoć webpack-dev-servera
//drugi parametar je procenat prozora koji ostaje do mesta gdde je ciljani element, kada će se dati element i pojaviti

let mobileMenu = new MobileMenu();
// Kreiramo novi objekat kome je prototip klasa MobileMenu

if(module.hot){
    module.hot.accept();
}