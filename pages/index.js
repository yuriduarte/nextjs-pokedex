import { useEffect, useState } from 'react'

export async function getStaticProps(context) {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
  .then((respostaDoServer) => {
    if(respostaDoServer.ok) {
      return respostaDoServer.json();
    }
  })
  .then((respostaEmObjeto) => {
    return respostaEmObjeto.pokemon_entries;
  })

  return {
    props: {
      pokemons
    }, // will be passed to the page component as props
  }
}


export default function Home({ pokemons }) {
  return (
    <>
      <div>
        Pokédex - Yuri Duarte
      </div>

      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.entry_number}>
            {pokemon.pokemon_species.name}
          </li>
        ))}
      </ul>
    </>
  )
}
