import React from 'react'

const Avatar = ({ children, backgroundColor, py, px, pz, color, borderRadius, fontSize, cursor}) => {
  const style = {
    backgroundColor,
    boxSizing: "border-box",
    padding:`${py} ${px}`,
    width:`${pz}`,
    height:`${pz}`,
    color: color || 'black',
    borderRadius,
    fontSize,
    textAlign: "center",
    cursor: cursor || null,
  } 


  return (
    <div style={style}>
      { children }
    </div>
  )
}

export default Avatar
