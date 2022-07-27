import { useState } from 'react';
import Pokemon from '../components/card';
import Layout from '../components/layout/layout';

export default function Home({ initialPokemon }) {
  const [pokemon, setPokemon] = useState (initialPokemon)
  const [offset, setOffset] = useState (0)

  const fetchPokemon = async (url, next) => {
    const response = await fetch(url)
    const nextPokemon = await response.json()

    setOffset(next ? offset + 20 : offset - 20)
    setPokemon(nextPokemon)

  }

  return (
  <Layout title={'PokeDex'}>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
        {pokemon.results.map((monster, index) => (
          <div key={index}>
            <Pokemon key={index} pokemon={monster} index={index + offset}/>
          </div>
        ))}
      </div>

      <div className='flex justify-evenly mt-10 '>
        <button disabled={!pokemon.previous} className='disabled:bg-gray-500 px-5 py-2 bg-slate-900 rounded-lg' onClick={() => fetchPokemon(pokemon.previous, false)}>previous</button>
        <button disabled={!pokemon.next} className='disabled:bg-gray-500 px-5 py-2 bg-slate-900 rounded-lg' onClick={() => fetchPokemon(pokemon.next, true)}>next</button>
      </div>
  </Layout>
  )
}

export async function getStaticProps(context) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/")
  const initialPokemon = await response.json()

  return {
    props: {initialPokemon}
  }
}
