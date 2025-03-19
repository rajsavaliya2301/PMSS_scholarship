import React from 'react'
import Nav from "../assets/nav.svg"
const Navlogo = ({className}) => {
  return (
    <>
        <img src={Nav} alt='Nav' className={` ${className}`}></img>
    </>
  )
}

export default Navlogo