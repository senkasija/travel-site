import throttle from 'lodash/throttle';
/* uvozimo throttle funkcionalnost Lodaša, pri čemu koristimo dva argumenta: funkciju koju hoćemo da pokrenemo i a drugi  je koliko milisekundi želimo da čekamo pre nego što se funkcija pokrene*/
import debounce from 'lodash/debounce';
/*  
  * Ovu Lodašovu alatku uvozimo za slučaj da se uradi resize prozora
  * The Debounce technique allow us to “group” multiple sequential calls in a single one.
*/

class RevealOnScroll {
  constructor(els, thresholdPercent) { //ovde unosimo parametre sa stranice App.js
    this.thresholdPercent = thresholdPercent // ova varijabla memoriše drugi parametar tj, procenat vidljivog procenta do trenutka kada će se pojaviti ciljani element
    this.itemsToReveal = els;  //ova varijabla memoriše html element: document.querySelectorAll(".feature-item")
    this.hideInitially();
    //ova funkcija skrivan na početku pojave feture-item i čini ga skrivenim
    this.browserHeight = window.innerHeight;
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
    /**
     * bind je sad metod funkcije throttle koja je u stvari objekat. Njim se vraća kopija funkcije throttle
     * Da bi se pozvala ova kopija funkcije throttle, treba pozvati this.scrollThrottle
     * this je ova klasa RevealOnScroll
     * na taj način se u kopiju funnkcije throttle uvoze propertiji ove klase
    */ 
    //throttle ima dva argumenta: funkciju i vreme
    console.log("Šta je this?");
    console.log(this);
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.scrollThrottle);
        //dodajemo event  scroll na svaki feature-item primenjuje metodu this.scrollThrottle  
    window.addEventListener("resize", debounce(() => {
    console.log("Resize just run");
    this.browserHeight = window.innerHeight;
    }, 333)) //ovde čekamo ovoliko sekundi kad se prestane raditi resizing
  }

  calcCaller() {
    console.log("Scroll function ran")
    this.itemsToReveal.forEach(el => {
      if(el.isRevealed == false){
        this.calculateIfScrolledTo(el);
      }
      //poziva se ova metoda za svaki element niza po jednom
    })
  }

calculateIfScrolledTo(el) {//izračunava gde se element nalazi

  if(window.scrollY + this.browserHeight > el.offsetTop){
    //The offsetTop property returns the top position (in pixels) relative to the top of the offsetParent element.
    console.log("Element was calculated");
    let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;
    // izračunavammo procenat koji vrh ciljanog objekta zauzima u odnosu na visinu prozora
    /**
         * The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
         * el je feature-item - DAKLE, računamo koliko je gorenji levi ugao feature-item udaljena od gornjeg levog ugla ekrana
         * getBoundingClientRect().y - ovo ne radi u Edgu, već treba napisati getBoundingClientRect().top
         * Za uštedu memorije postoji opcija: Intersection Observer - It would allow us to code this feature while using much less computing resources while scrolling. 
    */
    if (scrollPercent < this.thresholdPercent) {
      el.classList.add("reveal-item--is-visible");
      // ako zauzme manje od 75% onda će se pojaviti
      el.isRevealed = true;
      //ukoliko je je true vidljiv je element feature-item
      if (el.isLastItem) {
        window.removeEventListener("scroll", this.scrollThrottle);//kad dođemo do poslednjeg elementa, uklanjamo eventListener;
      }
    }
  }
}

  hideInitially() {
    this.itemsToReveal.forEach(el => {
      el.classList.add("reveal-item");
      //dodaje stil svakom elementu feature-item
      el.isRevealed = false;
      //ukoliko je je false skriven je element feature-item
    })
   this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true; //Ovim kodom dohvatam poslednji element niza feature-item i dajem tom objektu properti isLastItem i vrednost true:
  }
}

export default RevealOnScroll