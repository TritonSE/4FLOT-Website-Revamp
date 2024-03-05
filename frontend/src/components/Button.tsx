import React from 'react'

type ButtonProps = {
  text: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <a href={link} style={{
      display: 'inline-block',
      width: '167px',
      height: '48px',
      backgroundColor: '#694C97',
      color: 'white',
      textAlign: 'center',
      lineHeight: '48px',
      textDecoration: 'none',
      borderRadius: '4px'
    }}>
      {text}
    </a>
  )
}

export default Button