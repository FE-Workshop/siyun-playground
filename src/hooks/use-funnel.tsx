import { ReactNode, isValidElement, FC, useState } from 'react'

type StepProps = {
  name: string
  children: ReactNode
}

type FunnelProps = {
  children: ReactNode[]
}

interface FunnelComponent extends FC<FunnelProps> {
  Step: FC<StepProps>
}

type UseFunnelReturn = {
  Funnel: FunnelComponent
  onNext: () => void
  onPrev: () => void
}

const useFunnel = (steps: string[]): UseFunnelReturn => {
  const [step, setStep] = useState<string>(steps[0])

  const Step: FC<StepProps> = ({ children }) => {
    return <>{children}</>
  }

  const Funnel: FunnelComponent = ({ children }) => {
    const currentStep = children.find(
      (child: ReactNode) => isValidElement(child) && child.props.name === step
    )
    return <>{currentStep}</>
  }

  const onNext = () => {
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    }
  }

  const onPrev = () => {
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  Funnel.Step = Step

  return { Funnel, onNext, onPrev }
}

export default useFunnel
