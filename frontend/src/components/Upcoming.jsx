// import React from 'react'

// function Upcoming() {
//   return (
//     <div>

//     </div>
//   )
// }

// export default Upcoming

import React from 'react';
import '../components/pageNotFound/NotFoundPage.css';
import VideoSection from './Videosection/VideoSection';

function Upcoming() {
  return (
    <>
      <div className="container">
        {' '}
        <VideoSection />
        <div className="content">
          <h2 style={{ color: '#FF00FF', margin: '10px' }}>
            We are working on new features stay tuned....!
          </h2>
        </div>
      </div>
    </>
  );
}

export default Upcoming;
