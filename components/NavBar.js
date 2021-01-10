import React, { useContext } from 'react';
import Link from 'next/link'
import Cookies from "js-cookie";
import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'

function NavBar() {
  const router = useRouter()
  const { state, dispatch } = useContext(DataContext)
  const { auth, cart } = state

  const isActive = (r) => {
    return r === router.pathname ? ' active' : '';
  }

  const handleLogout = () => {
    Cookies.remove('refreshtoken', {path: 'api/auth/accessToken'})
    localStorage.removeItem('firstLogin')
    dispatch( {type: 'AUTH', payload: {} } )
    dispatch( {type: 'SUCCESS', payload: {success: 'Logged out!'} } )
  }

  const loggedRouter = () => {
    return (
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={auth.user.avatar} alt="User's avatar"
          style={{borderRadius: '50%', width: 30, height: 30, transform: 'translateY(-3px)', marginRight: '3px'}}></img>
          {auth.user.name}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Profile</a>
          <button class="dropdown-item" onClick={handleLogout}>Logout</button>
        </div>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <Link href="/">
        <a className="navbar-brand">
          E-SHOP
        </a>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/cart">
            <a className={"nav-link" + isActive('/cart')}>
              <i className="fas fa-shopping-cart position-relative" aria-hidden="true">
                <span className="position-absolute"
                style={{
                  padding:'3px 6px',
                  background: '#6d143dc2',
                  borderRadius: '50%',
                  top: '-10px',
                  right: '-10px',
                  color: '#fff',
                  fontSize: '14px'
                }}
                >
                  {cart.length}
                </span>
              </i> Cart
              
            </a>
          </Link>
          </li>
          {
            Object.keys(auth).length === 0 ? 
            <li className="nav-item">
            <Link href="/signin">
              <a className={"nav-link" + isActive('/signin')}>
                <i className="fas fa-user-tie" aria-hidden="true"></i>
                Sign-in
              </a>
            </Link>
            </li> : loggedRouter()
          }
        </ul>
      </div>
    </nav>
  )
}
  
export default NavBar