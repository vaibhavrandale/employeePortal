import React from 'react';
import video from './smoke.mp4';
// import '../App.css';
import './VideSection.css';

function VideoSection() {
  return (
    <section className="section">
      <video src={video} autoPlay muted></video>
      <h4 className="taypro">
        <span>T</span>
        <span>A</span>
        <span>Y</span>
        <span>P</span>
        <span>R</span>
        <span>O</span>
      </h4>
    </section>
  );
}

export default VideoSection;
