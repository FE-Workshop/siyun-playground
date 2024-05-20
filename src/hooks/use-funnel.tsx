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
  setStep: (step: string) => void
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

  Funnel.Step = Step

  return { Funnel, setStep }
}

export default useFunnel
