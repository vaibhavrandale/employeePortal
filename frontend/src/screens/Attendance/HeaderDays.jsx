import React from 'react';

const HeaderDays = ({ daysInMonth, month }) => {
  const getMonthName = (monthNumber) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNumber - 1];
  };

  const renderTableHeaders = () => {
    const headers = [];

    // Display all days of the selected month in the header
    for (let day = 1; day <= daysInMonth; day++) {
      headers.push(
        <th className="text-center" key={day}>
          {day}
        </th>
      );
    }

    return headers;
  };

  return (
    <thead>
      <tr>
        <th
          className="text-center"
          colSpan={
            daysInMonth === 28
              ? 35
              : daysInMonth === 29
              ? 36
              : daysInMonth === 30
              ? 37
              : 38
          }
        >
          <h3 className="text-underline-0">
            Timeline for month-{' '}
            <span className="text-success">{getMonthName(month)}</span>
          </h3>
        </th>
      </tr>
      <tr>
        <th className="text-center">UID</th>
        <th className="text-center">Name</th>
        <th className="col-3">Employee ID</th>
        {renderTableHeaders()}
        <th className="text-center">Present Days</th>
        <th className="text-center">Half Days</th>
        <th className="text-center">Paid Holidays</th>

        <th className="text-center">Action</th>
      </tr>
    </thead>
  );
};

export default HeaderDays;
