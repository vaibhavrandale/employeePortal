import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';
import { MdNotAccessible } from 'react-icons/md';
import { FaChalkboardUser } from 'react-icons/fa6';
import { FcDataSheet } from 'react-icons/fc';

import { FcLeave } from 'react-icons/fc';
import './Sidebar.css';
import { Store } from '../../Store';

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className={`  sidebar ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo">
        <h1 className="heading1 fw-bold">T</h1>
        <h1 className="heading2">
          <img
            src="/images/Taypro.png"
            alt="logo"
            style={{
              height: '28px',
              width: '120px',
              margin: 'auto',

              objectFit: 'contain',
              zIndex: '200',
            }}
          />
        </h1>
      </div>
      <ul>
        {userInfo && userInfo.isAdmin === 1 && userInfo.isVisitor === 0 && (
          <li>
            <Link to="/">
              <img
                src="/images/icons/dashboard.png"
                alt="dashboard"
                className="icon me-1"
                height={'20px'}
              />
              {hovered && <span>Dashboard</span>}
            </Link>
          </li>
        )}

        <>
          {userInfo && (userInfo.isHr === 1 || userInfo.isDirector === 1) ? (
            <li>
              <Link to="/employees">
                <img
                  src="/images/icons/employee.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>Employees</span>}
              </Link>
            </li>
          ) : (
            ''
          )}

          {userInfo && userInfo.isAdmin === 1 && userInfo.isVisitor === 0 && (
            <li>
              <Link to="/leaves-history">
                <FcLeave className="icon me-2" />
                {hovered && <span>Leaves</span>}
              </Link>
            </li>
          )}

          {userInfo && userInfo.isAdmin === 1 && userInfo.isVisitor === 0 && (
            <li>
              <Link to="/notice-home-page">
                <FaChalkboardUser color="red" className="icon me-2" />
                {hovered && <span>Notice</span>}
              </Link>
            </li>
          )}

          {userInfo && (userInfo.isHr === 1 || userInfo.isDirector === 1) ? (
            <li>
              <Link to="/new-attendancde">
                <FcDataSheet color="red" className="icon me-2" />
                {hovered && <span>Timeline</span>}
              </Link>
            </li>
          ) : (
            ''
          )}

          {userInfo && userInfo.isAdmin === 1 && (
            <li>
              <Link to={`/myattendance/${userInfo.employee_id}`}>
                <img
                  src="/images/icons/slip.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>My Timeline</span>}
              </Link>
            </li>
          )}

          {userInfo && userInfo.isAdmin === 1 && (
            <li>
              <Link to={`/calender`}>
                <img
                  src="/images/icons/holiday.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>Holiday</span>}
              </Link>
            </li>
          )}

          {userInfo && userInfo.isAdmin === 1 ? (
            <li>
              <Link to={`/policy-documents-home`}>
                <img
                  src="/images/icons/policy.jpg"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>Policies</span>}
              </Link>
            </li>
          ) : (
            ''
          )}

          {userInfo && (userInfo.isHr === 1 || userInfo.isDirector === 1) ? (
            <li>
              <Link to={`/assets-home`}>
                <img
                  src="/images/icons/assets.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>Assets</span>}
              </Link>
            </li>
          ) : (
            ''
          )}
          {userInfo && userInfo.isAdmin === 1 && (
            <li>
              <Link to={`/company-profile`}>
                <img
                  src="/images/icons/profile.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>Profile</span>}
              </Link>
            </li>
          )}

          {userInfo && (userInfo.isHr === 1 || userInfo.isDirector === 1) ? (
            <li>
              <Link to="/expenses-home">
                <img
                  src="/images/icons/survey.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span> Expenses</span>}
              </Link>
            </li>
          ) : (
            ''
          )}

          {userInfo && userInfo.isAdmin === 1 && (
            <li>
              <Link to={`/my-expenses-home/${userInfo.employee_id}`}>
                <img
                  src="/images/icons/survey1.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>My Expenses</span>}
              </Link>
            </li>
          )}
        </>
      </ul>
    </div>
  );
};

export default Sidebar;
