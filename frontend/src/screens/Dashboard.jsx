import React from 'react';
import '../App.css';
import Banner from '../components/Banner/Banner';
import VideoSection from '../components/Videosection/VideoSection';

function Dashboard() {
  return (
    <div className="container">
      <div className=" d-flex ">
        <VideoSection />
        <Banner />
      </div>
      {/* <SalarySleep/> */}
    </div>
  );
}

export default Dashboard;
