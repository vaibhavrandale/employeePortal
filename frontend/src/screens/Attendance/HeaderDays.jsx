import React from 'react';

const HeaderDays = ({ daysInMonth }) => {
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
        <th className="text-center">UID</th>
        <th className="text-center">Name</th>
        <th className="col-3">Employee ID</th>
        {renderTableHeaders()}
        <th className="text-center">Total</th>
        <th className="text-center">Action</th>
      </tr>
    </thead>
  );
};

export default HeaderDays;
