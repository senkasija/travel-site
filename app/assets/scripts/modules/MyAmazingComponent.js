import React from 'react'

function MyAmazingComponent() {
  return (
    /**
     * Ovo liči na HTML ali je u stvari jsx, a kada hoćemo da mu dodamo stil, onda pišemo  className.
     * Ispod diva se ne meže pisati, prima sam jedan nivo koda.
     */
    <div>
      <h1 className="section-title section-title--blue">This Is My Amazing React Component</h1>
      <p>React is great!!!</p>
    </div>
  )
}

export default MyAmazingComponent