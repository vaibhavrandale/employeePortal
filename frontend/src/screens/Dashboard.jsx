import React, { useContext } from 'react';
import '../App.css';
// import Banner from '../components/Banner/Banner';
// import VideoSection from '../components/Videosection/VideoSection';
// import logo from './salarySleep/Taypro.png';
import './dashboard.css';
import { Store } from '../Store';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return (
    <div className="container">
      {/* <div className=" d-flex ">
        <VideoSection />
        <Banner />
      </div> */}

      <div
        className=" row  col-6 m-1 pb-3 border  "
        style={{ display: 'grid', placeItems: 'center' }}
      >
        <span className="bg-dark text-light ">Quick Links</span>
        <div className="row row-cols-1 row-cols-md-4 g-2">
          {userInfo && userInfo.isAccountant && (
            <div className="col">
              <div
                className="card border border-0 quicklikCard"
                id="quicklikCard"
              >
                <Link to="employees" className="p-1 text-decoration-none">
                  <img
                    src="/images/icons/employees_or.png"
                    height={50}
                    width={100}
                    alt=""
                    style={{ objectFit: 'contain' }}
                    className="card-img-top quicklikCardImg rounded-circle"
                  />
                  {/* <span className='card-img-top'></span> */}
                  <div className="card-body text-center">
                    <span
                      className="card-title  "
                      style={{ color: '#2749f5', fontWeight: '500' }}
                    >
                      Employees
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}

          <div className="col">
            <div className="card border border-0 quicklikCard">
              <Link to="sitelist" className="p-1 text-decoration-none">
                <img
                  src="/images/icons/survey.png"
                  className="card-img-top quicklikCardImg"
                  height={50}
                  style={{ objectFit: 'contain' }}
                  alt="..."
                />
                <div className="card-body text-center ">
                  <span
                    className="card-title"
                    style={{ color: '#2749f5', fontWeight: '500' }}
                  >
                    {' '}
                    Survey
                  </span>
                </div>
              </Link>
            </div>
          </div>
          {userInfo && !userInfo.isVisitor && (
            <div className="col">
              <div className="card border border-0 quicklikCard">
                <Link to="leaves-history" className="p-1 text-decoration-none">
                  <img
                    src="/images/icons/leaves.png"
                    height={50}
                    style={{ objectFit: 'contain' }}
                    className="card-img-top quicklikCardImg"
                    alt="i"
                  />
                  <div className="card-body text-center">
                    <span
                      className="card-title"
                      style={{ color: '#2749f5', fontWeight: '500' }}
                    >
                      leaves
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {userInfo && !userInfo.isVisitor && (
            <div className="col">
              <div className="card border border-0 quicklikCard">
                <Link to="pay-sleep" className="p-1 text-decoration-none">
                  <img
                    src="/images/icons/slip.png"
                    height={50}
                    style={{ objectFit: 'contain' }}
                    className="card-img-top quicklikCardImg"
                    alt="i"
                  />
                  <div className="card-body text-center">
                    <span
                      className="card-title"
                      style={{ color: '#2749f5', fontWeight: '500' }}
                    >
                      Pay Slip
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ---------------------2nd row ---------------------- */}
        <div className="row row-cols-1 row-cols-md-4 g-2">
          {userInfo && userInfo.isAccountant && !userInfo.isVisitor && (
            <div className="col">
              <div className="card border border-0 quicklikCard">
                <Link to="salary-Entry" className="p-1 text-decoration-none">
                  <img
                    src="/images/icons/salary.jpg"
                    height={50}
                    style={{ objectFit: 'contain' }}
                    className="card-img-top quicklikCardImg"
                    alt="i"
                  />
                  <div className="card-body text-center">
                    <span
                      className="card-title "
                      style={{ color: '#2749f5', fontWeight: '500' }}
                    >
                      Entry
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
          {userInfo && userInfo.isAdmin && !userInfo.isVisitor && (
            <div className="col">
              <div className="card border border-0 quicklikCard">
                <Link to="" className="p-1 text-decoration-none">
                  <img
                    src="/images/icons/soon_watch.png"
                    height={50}
                    style={{ objectFit: 'contain' }}
                    className="card-img-top quicklikCardImg"
                    alt="i"
                  />
                  <div className="card-body text-center">
                    <span
                      className="card-title"
                      style={{ color: '#2749f5', fontWeight: '500' }}
                    >
                      comming..
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2nd row--------------------------- */}
      {/* <LoadingBox4 /> */}
    </div>
  );
}

export default Dashboard;
