import React from 'react';
import './policy.css';
import { Helmet } from 'react-helmet';
const RefralBonusPolicy = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';

  return (
    <div className="policy-container py-2 ">
      <Helmet>
        <title>Referal Bonus Policy</title>
      </Helmet>
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading">Employee Refral Bonus Policy</h3>
      </div>

      <section className="policy-section1">
        {/* <h5 className="policy-section1-heading">1] ATTENDANCE</h5> */}
        <section className="d-flex flex-column first-para-container">
          <span className="second-para px-4">
            An Employee Referral Programs are considered one of the most
            reliable sources of recruiting new talents. TAYPRO PVT LTD believes
            that the current employees can most precisely understand the nature
            and suitability of the ideal candidates that we require. This is
            therefore, a guide for the employees when they find a suitable
            candidate and want to refer them
          </span>
          <br />
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              1] Purpose
            </h5>{' '}
          </span>
          <span className="second-para px-4">
            This policy emphasises on rewarding the employee who help identify
            and refer competent Talent in order to meet our resource requirement
            at an optimum cost.
          </span>
          <br />
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              2] Scope
            </h5>{' '}
          </span>
          <span className="second-para px-4">
            This policy covers all employee of TAYPRO PVT LTD except Functional
            Head, HODs, HR Team and those including in recruitment process of
            the candidate or can influence the recruitment of the candidates.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              Guidelines
            </h5>{' '}
          </span>
          <span className="second-para px-4">
            <ul>
              <li className="py-2" style={{ listStyle: 'square' }}>
                Employee may refer individuals who fit the specifications given
                in job descriptions for the notified vacancies.
              </li>
              <li className="py-2" style={{ listStyle: 'square' }}>
                The referred candidate will undergo the regular recruitment
                procedure as per the norms and selection will be considered only
                if he/she meets the requirements of the existing vacancy.
              </li>
              <li className="py-2" style={{ listStyle: 'square' }}>
                An employee’s involvement is limited only to the submission of
                the resume and will not in any way try to influence the
                selection process or compensation finalization of the candidate
              </li>
            </ul>
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              3] Rules and Procedure
            </h5>{' '}
          </span>
          <span className="second-para px-4">
            <ol>
              <li className="py-2" style={{ listStyle: 'number' }}>
                HR will notify vacancies available under employee referral
                scheme through HR System.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                Candidates can be referred ONLY against the notified vacancies.
                The candidate referred should strictly meet the criteria as per
                the vacancy notified.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                Employee referring the candidate should obtain the candidate’s
                consent before forwarding candidate’s resume to HR Department.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                The employee will be eligible to receive the bonus points, only
                when the referred candidate joins the company after going
                through the selection process and successfully completes three
                consecutive months of service with the company. vi. In case the
                referred candidate is taken on a project / assignment based
                fixed term contract for a minimum period of one year, which is
                likely to transit into a regular employment, bonus points will
                be paid after the referred candidate has successfully completed
                training.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                In no way should the employee referring the candidate be a part
                of his/her selection process.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                Candidates who have already responded to the company’s
                requirement against an advertisement, or referred by a
                recruitment agency, or on their own in the past one year from
                the date of notification of vacancy, will not be considered as
                referred candidate
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                In case the same resume is received from more than one employee,
                date and time of the receipt of the resume will be considered
                and the per soon who has sent the resume first will be eligible
                for the bonus.{' '}
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                In case the resume exists in the data bank, the employee will
                not be eligible for referral bonus.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                Selection of ex-employees, who have left the Company, will not
                attract any bonus.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                Selection of ex-employees, who have left the Company, will not
                attract any bonus.
              </li>
              <li className="py-2" style={{ listStyle: 'number' }}>
                No benefits would be credited for referring fresher’s & campus
                hire and candidates with less than 12 months of relevant
                experience{' '}
              </li>
            </ol>
          </span>

          <br />
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              4] Referral Bonus Points
            </h5>{' '}
          </span>
          <span className="second-para px-4">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Reference for Designation</th>
                    <th>Reference Bonus Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>4</td>
                    <td>Technician</td>
                    <td>3% Basic CTC</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Executive </td>
                    <td>4% Basic CTC</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Assistance Manager </td>
                    <td>5% Basic CTC</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Manager </td>
                    <td>6% Basic CTC</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>

          <br />
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              5] Exception
            </h5>{' '}
          </span>
          <span className="second-para px-4 py-2">
            The above terms are subject to modification/ amendments/
            alterations/by the Management at any time on Business/ Statutory
            requirements.
            <br /> <br />
            In case of any doubt, the interpretation of the above terms by the
            Head HR shall be final. No exceptions shall be permitted without
            specific written approval from the Head HR
          </span>
        </section>
      </section>
    </div>
  );
};

export default RefralBonusPolicy;
