
import "../styles/styles.css"//uvezijemo App sa fajlom za stilove i on će biti bandlovan
import MobileMenu from "./modules/MobileMenu";
//import RevealOnScroll from './modules/RevealOnScroll'; //uvozimo modul koji je zadužen za efekte prilikom skrolovanja

let mobileMenu = new MobileMenu();
//Kreiramo novi objekat kome je prototip klasa MobileMenu

//let revealOnScroll = new RevealOnScroll(); //ovde kreiramo objekat koja će biti korišćen prilikom skrolovanja

// ovo je kod koji reguliše da se osvežava stranica on the fly uz pomoć webpack-dev-servera
if(module.hot){
    module.hot.accept();
}