class MobileMenu {
    constructor() {
        /*
        * Construktor je metoda za inicijalizovanje objekta u klasi
        * ova funkcija se odmah pokreće kada se inicijalizuje objekat
        */
        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".site-header__menu-content");
        this.siteHeader = document.querySelector(".site-header");
        /**Ova varijabla memoriše pozadinu za meni */
        this.events();
      /**
        * U konstruktor unosi samo promenljive koje memorišu vrenodosti DOM elementa
        * napravili smo tri promenljive
        * querySelector vraća samo prvi element u nizu
        * objekat koji nasledi ovu klasu poziva metodu events
        * van konstruktora se pišu metode
         */
    }
    events() {
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
        /**
         * objekat menuIcon čeka događaj i onda vraća funkciju toggleTheMenu;
         * arrow funkcija vraća funkciju toggleTheMenu() - callback 
         */
    }
    toggleTheMenu() {
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        //menuContent ukazuje na stil koji skriva sadržaj vrednošću opacity:
        //toggle dodaje html objektu stil ako nije dodat, a ako jeste onda ga uklanja.
        this.siteHeader.classList.toggle("site-header--is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
        /**
         * The toggle() method toggles between hide() and show() for the selected elements.
         */
    }
}

export default MobileMenu;
//ovo omogućava da se objekat uveze u drugi fajl