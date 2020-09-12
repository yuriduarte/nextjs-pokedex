import React from 'react'

export default function Pokemon({ pokemon }) {
  return (
    <div>
      <h1>{pokemon.species.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.species.name}/>
    </div>
  )
}

// This function gets called at build time
// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: {
//           id: '1'
//         }
//       },
//       {
//         params: {
//           id: '2'
//         }
//       },
//       {
//         params: {
//           id: '3'
//         }
//       },
//     ],
//     fallback: false
//   }
// }

// This function gets called at build time
export async function getStaticPaths() {
   // Call an external API endpoint to get posts
  const response = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
  const objecResponse = await response.json()
  const pokemons = objecResponse.pokemon_entries;  

  // Get the paths we want to pre-render based on posts
  const paths = pokemons.map((poke) => ({
    
    params: { id: poke.entry_number.toString() },
  }))

  return { paths, fallback: false }
}

// Isso também é chamado no momento da construção
export async function getStaticProps({ params }) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  .then((respostaDoServer) => {
    if(respostaDoServer.ok) {
      return respostaDoServer.json();
    }

    throw new Error('Deu problema.')
  })
  .then((respostaEmObjeto) => {
    return respostaEmObjeto;
  })

  return { 
    props: {
      pokemon
    } 
  }
}
