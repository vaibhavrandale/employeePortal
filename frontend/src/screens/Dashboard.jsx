import React from 'react';
import '../App.css';
import Banner from '../components/Banner/Banner';
import VideoSection from '../components/Videosection/VideoSection';

function Dashboard() {
  return (
    <div className="container d-flex ">
      <VideoSection />
      <Banner />
    </div>
  );
}

export default Dashboard;
