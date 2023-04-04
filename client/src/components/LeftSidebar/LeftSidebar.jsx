import React, { useEffect, useState } from 'react'

import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const LeftSidebar = () => {

  useEffect(() => {
    const handleResize = () => {
      setShowLeftBar(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [showLeftBar, setShowLeftBar] = useState(window.innerWidth > 768);

  const handleMouseEnter = () => {
    if (window.innerWidth <= 768) {
      setShowLeftBar(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768) {
      setShowLeftBar(false);
    }
  };




  return (
    <div className='left-sidebar' style={{ right: showLeftBar ? 'auto' : 'calc(100% - 24px)' }}>

      <FontAwesomeIcon icon={showLeftBar ? faTimes : faBars } className='fa-bars' onClick={showLeftBar ? handleMouseLeave: handleMouseEnter } style={{ fontSize: showLeftBar ? '22px' : '20px',  padding: showLeftBar ? '13px 5% 13px 87%' : '14px 3% 14px 87%'}}/> 

      <nav className="side-nav">
        <NavLink to='/' className='side-nav-links' activeclassname='active'>
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div" activeclassname='active' style={{/* padding: "40px"*/ }}>

          <div><p>PUBLIC</p></div>

          <NavLink to='/Questions' className='side-nav-links' activeclassname='active' style={{ padding: "0px 0px" }}>
            <img style={{ padding: '0px 10px' }} src={Globe} alt="Globe" />
            <p>Questions</p>
          </NavLink>

          <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
            <p>Tags</p>
          </NavLink>

          <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
            <p>Users</p>
          </NavLink>

          <NavLink to='/Community' className='side-nav-links' activeclassname='active' style={{ paddingLeft: "40px" }}>
            <p>Community</p>
          </NavLink>

        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar
