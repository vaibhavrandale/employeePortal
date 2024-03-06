import React from 'react';
import PolicyFooter from './PolicyFooter';

const LateComing = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';

  return (
    <div className="policy-container py-1">
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading">Late Coming Policy</h3>
      </div>

      <section className="policy-section1">
        <h5 className="policy-section1-heading">Dear Team,</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            As we have installed Matrix Time Machine, it is decided that office
            timing will be monitored and regulated as under: <br /> <br />
          </span>
          <span className="second-para px-4">
            <ol>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Employee should reach office by 9:00 AM, however we can allow
                the employee reach 15 minutes late under un-avoidable
                circumstance.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Any Reporting after 9:15 AM will be treated as late coming. Only
                2 late coming in a month will be allowed.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                If anyone is reporting late than 9:15 AM for the third time in a
                month his/her 1/2-day leave will be deducted from the leaves.{' '}
                <br /> If there no leaves balance the same will be treated as
                leave without pay.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Further, please note that lunch time is 30 minutes and all are
                requested to adhere to the same{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Please take leaves Approval/ OD from your HOD and subsequently
                same needs to inform to office email.
              </li>
            </ol>
          </span>
          <span className="second-para px-4 py-2">
            All are requested to take note of the above and attend office on
            time regularly.
          </span>
        </div>
      </section>

      <PolicyFooter />
    </div>
  );
};

export default LateComing;
