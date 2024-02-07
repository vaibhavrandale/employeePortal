import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Generateslip = () => {
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    year: '',
    month: '',
    totalPresentDays: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenerateClick = () => {
    // Check if all fields are filled
    if (
      formData.name &&
      formData.employeeId &&
      formData.year &&
      formData.month &&
      formData.totalPresentDays
    ) {
      // Construct the URL using state values
      const { employeeId, year, month, totalPresentDays } = formData;
      const url = `/pay-slip/${employeeId}/${year}/${month}/${totalPresentDays}`;

      // Use the Link component to navigate to the constructed URL
      return <Link to={url} />;
    } else {
      // Handle the case when not all fields are filled
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Helmet>
        <title>Generate Pay-Slip</title>
      </Helmet>
      <table className="table table-bordered" style={{ width: '500px' }}>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td className="">Name</td>
            <td>
              <select
                className="form-select"
                name="name"
                id=""
                onChange={handleInputChange}
              >
                <option value="">Select Name</option>
                <option value="Vaibhav Randale">Vaibhav Randale</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Employee Id</td>
            <td>
              <select
                className="form-select"
                name="employeeId"
                id=""
                onChange={handleInputChange}
              >
                <option value="">Select Employee Id</option>
                <option value="19072023009">19072023009</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Year</td>
            <td>
              <select
                className="form-select"
                name="year"
                id=""
                onChange={handleInputChange}
              >
                <option value="">Select Year</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Month</td>
            <td>
              <select
                className="form-select"
                name="month"
                id=""
                onChange={handleInputChange}
              >
                <option value="">Select Month</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Total Present Days</td>
            <td>
              <input
                className="form-control"
                type="text"
                name="totalPresentDays"
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Link
        className="w-20 btn btn-sm btn-success"
        target="blank"
        to={`/pay-slip/${formData.employeeId}/${formData.year}/${formData.month}/${formData.totalPresentDays}`}
      >
        Generate
      </Link>
    </div>
  );
};

export default Generateslip;
