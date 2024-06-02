import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

interface PokemonData {
  name: string
  url: string
}

interface PokemonDetailData {
  sprites: {
    front_default: string | null
  }
}

const Card: React.FC<{ data: PokemonData }> = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState<PokemonDetailData | null>(null)
  const [isError, setIsError] = useState(false)

  const getPokemonData = useCallback(() => {
    axios
      .get(`${data.url}`)
      .then((res) => {
        setPokemonData(res.data)
        setLoading(false)
        setIsError(false)
      })
      .catch(() => {
        setIsError(true)
        setLoading(false)
      })
  }, [data.url])

  useEffect(() => {
    getPokemonData()
  }, [getPokemonData])

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='w-[200px] h-[120px] flex justify-center items-center bg-gray-400/20 rounded-lg my-2'>
          {pokemonData?.sprites.front_default && (
            <img
              src={pokemonData.sprites.front_default}
              alt='pokemon img'
              className='h-[98px]'
            />
          )}
        </div>
      )}
      {isError && <div>Error loading data.</div>}
    </>
  )
}

export default Card
