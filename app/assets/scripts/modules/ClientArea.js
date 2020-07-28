import Axios from 'axios'

class ClientArea {
  constructor() {
    this.injectHTML()
    this.form = document.querySelector(".client-area__form")
    this.field = document.querySelector(".client-area__input")
    this.contentArea = document.querySelector(".client-area__content-area")
    this.events()
  }

  events() {
    this.form.addEventListener("submit", e => {
      e.preventDefault()
      this.sendRequest()
    })
  }
/**
 * Donji kod služi za komunikaciju sa cloud function
 */
  sendRequest() {
    /**
     * Axios.post metod rezultuje obećanjem. Suština obećanja je da ne znamo koliko će trajati izvršavanje, ali na kraju mora da rezultuje ili uspehom ili neuspehom.
     * U then ideo opcija sa uspehom, a u catch sa neuspehom.
     * Prima dva argumenta: url kome šaljemo zahtev, a drugi je objekat u kome je jedan property password sa vrednošću koju ukuca korisnik.
     * ne može se testirati lokalno, ali u lekciji ima uputstvo
     */
    Axios.post('https://vibrant-mcnulty-a86518.netlify.app/.netlify/functions/secret-area', {password: this.field.value}).then(response => {
      this.form.remove();
      this.contentArea.innerHTML = response.data//ovo je vrednost kojom odgovara cloud function: dobrodošli u tajnu oblast
    }).catch(() => {
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`
      this.field.value = ''//briše automatski netačan unos
      this.field.focus()//ostavlja ga u fokusu
    })
  }

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