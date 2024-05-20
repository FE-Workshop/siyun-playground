type ButtonProps = {
  children: string
  onClick?: () => void
  className?: string
  variant?: 'white'
  width?: string
  disabled?: boolean
}

const Button = ({
  children,
  onClick,
  variant,
  width,
  disabled,
}: ButtonProps) => {
  let buttonStyle: React.CSSProperties = {
    width: width || '360px',
  }

  if (variant === 'white') {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid #E5E5E5',
    }
  } else if (disabled) {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: '#E5E5E5',
      color: 'C9C9C9',
      opacity: 0.5,
      cursor: 'not-allowed',
    }
  } else {
    buttonStyle = {
      ...buttonStyle,
      width: width || '360px',
      backgroundColor: 'black',
      color: 'white',
    }
  }

  return (
    <button
      style={buttonStyle}
      className='h-[60px] rounded-[30px] '
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
