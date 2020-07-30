import Axios from 'axios'

class ClientArea {
  constructor() {
    this.injectHTML()
    this.form = document.querySelector(".client-area__form"); //Ovde memorišemo šta se dešava u formi: submited...
    this.field = document.querySelector(".client-area__input"); // Ovde memorišemo šta se dešava u polju imput
    this.contentArea = document.querySelector(".client-area__content-area"); // Ovde memorišemo prazan div u kome će se pojaviti poruka o uspehu ili grešci.
    this.events()
  }

  events() { // Ovde se osluškuje da li se dešava neki događaj u formi.
    this.form.addEventListener("submit", e => {
      e.preventDefault(); // OVde sprečavamo refrešovanje stranice
      this.sendRequest(); // Ako se pritisne submit, šalje se zahtev koji definišemo u donjoj metodi. Možemo izabrati bilo koju reč.
    })
  }
/**
 * Donji kod služi za komunikaciju sa cloud function
 */
  sendRequest() {
    /**
     * Ovde bi išla metoda fetch, ali autor voli Axios
     * Axios.post metod obezbeđuje obećanje. Suština obećanja je da ne znamo koliko će trajati izvršavanje, ali na kraju mora da rezultuje ili uspehom ili neuspehom, ili čekanjem na kraju krajeva.
     * U then ide opcija sa uspehom, a u catch sa neuspehom.
     * Prima dva argumenta: url u kome šaljemo zahtev, a drugi je objekat u kome je jedan property password sa vrednošću koju ukuca korisnik. Ovaj drugi properti je dakle JS koji se tokom slanja parsira u JSON
     * ne može se testirati lokalno, ali u lekciji ima uputstvo
     */
    Axios.post('https://vibrant-mcnulty-a86518.netlify.app/.netlify/functions/secret-area', {password: this.field.value}).then(response => {
      this.form.remove();//ako je tačan rezultat briše formu i unosi tekst koji smo ppripremili za uspešan scenario
      this.contentArea.innerHTML = response.data//ovo je vrednost kojom odgovara cloud function: dobrodošli u tajnu oblast i data je rezervisan reč koliko vidim. To je onaj tekst u HTMLU.
    }).catch(() => {
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`
      this.field.value = ''//briše automatski netačan unos tako da ne moramo pritiskati backspace
      this.field.focus()//ostavlja ga u fokusu
    })
  }
//The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
//
  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="client-area">
      <div class="wrapper wrapper--medium">
        <h2 class="section-title section-title--blue">Secret Client Area</h2>
        <form class="client-area__form" action="">
          <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
          <button class="btn btn--orange">Submit</button>
        </form>
        <div class="client-area__content-area"></div>
      </div>
    </div>
    `)
  }
}

export default ClientArea