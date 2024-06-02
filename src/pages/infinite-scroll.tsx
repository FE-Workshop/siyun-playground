import { useState, useRef, useEffect, useCallback } from 'react'
import axios from 'axios'
import Card from '../components/card'

interface PokemonData {
  name: string
  url: string
}

const ITEM_HEIGHT = 140
const BUFFER = 5

const InfiniteScroll = () => {
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([])
  const [pokemonCount, setPokemonCount] = useState(0)
  const [isError, setIsError] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const getPokemonData = useCallback(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
      .then((res) => {
        setPokemonData((prevData) => [...prevData, ...res.data.results])
        setLoading(false)
        setIsError(false)
      })
      .catch(() => setIsError(true))
  }, [offset])

  const getPokemonTotalCount = useCallback(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon`)
      .then((res) => {
        setPokemonCount(res.data.count)
        setLoading(false)
        setIsError(false)
      })
      .catch(() => setIsError(true))
  }, [])

  useEffect(() => {
    getPokemonTotalCount()
    getPokemonData()
  }, [getPokemonData, getPokemonTotalCount])

  useEffect(() => {
    if (offset > 0) getPokemonData()
  }, [offset, getPokemonData])

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return
    const scrollY = containerRef.current.scrollTop
    setScrollTop(scrollY)
    if (
      scrollY + containerRef.current.clientHeight >=
      containerRef.current.scrollHeight - ITEM_HEIGHT
    ) {
      setOffset((prev) => prev + 20)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER)
  const endIndex = Math.min(
    pokemonCount,
    Math.ceil((scrollTop + window.innerHeight) / ITEM_HEIGHT) + BUFFER
  )

  const visibleItems = pokemonData.slice(startIndex, endIndex)

  return (
    <div
      ref={containerRef}
      className='h-screen overflow-y-auto flex justify-center'
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{ height: pokemonCount * ITEM_HEIGHT, position: 'relative' }}
        >
          {visibleItems.map((data, index) => (
            <div
              key={startIndex + index}
              className='absolute w-full'
              style={{
                top: (startIndex + index) * ITEM_HEIGHT,
              }}
            >
              <Card data={data} />
            </div>
          ))}
        </div>
      )}
      {isError && <div>Error loading data.</div>}
    </div>
  )
}

export default InfiniteScroll
