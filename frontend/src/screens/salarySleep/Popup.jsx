import React, { useState } from 'react';
import { ImDownload } from 'react-icons/im';
import { GrClose } from 'react-icons/gr';
import './salarySleep.css';

const Popup = ({ onClose, onSubmit }) => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedCompany, setSelectedCompany] = useState('Company A');

  return (
    <div className="popupDiv ">
      <div id="headbackground" className="">
        <h4 className="headingOfPopup">Download</h4>
      </div>
      <div className="d-flex mb-1">
        <label className="headingOfPopup m-1 " htmlFor="year">
          Year:
        </label>
        <select
          className="selectOption form-control w-50 ms-4"
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>

          {/* Add more years if needed */}
        </select>
      </div>
      <div className="d-flex mb-1">
        <label className="headingOfPopup m-1" htmlFor="month">
          Month:
        </label>
        <select
          className="selectOption form-control w-50 "
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="January">January</option>
          <option value="January">Febraury</option>
          <option value="January">March</option>
          <option value="January">April</option>
          <option value="January">May</option>
          <option value="January">June</option>
          <option value="January">July</option>
          <option value="January">August</option>
          <option value="January">September</option>
          <option value="January">October</option>
          <option value="January">November</option>
          <option value="January">December</option>

          {/* Add more months if needed */}
        </select>
      </div>

      <div className="d-flex justify-content-lg-around">
        <button
          className="closeBtn text-dark mt-2"
          onClick={() => onSubmit(selectedYear, selectedMonth, selectedCompany)}
        >
          <ImDownload />
        </button>
        <button className="closeBtn mt-2" onClick={onClose}>
          <GrClose />
        </button>
      </div>
    </div>
  );
};

export default Popup;
