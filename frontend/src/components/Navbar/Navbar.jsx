import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Store } from '../../Store';

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // const signoutHandler = () => {
  //   window.location.href = '/signin';
  // };

  const popupHandle = () => {
    setPopupOpen(!isPopupOpen);
  };

  const signoutHandler = () => {
    popupHandle();
    toast.success('Sign out Successfully', {
      position: 'bottom-right',
    });

    ctxDispatch({ type: 'EMP_SIGNOUT' });
    localStorage.removeItem('userInfo');
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to Logout?</p>
            <div className="popup-buttons">
              <button className="popup-button verify" onClick={signoutHandler}>
                YES
              </button>
              <button className="popup-button cancel" onClick={popupHandle}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="navbar-brand">
        {/* <span className="logo">Logo</span> */}
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          {userInfo ? (
            <div className="dropdown1" ref={dropdownRef}>
              <span>
                Welcome,{' '}
                <span className="text-success pt-3">{userInfo.name}</span>
                &nbsp;
              </span>
              <img
                src={userInfo.profileImage}
                alt={userInfo.name}
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="dropdown-menu1">
                  <Link to="" className="dropdown-item1">
                    {userInfo.email}
                  </Link>
                  <Link to="/profile" className="dropdown-item1">
                    Profile
                  </Link>
                  <Link onClick={popupHandle} className="dropdown-item1">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to={'/signin'}>Sing in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
