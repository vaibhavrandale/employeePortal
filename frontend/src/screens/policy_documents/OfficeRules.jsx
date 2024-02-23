import React from 'react';
import PolicyFooter from './PolicyFooter';

const OfficeRules = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="policy-container py-1">
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading"> Office Rules and Regulations</h3>
      </div>

      <section className="policy-section1">
        {/* <h5 className="policy-section1-heading">1] ATTENDANCE</h5> */}
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              1] Office Timings
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            The Firm encourages a Six-day’ work week for its professional
            employers with week-ends off. However, the office is open on Sunday
            and you may attend work if you feel the need to and/or when required
            to by your Reporting Respective Manager / Management.
          </span>
          <br />
          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              2] Working-hours
            </h5>{' '}
            <br />
            The normal working hours from <b>Monday</b> to <b>Saturday</b> are
            9:00 am to 6:00 pm with half hour lunch break.
          </span>
          <br />
          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              3] Lunch-Break
            </h5>{' '}
            <br />
            <span style={{ wordSpacing: '2px' }}>
              {' '}
              The official Lunch Break is between 1.00 p.m. to 1:30 p.m. or 1.30
              to 2.00 p.m. Lunch break is taken during the specified time. In
              are circumstances when you need to break for lunch at a different
              time, you may do so in a considerate manner such that visitors to
              the office and/or your colleagues are not inconvenienced in any
              way.
            </span>
            <br />
            <span style={{ marginLeft: '20rem', wordSpacing: '2px' }}>
              All employees working outside the firm’s offices must inform their
              Reporting Manager of their work location(s) and contact telephone
              numbers in advance. Any change in work location and/or contact
              numbers, must also be communicated in advance by you to yourAll
              employees working outside the firm’s offices must inform their
              Reporting Manager of their work location(s) and contact telephone
              numbers in advance. Any change in work location and/or contact
              numbers, must also be communicated in advance by you to your
              Reporting Manager and to the HR of your reporting office on email.
            </span>
          </span>
          <br />
          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              4] Time-Off
            </h5>
            <br />
            <span style={{ wordSpacing: '2px' }}>
              Occasionally you may require to take some time off during the
              course of the working day or you may wish to leave a little early.
              It can mean 2 hours coming late to the office, taking a 2-hour gap
              in between or leaving 2-hours early. Whenever you feel the need to
              do so, please obtain prior permission of your Partner/Reporting
              Manager. Only Two a short leave is allowed in month.
            </span>
          </span>
          <br />

          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              5] PUNCTUALITY
            </h5>
            <br />
            <span style={{ wordSpacing: '2px' }}>
              Your integrity in being punctual is a quality that is highly
              valued by the Firm. If you expect to be late in arriving at work
              in the morning or in returning to work after lunch, you are
              required to inform the office HR or your reporting manager at your
              place of work on email Unauthorized delay; Professional staff have
              no grace period whatsoever, in the reporting time. However, owing
              to the pressures of travel or other circumstances, it is possible
              that you may occasionally be delayed arriving at work. The firm
              believes that its people take punctuality as a personal
              responsibility and is therefore willing to make occasional
              allowances for late arrival. However, a serious view will be taken
              of those employees who are habitual late comers and leave or
              salary may be deducted for habitual late arrival.
            </span>
          </span>
          <br />

          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              6] TIME DOCUMENTATION
            </h5>
            <br />
            <ul>
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                All professional staff in business groups, at levels of Articled
                trainees and above, are required to complete the Time Sheets.
                Support Staff, Accounts and Administration. These staff however
                will be required to punch on biometric on a daily basis, on
                arrival at office each morning and in evening at time of leave
                office.
              </li>
              <br />{' '}
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                All professional staff salaries will be given only when time
                sheets are submitted to the accounts department on time. Though
                time sheets are given on a monthly basis, it is always advisable
                that these are filled up on daily basis or at least once in two
                days. This will help in filling up the time sheets diligently
                and diligence will ensure accuracy.
              </li>
              <br />{' '}
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                Monthly time sheets must be completed and submitted to the
                Accounts department by the 3rd of the following month. This date
                will apply even when you are touring if you are on an outstation
                assignment or away from the office, please mail your time
                statements to the Accounts dept. Salary for the month and
                reimbursements may be delayed if Time sheets of the previous
                month are not received by The Account’s department.
              </li>
              <br />{' '}
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                Use of photocopies of Time sheet forms is discouraged. Please
                ensure that you are adequately stocked with forms. In the event
                that you need to use a photocopy, please ensure that it is
                legible.
              </li>
              <br />{' '}
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                Statements filled in pencil (Lead) will not be valid.
              </li>
            </ul>
          </span>
          <br />

          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              7] DISCIPLINE
            </h5>
            <br />
            <b className="text-success fw-bold">DRESS</b> <br />
            <ul>
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                As an TAYPRO employee, you must dress in a manner suited to the
                firm. The dress code at office and client locations is formal
                for men and women. On weekends office wear is informal.
              </li>
              <br />{' '}
              <li style={{ wordSpacing: '2px', listStyleType: 'square' }}>
                Whether you work as an employee, article or trainee, you are
                expected to deport yourself in a manner that will uphold the
                dignity of the firm, whether at client locations or in our own
                offices or at social functions with clients. Ensure the use of
                appropriate dress code as per safety protocols at the project
                site for project work.
              </li>
            </ul>
          </span>
          <br />

          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              8] Use of Offensive / Addictive Substances
            </h5>
            <br />
            <span style={{ wordSpacing: '2px' }}>
              You must not smoke and Alcohol in the firm’s or client’s offices,
              except in designated smoking rooms / areas, (if any). Chewing pan
              / tobacco during office hours and / or when meeting clients is
              also not permitted. Drug abuse is an offense under the Indian
              Penal Code.
            </span>
          </span>
          <br />

          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              9] Language
            </h5>
            <br />
            <span style={{ wordSpacing: '2px' }}>
              Indian being a country of diverse languages and cultures,
              conversing the vernacular could result in exclusion of others. It
              is with a view to promote inclusion and sensitivity, that English
              has been made the standard of communication in TAYPRO India. You
              may, therefore please communicate in English or Hindi except on
              personal calls or when talking in homogeneous groups that speak a
              particular vernacular tongue or when conversing with peons.
            </span>
          </span>
          <br />

          <span className="second-para px-4 py-2">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              10] Custody of the Firm’s Assets
            </h5>
            <br />
            <ul>
              <li
                style={{ wordSpacing: '2px', listStyleType: 'square' }}
                className="my-2"
              >
                As an TAYPRO employee, you are responsible for the care of the
                Firm’s assets. Moreover, some employees are given custody of
                assets such as lap-top computers, cars etc.; these are to be
                returned your Partner / Reporting Manager before proceeding on
                leave and before the leaving form the company. You will be
                liable to compensate at replacement value, for damage / loss /
                theft of any items under your custody.
              </li>
              <li
                style={{ wordSpacing: '2px', listStyleType: 'square' }}
                className="my-2"
              >
                However, while leaving from company premises, do not carry
                companies’ assets with you belonging (Laptop, charger,
                documents). In Case of emergency work/ meeting tour, A
                permissions required from the concern higher authority
              </li>
            </ul>
          </span>
          <br />
        </div>
      </section>

      <PolicyFooter />
    </div>
  );
};

export default OfficeRules;
