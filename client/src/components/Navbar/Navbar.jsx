import React, { useEffect, useState, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'


import logo from '../../assets/logo.png'
import logo1 from '../../assets/icon.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'

import { Icon } from '@iconify/react';

import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()
  var User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

  // search
  const [searchQuery, setSearchQuery] = useState('');
  const users = useSelector((state) => (state.usersReducer))
  const [searchResults, setSearchResults] = useState([]);
  const [resultClicked, setResultClicked] = useState(false);

  useMemo(() => {
    const filteredResults = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchQuery, users]);

  useEffect(() => {
    if (resultClicked) {
      setSearchQuery('');
      setResultClicked(false);
    }
  }, [resultClicked]);


  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/')
    dispatch(setCurrentUser(null))
  }

  useEffect(() => {
    const token = User?.token
    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout()
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  }, [dispatch])

  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      setShowSearchInput(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [showSearchInput, setShowSearchInput] = useState(window.innerWidth >= 768);

  const handleMouseEnter = () => {
    if (window.innerWidth <= 768) {
      setShowSearchInput(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 768 && searchQuery === '') {
      setShowSearchInput(false);
    }
  };


  return (
    <nav className='main-nav'>
      <div className='navbar'>
        <Link to='/' className='nav-item nav-logo'>
          <img src={logo} alt="logo" />
        </Link>

        <Link to='/' className='nav-item nav-logo logo1'>
          <img src={logo1} alt="logo" />
        </Link>


        <Link to='/' className='nav-item nav-btn'>About</Link>
        <Link to='/' className='nav-item nav-btn'>Products</Link>
        <Link to='/' className='nav-item nav-btn'>For Team</Link>
        {
          location.pathname === '/Community' && (
            <Link to='/CreatePost' className='nav-item nav-btn'><Icon icon="ion:create-outline" className='icon-post'/></Link>
          )
        }

        <img src={search} alt="search" width="18px" className='search-icon-H' onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} />

        <form onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave} style={{ display: showSearchInput ? 'block' : 'none' }}>
          <input type="text" placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <img src={search} alt="search" width="18px" className='search-icon' />
          {
            searchQuery !== '' && (
              <div className="search-results">
                {searchResults.map((user) => (
                  <Link key={user._id} to={`/Users/${user._id}`} className="search-result" onClick={() => setResultClicked(true)}>
                    <Avatar backgroundColor='#ffa551' py='3px' px="0px" pz="28px" color="white" borderRadius="50%" fontSize="15px">
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="search-result-name">{user.name}</span>
                  </Link>
                ))}
              </div>
            )
          }
        </form>

        {
          User === null ?
            <Link to='/Auth' className='nav-item nav-links nav2'>Log in</Link> :
            <>
              <Link to={`/Users/${User?.result?._id}`} style={{ textDecoration: "none" }}><Avatar backgroundColor='#009dff' py='5px' px="0px" pz="38px" color="white" borderRadius="50%" fontSize="20px">{User.result.name.charAt(0).toUpperCase()}</Avatar></Link>
              <button className='nav-item nav-links nav2' onClick={handleLogout} >Log out</button>
            </>
        }

      </div>
    </nav>
  )
}

export default Navbar

