import { useEffect, useState, memo } from 'react'
import axios from 'axios'

const Card = ({ data }) => {
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState()
  const [isError, setIsError] = useState(false)

  const getPokemonData = () => {
    axios
      .get(`${data.url}`)
      .then((res) => {
        setPokemonData(res.data)
        setLoading(false)
        setIsError(false)
      })
      .catch(setIsError(true))
  }

  useEffect(() => {
    getPokemonData()
  }, [])

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='w-[200px] h-[120px] flex justify-center items-center bg-gray-400/20 rounded-lg my-2'>
          <img
            src={pokemonData.sprites.front_default}
            alt='pokemon img'
            className='h-[98px]'
          />
        </div>
      )}
    </>
  )
}

export default memo(Card)
