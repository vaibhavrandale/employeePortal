import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Store } from '../../Store';
import { BiLogOut } from 'react-icons/bi';
import { BsFilePerson } from 'react-icons/bs';
import { HiLink } from 'react-icons/hi';
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

  const popupHandle = () => {
    setPopupOpen(!isPopupOpen);
  };

  const signoutHandler = () => {
    popupHandle();
    toast.success('Sign out Successfully');

    ctxDispatch({ type: 'EMP_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <nav className="navbar  ">
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
                welcome,
                <span className="text-dark pt-3 fw-bold typewriter-text">
                  {userInfo.NAME}
                </span>
                &nbsp;
              </span>

              <img
                src={userInfo.profileImage}
                alt={userInfo.NAME}
                onClick={toggleDropdown}
                style={{ objectFit: 'contain', scale: '1' }}
              />

              {isDropdownOpen && (
                <div className="dropdown-menu1">
                  {!userInfo.isVisitor && (
                    <>
                      <Link to="#" className="dropdown-item1 d-flex">
                        {/* <GoMail className="fs-5 pb-1" />{' '} */}
                        <img
                          id="dropimg"
                          src={userInfo.profileImage}
                          className="thumbnail "
                          alt=""
                        />
                        <span
                          className=" text-dark d-flex justify-content-center align-items-center "
                          style={{ fontSize: '13px' }}
                        >
                          {userInfo.email}
                        </span>
                      </Link>
                      <Link
                        to={`/profile/${userInfo.employee_id}`}
                        className=" dropdown-item1"
                      >
                        <BsFilePerson className="fs-5 pb-1 text-warning" />{' '}
                        Profile
                      </Link>
                      {/* <Link to="#" className=" dropdown-item1">
                        <HiLink className="fs-5 pb-1 text-info" /> Link 1
                      </Link>
                      <Link to="#" className=" dropdown-item1">
                        <HiLink className="fs-5 pb-1 text-info" /> Link 2
                      </Link> */}
                    </>
                  )}
                  <Link
                    onClick={popupHandle}
                    className="dropdown-item1 fw-bolder text-danger"
                  >
                    <BiLogOut className="fs-5 pb-1 me-1 text-danger fw-bolder" />
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
