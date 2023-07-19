import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';

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
      className={`sidebar ${hovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="logo">
        <h1 className="heading1">T</h1>
        <h1 className="heading2">
          <img
            src="/images/Taypro.png"
            alt="logo"
            style={{
              height: '28px',
              width: '120px',
              margin: 'auto',
              objectFit: 'cover',
            }}
          />
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">
            <img
              src="/images/icons/dashboard.png"
              alt="employee"
              className="icon me-1"
              height={'20px'}
            />
            {hovered && <span>Dashboard</span>}
          </Link>
        </li>
        {userInfo && userInfo.isAdmin && (
          <>
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
            <li>
              <Link to="/leaves-history">
                <FcLeave className="icon me-2" />
                {hovered && <span>Leaves</span>}
              </Link>
            </li>
            <li>
              <Link to="sitelist">
                <img
                  src="/images/icons/survey.png"
                  alt="employee"
                  className="icon me-1"
                  height={'23px'}
                />
                {hovered && <span>Site Survey</span>}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="#">
            <AiOutlineDashboard className="icon me-2" />
            {hovered && <span>Feature-2</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
