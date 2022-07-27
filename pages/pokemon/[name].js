import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Image from "next/image";
import Home from "../../public/chevron_left.svg";
import Link from "next/link";

const Pokemon = ({ pokemon, index }) => {
  const pokeIndex = ("000" + pokemon.id).slice(-3);
  const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  const renderStats = () =>
    pokemon.stats.map((stat, index) => (
      <div
        key={index}
        className="bg-slate-700 my-2 rounded p-1 px-2 flex"
        width="100%"
      >
        {stat.stat.name}
        <div
          className="bg-amber-600 rounded mx-2 px-2"
          style={{ width: `${stat.base_stat}%` }}
        >
          {stat.base_stat}
        </div>
      </div>
    ));

  const renderAbility = () =>
    pokemon.abilities.map((ability) => (
      <li
        key={ability.slot}
        className="px-2 py-1 bg-slate-700 rounded capitalize w-1/2"
      >
        {ability.ability.name}
      </li>
    ));
  const renderTypes = () =>
    pokemon.types.map((type) => (
      <li
        key={type.slot}
        className="px-2 py-1 bg-slate-700 rounded capitalize w-1/2"
      >
        {type.type.name}
      </li>
    ));

  return (
    <Layout title={pokeName}>
      <div className="mt-8 ">
        <button className="bg-amber-600 rounded-full">
          <Link href="/">
            <Image src={Home} width={55} alt="goHome" />
          </Link>
        </button>
        <div className="flex justify-center items-center ">
          <span
            className={`absolute text-slate-800 sm:text-[200px] md:text-[300px] lg:text[400px]  font-bold`}
          >
            #{pokeIndex}
          </span>
          <div className="sm:w-48 lg:w-auto">
            <Image
              alt={pokeName}
              width={400}
              height={400}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 text-xl w-auto bg-slate-900 p-5 rounded sm:my-8 md:my-14 lg:mt-auto">
          <h1 className="md:py-10 sm:py-4">
            Height <br /> <h3 className="pt-2 text-2xl">{pokemon.height}</h3>
          </h1>
          <h1 className="md:py-10 sm:py-4">
            Weight <br /> <h3 className="pt-2 text-2xl">{pokemon.weight}</h3>
          </h1>
          <h1>
            Ability <br />
            <ul className="flex flex-col gap-5 rounded py-4 ">
              {renderAbility()}
            </ul>
          </h1>
          <h1>
            Nature <br />
            <ul className="flex flex-col gap-5 rounded py-4">
              {renderTypes()}
            </ul>
          </h1>
        </div>
        <div className="bg-slate-900 p-5 rounded">
          <h1 className="text-center py-4 text-3xl font-semibold text-amber-400">
            Statistics
          </h1>
          <div>{renderStats()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Pokemon;

export async function getServerSideProps(context) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  );
  const pokemon = await response.json();

  return {
    props: { pokemon },
  };
}
