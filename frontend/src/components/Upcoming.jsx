// import React from 'react'

// function Upcoming() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Upcoming

import React, { useEffect } from 'react';
import '../components/pageNotFound/NotFoundPage.css';
import VideoSection from './Videosection/VideoSection';
import Typewriter from 'typewriter-effect/dist/core';

function Upcoming() {
  useEffect(() => {
    // Use useEffect to call Typewriter after DOM renders
    new Typewriter('#typewriter', {
      strings: ['  I am working on new features stay tuned....!'],
      autoStart: true,
      loop: true,
    });
  }, []);
  return (
    <>
      <div className="container">
        {' '}
        <VideoSection />
        <div className="content">
          <h4 style={{ color: '#FF00FF', margin: '10px' }}>
            <span id="typewriter"></span>
          </h4>
          - <span className="fw-bold">Vaibhav Randale😎</span>
        </div>
      </div>
    </>
  );
}

export default Upcoming;
