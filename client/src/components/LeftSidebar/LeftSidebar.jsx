import React from 'react'

import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'


const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
      <nav className="side-nav">
        <NavLink to='/' className='side-nav-links' activeclassname='active'>
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div" activeclassname='active' style={{/* padding: "40px"*/  }}>

          <div><p>PUBLIC</p></div>

          <NavLink to='/Questions' className='side-nav-links' activeclassname='active' style={{ padding: "0px 0px" }}>
            <img  style={{ padding: '0px 10px' }} src={Globe} alt="Globe" />
            <p>Questions</p>
          </NavLink>

          <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
            <p>Tags</p>
          </NavLink>

          <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
            <p>Users</p>
          </NavLink>

        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar
