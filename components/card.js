import React from "react";
import Image from "next/image";
import Link from "next/link";

const Pokemon = ({ pokemon, index }) => {
  const pokeIndex = ("000" + (index + 1)).slice(-3);

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div className="bg-slate-900 rounded p-5 flex flex-col justify-center items-center relative cursor-pointer">
        <span className="z-0 right-3 top-0 text-5xl absolute text-slate-500 font-bold">
          #{pokeIndex}
        </span>
        <Image
          alt={pokemon.name}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`}
          width={150}
          height={150}
        />
        <span className=" uppercase font-semibold tracking-wider text-amber-400">
          {pokemon.name}
        </span>
      </div>
    </Link>
  );
};

export default Pokemon;
