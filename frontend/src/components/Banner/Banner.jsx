import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import bannerimgs from './BannerAPI';

const Banner = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (oldIndex, newIndex) => {
    // Handle logic before the slide changes (e.g., fade-out animation for the text)
    const textOverlay = document.getElementById('text-overlay');
    if (textOverlay) {
      textOverlay.style.opacity = 0;
    }
  };

  const handleAfterChange = (index) => {
    // Handle logic after the slide changes (e.g., fade-in animation for the text)
    setCurrentSlide(index);
    const textOverlay = document.getElementById('text-overlay');
    if (textOverlay) {
      textOverlay.style.opacity = 1;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
  };

  return (
    <>
      <CarouselImages {...settings}>
        {bannerimgs.map((item, index) => (
          <Wrap key={index}>
            <div>
              {' '}
              <img src={item.imgSrc} alt="slide1" />{' '}
              <TextOverlay id="text-overlay" isVisible={index === currentSlide}>
                {item.desc}
              </TextOverlay>
            </div>
          </Wrap>
        ))}
      </CarouselImages>
    </>
  );
};

const CarouselImages = styled(Slider)`
  overflow: hidden;
  height: 70vh;
  width: 70vh;
  opacity: 1;
  z-index: 1500;
  ul li button {
    &::before {
      font-size: 11px;
      color: rgb(150, 158, 171);
    }
  }
  ul li.slick-active button {
    &::before {
      color: #fff !important;
    }
  }
  & > button {
    opacity: 0;
    z-index: 1500;
    width: 5vw;
    height: 100%;
    &:hover {
      opacity: 1;
      z-index: 2000;
      transition: opacity 0.2s ease 0s;
    }
  }
  .slick-prev {
    left: 0%;
  }
  .slick-next {
    right: 0%;
  }
  .slick-list {
    overflow: initial !important;
  }
`;

const Wrap = styled.div`
  position: relative;

  div {
    border-radius: 4px;
    padding: 4px;
    display: block;
    opacity: 1;
    z-index: 2;
    box-shadow: rgb(0 0 0 /69%) 0px -16px -10px -15px,
      rgb(0 0 0 /73%) 0px 6px -10px -15px;
    cursor: default;
    img {
      width: 100%;
      height: 100%;

      object-fit: fill;
      border-radius: 4px;
      @media screen and (min-width: 375px) and (max-width: 550px) {
        width: 100%;
        height: 23vh;
        object-fit: fill;
      }
      @media screen and (min-width: 280px) and (max-width: 375px) {
        width: 100%;
        height: 20vh;
        object-fit: fill;
      }
    }
    &:hover {
      transition-duration: 3000;
    }
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease;

  /* Additional styling for the text overlay */
`;
export default Banner;
