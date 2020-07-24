import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce'
import { isBuffer } from 'lodash';

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header");
    this.pageSections = document.querySelectorAll(".page-section");
    this.browserHeight = window.innerHeight;
    //Dohvatamo stil zadužen za heder
    this.previousScrollY = window.scrollY;
    //ova varijabla memoriše prethodno skrolovanje
    this.events()
  }

  events() {
    window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200));
    /**
     * Koristimo ponovo throttle za optimizaciju memorije prilikom skrolovanja
     */
    window.addEventListener("resize", debounce(() => {
      this.browserHeight = window.innerHeight;
      }, 333)) //ovde čekamo ovoliko sekundi kad se prestane raditi resizing
  }

  runOnScroll() {
    this.determineScrollDirection();
    //određujemo metod koji će se baviti smerom skrolovanja, da li idemo naviše ili naniže
    if (window.scrollY > 60) {
      /**
       * Kada se od samog vrha odmaknemo 60 piksela, da se varijabli siteHeader doda tamniji stil
           */
      this.siteHeader.classList.add("site-header--dark");
    } else {
      this.siteHeader.classList.remove("site-header--dark");
    }

    this.pageSections.forEach(el => this.calcSection(el));
  }

  determineScrollDirection(){
    if(window.scrollY > this.previousScrollY){
      this.scrollDIrection = "down";

    } else {
      this.scrollDIrection = "up";
    }
  }

  calcSection(el){
    if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight){
      /**
       *1. deo uslova gornjih vrednosti kaže da je u viewportu cela sekcija el koja namm treba, a drugi deo sulova je da je visina prozora manja od dna ciljanog objekta el
       */
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
      // izračunavammo procenat koji vrh ciljanog objekta zauzima u odnosu na visinu prozora i na osnovu njega zaključujemo da li je sekcija dovoljno ušla u viewport  kako bismo aktivirali žutu boju linka iz menija
      if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDIrection == "down" || scrollPercent < 33 && this.scrollDIrection == "up"){
        let matchingLink = el.getAttribute("data-matching-link");
        //kao što samo ime kaže getAttribute obezbeđuje atribut elementa iz HTML-a, a ne stil ili vrednost njegovu
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"));
        /**
         * zanimljiva upotreba klasa, čitam: ukini klasu u okviru elementa sa klasom .primary-nav koji ne sadrži clasu a sa atributom: data-matching-link
         */
        document.querySelector(matchingLink).classList.add("is-current-link");
        //dodajemo klasu
      }

    }
  }
}

export default StickyHeader;