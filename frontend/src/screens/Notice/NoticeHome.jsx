import React, { useEffect, useState } from 'react';
import './notice.css';
import { Link } from 'react-router-dom';
import notice from './notice';
import LoadingBox2 from '../../components/LoadingBox/LoadingBox2';
import { Element, scroller } from 'react-scroll'; // Import Element

function NoticeHome() {
  const [searchTerm, setSearchTerm] = useState(''); // Add state for searchTerm

  // Filter notices based on the searchTerm
  const filteredNotices = notice.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [loading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulating a data fetch with a timeout
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after data is fetched
    }, 1000); // For example, after 1 second
  }, []);

  return (
    <div className="container">
      <div className="mb-3 d-flex justify-content-end "></div>
      <div className="m-5 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center">NOTICES</h3>
        <input
          type="search"
          name=""
          id=""
          placeholder="search notice.."
          style={{ width: '250px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>
      <div className="d-flex justify-content-center  flex-wrap">
        {loading ? (
          <LoadingBox2 />
        ) : (
          filteredNotices
            .slice(0)
            .reverse()
            .map((item, index) => (
              <Element
                name={`card-${index}`}
                onEnter={() =>
                  scroller.scrollTo(`card-${index}`, { duration: 0 })
                }
              >
                <div
                  className="card mx-2 my-2 animated" // Add 'animated' class
                  style={{
                    width: '18rem',
                    animationDelay: `${index * 0.1}s`, // Delay animation for each card
                  }}
                >
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt="..."
                    style={{
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'start',
                      objectFit: 'contain',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">
                      {item.title}
                    </h5>
                    <p className="card-text">{item.date}</p>
                    <p className="card-text">{item.description}</p>
                    <Link
                      to={`/notice/${item.id}`}
                      className="btn btn-sm btn-primary text-decoration-none"
                    >
                      View
                    </Link>
                  </div>
                </div>{' '}
              </Element>
            ))
        )}
      </div>{' '}
    </div>
  );
}

export default NoticeHome;
