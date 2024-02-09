// import React from 'react'

// const SalarCalculator = () => {
//   return (
//     <div>SalarCalculator</div>
//   )
// }

// export default SalarCalculator

import React, { useState } from 'react';

function SalarCalculator() {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ctc, setCtc] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [netSalary, setNetSalary] = useState('');

  const calculateNetSalary = () => {
    let parsedMonth = parseInt(month, 10);
    let parsedYear = parseInt(year, 10);
    let parsedTotalDays = parseInt(totalDays, 10);
    let parsedCtc = parseInt(ctc, 10);
    let basic = ((parsedCtc / 12) * (45 / 100)).toFixed(2);
    let pf = Math.min((basic * 12) / 100, 1800) + 200;

    let averagedays = 31; // Default value for months other than February

    if (parsedMonth === 2) {
      // If the month is February, adjust the days and handle leap years
      if (
        (parsedYear % 4 === 0 && parsedYear % 100 !== 0) ||
        parsedYear % 400 === 0
      ) {
        // Leap year, February has 29 days
        averagedays = 29;
      } else {
        // Non-leap year, February has 28 days
        averagedays = 28;
      }
    } else if ([4, 6, 9, 11].includes(parsedMonth)) {
      // Months with 30 days
      averagedays = 30;
    }

    const calculatedNetSalary = Math.floor(
      (parsedTotalDays * (parsedCtc / 12)) / averagedays - pf
    );
    setNetSalary(calculatedNetSalary);
  };

  return (
    <div className="container">
      <h4>Net Salary Calculator</h4>
      <table className="table table-bordered w-50">
        <tbody>
          <tr>
            <td>Month</td>
            <td>
              <input
                type="number"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                min="1"
                max="12"
              />
            </td>
          </tr>

          <tr>
            <td>Year</td>
            <td>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                min="1900"
              />
            </td>
          </tr>

          <tr>
            <td>CTC</td>
            <td>
              <input
                type="number"
                value={ctc}
                onChange={(e) => setCtc(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>Present Days</td>
            <td>
              <input
                type="number"
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
                min="28"
                max="31"
              />
            </td>
          </tr>

          <tr>
            <td>
              <button
                onClick={calculateNetSalary}
                className="btn btn-sm btn-success"
              >
                Calculate
              </button>
            </td>
            <td style={{ width: '200px' }}>
              <input style={{ color: 'rgb(255, 30, 0)' }} value={netSalary} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SalarCalculator;
