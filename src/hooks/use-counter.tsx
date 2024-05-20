import { FC, createContext, useContext, useState } from 'react'

type ButtonProps = {
  children: React.ReactNode
  type: 'increment' | 'decrement'
}

type CounterProps = {
  children: React.ReactNode
  initValue: number
  minimum?: number
  maximum?: number
}

interface CounterComponent extends FC<CounterProps> {
  State: FC
  Button: FC<ButtonProps>
}

type UseCounterReturn = {
  Counter: CounterComponent
}

const compositeContext = createContext({
  counter: 0,
  counterPlus: () => {},
  counterMinus: () => {},
})

const useCounter = (): UseCounterReturn => {
  const State = () => {
    const { counter } = useContext(compositeContext)

    return <p>{counter}</p>
  }

  const Button: FC<ButtonProps> = ({ children, type }) => {
    const { counterPlus, counterMinus } = useContext(compositeContext)

    return (
      <button onClick={type === 'increment' ? counterPlus : counterMinus}>
        {children}
      </button>
    )
  }

  const Counter: CounterComponent = ({
    children,
    initValue,
    minimum,
    maximum,
  }) => {
    const [counter, setCounter] = useState(initValue)

    const counterPlus = () => {
      setCounter((prev: number) => {
        if (maximum === undefined) {
          return prev + 1
        } else {
          return prev < maximum ? prev + 1 : prev
        }
      })
    }

    const counterMinus = () => {
      setCounter((prev: number) => {
        if (minimum === undefined) {
          return prev - 1
        } else {
          return prev > minimum ? prev - 1 : prev
        }
      })
    }

    return (
      <compositeContext.Provider value={{ counter, counterPlus, counterMinus }}>
        {children}
      </compositeContext.Provider>
    )
  }

  Counter.State = State
  Counter.Button = Button

  return { Counter }
}

export default useCounter
