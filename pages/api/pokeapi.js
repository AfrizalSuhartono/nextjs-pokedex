export async function getStaticProps () {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {data,}
    }
}