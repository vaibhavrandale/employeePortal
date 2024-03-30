import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ EndDate }) => {
  const calculateTimeLeft = () => {
    // Split the date string into day, month, and year parts
    const parts = EndDate.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    // Construct a new date object in the correct format (MM/DD/YYYY)
    const formattedEndDate = new Date(year, month - 1, day);

    // Calculate the difference between the end date and the current date
    const difference = formattedEndDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        <>{timerComponents}</>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
