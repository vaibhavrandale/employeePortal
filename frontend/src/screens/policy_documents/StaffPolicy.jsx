import React from 'react';
import { Helmet } from 'react-helmet';
import PolicyFooter from './PolicyFooter';

const StaffPolicy = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';
  return (
    <div className="policy-container py-1">
      <Helmet>
        <title>Staff Policy</title>
      </Helmet>
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading">Staff Policy</h3>
      </div>

      <section className="policy-section1">
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              SCOPE AND APPLICABILITY
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            The present document shall be called TAYPRO Service Rules. These
            service rules shall apply to all employees who are appointed at PAN
            INDIA Locations or working in any other departments of the COMPANY.
          </span>
          <span className="second-para px-4">
            The rules lay down the terms and conditions of the employees of the
            company for their functions, duties, conduct, discipline, and
            remunerations.
          </span>
          <span className="second-para px-4 py-2">
            <b> “Employee”</b> shall mean all persons in full-time employment
            including Administration, Marketing, Sales, Procurement, Account,
            Quality, Technical or other departments of TAYPRO PRIVATE LIMITED
            whether permanent, temporary, or on probation/training and whether
            employed as Managers, officers, subordinate staff or worker.
          </span>
          <span className="second-para px-4 py-2">
            <b>“Management”</b> means the Board of Directors of the Company.
          </span>
          <span className="second-para px-4 py-2">
            The Management reserves the right, to amend, alter, change or
            withdraw any or all the service conditions, governing employment
            without notice and without assigning any reason thereof. The
            Managing Director shall be the final authority in the interpretation
            of the Rules and the cases not covered by these Rules shall be
            referred to the Managing Director for decision/orders.
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              RECRUITMENT AND ORIENTATION
            </h5>{' '}
            <br />
          </span>

          <span className="second-para px-4 py-2">
            The Management reserves the right to recruit any person. The minimum
            age limit for recruitment shall be 18 years.
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Composition of Selection committees
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            <ol>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Higher Management Cadre – Level 1 (T1) -&nbsp;
                <b className="text-success"> Directors/CEO</b>
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Lower Management Cadre – Level 2 (T2) -&nbsp;
                <b className="text-success">
                  Head of the department<b className="text-danger">/</b>Managers
                  for which the selection is made if applicable
                </b>
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                CA/Asst. Manager/Officer Cadre – Level 3 (T3)-&nbsp;
                <b className="text-success">
                  Asst. General Manager<b className="text-danger">/</b> Asst.
                  Head of the department for which the selection is made
                  <b className="text-danger">/</b> Engineers Technical Staff
                </b>
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Subordinate Staff – Level 4 (T4)-&nbsp;
                <b className="text-success">
                  Site Technicians<b className="text-danger">/</b>
                  Labours/Workers
                </b>
              </li>
            </ol>
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              SERVICE CONDITION
            </h5>{' '}
            <br />
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Appointment
            </h5>
          </span>

          <span className="first-para px-4">
            The selected candidate will be primarily issued an Offer Letter and
            upon joining he will be required to provide the following documents
            to the Personnel Department
            <ol>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Copies of his Academic / Professional Degree & Courses
                Certificates
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Proof of Birth Date and Present/Permanent Address
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Certificate of Previous Employer for relieving from his duties{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Two Passport Size Photographs
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Copy of Income Tax Permanent Account Number Card [PAN Card]
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Copy of National Social Security Number Card [If any]
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Copy of E.S.I.C. Card [If any]
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Joining information letter
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Details of Earning during the current financial year from the
                Previous Employer
              </li>
              <br />
              The selection committee is required to forward the following
              documents to the Personnel Department <br />
              <li style={{ listStyleType: 'square' }} className="p-1">
                Application with Passport size Photograph along with their
                assessment.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Raw data of negotiated package and post on which appointed.
              </li>
            </ol>
          </span>

          <span className="first-para px-4">
            He will be then issued a formal appointment letter and a person
            shall be considered to be in employment on acceptance of the
            appointment letter.
            <br />
            <br />
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Formalities related to PF and ESIC
            </h5>
            Newly joined employees should meet the Personnel Department
            In-Charge within 5 Days of joining and should complete the
            formalities related to Nomination for PF and ESIC Number allocation
            if applicable. In case the newly joined employee requires
            transferring the Balance of PF accumulated during the earlier
            employment he should provide the required information in this
            regard.
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Training/Probation
            </h5>
            The initial appointment shall be except specified otherwise on
            training/probation for six months. The Management may from time to
            time extend or reduce the such period of training/probation as may
            be considered necessary.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Date of Joining
            </h5>
            The service of an employee shall commence as and when the employee
            reports for duty at the place of posting as intimated by Management
            after having completed the necessary formalities.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Confirmation of Service
            </h5>
            The service of an employee will be confirmed in writing only on
            satisfactory completion of the probationary period. A probationer
            who is not performing satisfactorily during his/her period of
            probation as per the standard required for the post and the adverse
            rating has been communicated in writing shall be liable to be
            discharged in accordance with the terms and conditions of
            appointment.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Transfer of Services
            </h5>
            The service of an employee shall be liable to transfer within any
            department of this Company and/or any other Company under the same
            Group.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Retirement
            </h5>
            An employee shall retire from the services of the organization on
            completing 58 years of age, subject to the condition he/she is
            physically fit to perform the duties satisfactorily.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Extention of services
            </h5>
            The management may, at its discretion, sanction from time to time
            the extension of employment for a period not exceeding two years at
            a time.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Cessation
            </h5>
            An employee will cease to be in the employment by the organization
            in case of termination/discharge/dismissal or retirement from
            service from the date of such termination, discharge, dismissal, or
            retirement. In case of death, the employee shall cease to be in the
            employment of the organization with effect from the day on which
            death takes place.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Discharge or termination of service during training/probation
            </h5>
            During the period of training/probation, the Management may
            discharge an employee from the service of the organization, or an
            employee may leave or discontinue the service without any notice.{' '}
            <br />
            Those employees who have been appointed as trainees & those trainees
            who have completed their training period will not in any way have
            any claims for a regular appointment against any regular position in
            the organization. In the same manner as that of an employee being
            employed on probation.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Discharge or termination of service after confirmation
            </h5>
            Committing acts of misconduct or any other reasons by any employee,
            which would be detrimental to the objectives and image of the
            organization may result in discharge from the services of the
            organization.
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Notice Period{' '}
            </h5>
            Unless specified otherwise, in the case of any employee the notice
            period to leave or discontinue from the service of the organization
            will be TWO months’ notice in writing.
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Compensation Package
            </h5>
            The company appoints any employee after taking into consideration of
            the “Cost to Company” [Gross Annual Package]. Basic Pay, other
            allowances, benefits, etc. are being decided based on such Gross
            Package.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Basic Pay
            </h5>
            The basic pay of employees will be decided as per the following
            method. <br />
            <div className="table-responsive table-sm">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <b>Gross Annual Package</b>
                    </td>
                    <td>
                      <b>Rate of Basic Pay</b>
                    </td>
                  </tr>
                  <tr>
                    <td className="">Above Rs.180,000/- per annum</td>
                    <td className="">50% of the Gross Annual Package</td>
                  </tr>
                  <tr>
                    <td className="">
                      Above Rs.65,000/- per annum but Less than Rs.180,000/- per
                      annum
                    </td>
                    <td className="">60% of the Gross Annual Package</td>
                  </tr>
                  <tr>
                    <td className="">Rs.65,000/- and below</td>
                    <td className="">80% of the Gross Annual Package</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Allowances & Benefits
            </h5>
            In addition to the salary, the company contributes to the Employees
            Provident Fund & Pension Fund and Employees State Insurance Scheme
            as may be applicable and the cost of these contributionsise is
            considered while calculating the Gross Annual Package. However, for
            the purpose of remaining amount of the Gross Annual Package,
            employees are offered to select various heads of Allowances in the
            following sequence. <br /> <br />
            <div className="table-responsive table-sm">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Name of Allowance</th>
                    <th>Amount Allowable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="">1</td>
                    <td className="">Conveyance Allowance</td>
                    <td className="">Maximum Rs.800/- per Month</td>
                  </tr>
                  <tr>
                    <td className="">2</td>
                    <td className="">Medical Reimbursement/ Allowance</td>
                    <td className="">Maximum Rs.1250/- per Month</td>
                  </tr>
                  <tr>
                    <td className="">3</td>
                    <td className="">House Rent Allowance</td>
                    <td className="">
                      An amount not exceeding 25% of Basic Pay
                    </td>
                  </tr>
                  <tr>
                    <td className="">4</td>
                    <td className="">City Compensation Allowance</td>
                    <td className="">Variable </td>
                  </tr>
                  <tr>
                    <td className="">5</td>
                    <td className="">Leave Travel Allowance</td>
                    <td className="">
                      An amount not exceeding 25% of Basic Pay
                    </td>
                  </tr>
                  <tr>
                    <td className="">6</td>
                    <td className="">Food Vouchers</td>
                    <td className="">Variable</td>
                  </tr>
                  <tr>
                    <td className="">7</td>
                    <td className="">Professional Pursuits Allowance</td>
                    <td className="">Variable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Bonus
            </h5>
            The Bonus payable to any employee who is an employee of the company
            for at least 1 year @ 8.33% is calculated and considered in Gross
            Annual Package. However, the employees shall be entitled to Bonuses
            as may be applicable under the Payment of Bonus Act, 1961
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Other Benefits
            </h5>
            Management may decide to provide benefits of Rent-Free
            Accommodation, Company Vehicles, and/or running and maintenance
            expenses thereof. However, the value of such perquisites will be
            part and partial to their individual Gross Annual Package unless
            specified otherwise.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Deductions
            </h5>
            As applicable from time to time the company will deduct the
            Employee’s Share towards PF, ESI, PT, etc in the following manner.
            <br />
            <br />
            <div className="table-responsive table-sm">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="">Provident Fund [PF]</td>
                    <td className="">@ 12 % of Basic Pay on a Monthly Basis</td>
                  </tr>
                  <tr>
                    <td className="">
                      Employees State Insurance Scheme [ESIC] @
                    </td>
                    <td className="">
                      @ 1.75 % of Basic Pay and all allowances
                    </td>
                  </tr>
                  <tr>
                    <td>Professional Tax [PT]</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Earning</td>
                    <td className="fw-bold">Tax Amount Per Month</td>
                  </tr>
                  <tr>
                    <td>Below Rs. 3,000/-</td>
                    <td>Nill</td>
                  </tr>
                  <tr>
                    <td>Rs.3,000/- and above</td>
                    <td>Rs.200/-</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <span className="first-para px-4">
              However, in case of any change in applicable Laws, the above rates
              of deductions will be modified under intimation to employees by a
              circular/notice.
            </span>
            <span className="first-para px-4">
              <h5
                className="policy-section1-heading  fw-bolder"
                style={{ textTransform: 'uppercase' }}
              >
                {' '}
                <br />
                Income Tax Liability of Employees
              </h5>
              Earnings of employees will be subject to Income Tax Law and
              required Tax will be deducted from their salaries. For the purpose
              of treatment to be given for each type of allowance, the following
              practice will be adopted. <br />
              <br />
              <ol>
                <li style={{ listStyleType: 'square' }} className="p-1">
                  <b className="text-success">Conveyance Allowance</b> : The
                  amount up to Rs.800/- per month will be considered exempt in
                  case of employees who are not provided the Vehicles and/or its
                  running and maintenance expenses.
                </li>
                <li style={{ listStyleType: 'square' }} className="p-1">
                  <b className="text-success">
                    Medical Allowance/Reimbursement
                  </b>{' '}
                  : The employees will be paid on monthly basis as an advance
                  against Medical Expenses which will be adjusted against their
                  annual entitlement of Medical Allowance / Reimbursement as the
                  case may be. However for the purpose of reimbursement, the
                  employees are required to furnish Original Cash Memos/Bills
                  for the expenses actually incurred on medical treatment of
                  self and dependent family members.
                </li>
                <li style={{ listStyleType: 'square' }} className="p-1">
                  <b className="text-success">House Rent Allowance</b> : As
                  permissible under the law, the employees who are not provided
                  the Housing Accommodation whether furnished or not will be
                  entitled to claim exemption. However the employees claiming
                  exemption for the Rent paid to their Direct Relatives or Rent
                  paid for the address other than registered with the company
                  will not be entitled for the exemption.
                </li>
                <li style={{ listStyleType: 'square' }} className="p-1">
                  <b className="text-success">Leave Travel Allowance</b> : The
                  employees can claim Tax exemption as permissible under the law
                  which at present allows expenditure on Journey Fare for self
                  and dependent family members twice in a block of four years
                  commencing from calendar year 1986. For the purpose of
                  claiming exemption, the employees are required to furnish
                  copies of Railway Ticket, Air Ticket or Bills of LTC approved
                  travel agents for the actual expenses incurred on journey
                  fare.
                </li>
              </ol>
            </span>
          </span>
          <span className="first-para px-4">
            All other allowances paid to employees, are entitled for claiming
            Tax exemption as may be permissible under the Income Tax Act.
            However the decision of the management will be final in case of any
            dispute regarding the allowability of the allowance.
          </span>
          <br />
          <span className="first-para px-4">
            For the purpose of calculation of Income Tax, the value of
            perquisites provided to any employee, will be as prescribed under
            the Income Tax Act.
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              Compensation Review
            </h5>
            The management will review performance of all employees at least
            once in each financial year and based on such review, the management
            may revise the compensation of any employee. However the employees
            should not consider such revision as a matter of right.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              Full & Final Settlement
            </h5>
            In case of resignation, termination or cessation from the services
            of the company the employee will be entitled to settle of all dues
            by way of full and final settlement. He/she will be paid any amount
            so due, on the day on which he is relieved. Any amount due on
            account of Gratuity payable by the company will be paid, within 30
            days from the receipt of claim from the employee in the prescribed
            form. However the management reserves the right to withhold payment
            due on full and final settlement in case there is any recovery
            pending from the employee in respect of any advances, loans,
            materials, assets etc. as the case may be.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              Working Hours
            </h5>
            <br />
            The Employees will observe the following <br />
            <ol>
              <li style={{ listStyleType: 'square' }} className="p-1">
                All the employee will work for 48 hours a week (8 hours per day)
                subject to the actual timings of duty fixed by the Management
                from time to time.{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Management will notify any such changes in the working hours by
                way of a circular/notice to that effect
              </li>
            </ol>
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Weekly Off
            </h5>
            The employees shall be entitled to one weekly off as may be declared
            by the management from time to time. At present the employees (T1 &
            T2) appointed at MUMBAI & PUNE are entitled to observe weekly off on
            every Sunday and the employees appointed at FACTORY OR SITE (PAN
            INDIA LOCATIONS) (T3 & T4) are entitled to observe weekly off on AS
            PER THE GIVEN SCHEDULED (It may vary on time to time, Project to
            project and Employee to employee basis). However, the management may
            change days prescribed for weekly off consequent upon Government
            policies.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Overtime
            </h5>
            The employees of T4 shall be entitled for overtime at the rate of
            1.5 times of the respective gross salary for any additional hours of
            work performed as and when required.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Holidays
            </h5>
            The employees, covered under the services rules, shall observe
            holidays as declared by the Management for each calendar year. This
            list will be made available by the 1st January of each year. The
            Management at its discretion, may from time to time alter, delete or
            add holidays to the above
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              Conduct and discipline
            </h5>
            Every employee shall devote his entire time and efforts towards the
            furtherance of business of the company with the highest degree of
            morality and integrity and continuously strive for improvement in
            productivity and profitability.
            <br />
            <br />
            Unless in any case it be otherwise distinctly provided an
            employee’s, services shall be at the disposal of the organization
            and he/she shall serve the organization in its business in such
            capacity and at such place as he may from time to time be directed.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              OBLIGATION TO MAINTAIN SECRECY
            </h5>
            Every employee are required to maintain strictest secrecy regarding
            the company’s affairs and shall not divulge or disclose to any
            person whosoever or make any use whatsoever for their own purpose or
            for any purpose other than that of the company of any information or
            knowledge obtained by them during their employment as to the
            business or affairs of the company or its methods or as to any trade
            secrets, or secret process of the company or drawing. They shall
            also endeavor to prevent any other person to do so.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              EMPLOYEE TO PROMOTE COMPANY’S INTEREST
            </h5>
            Every employee shall serve the organization honestly and faithfully
            and shall use his utmost endeavors to promote the interest of the
            organization and shall show courtesy and attention in all
            transactions and interactions with every person with whom he may
            come in contact in his capacity as an employee of the organization.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              EMPLOYEES NOT TO PARTICIPATE IN POLITICS
            </h5>
            No employee shall take active part in politics or any political
            demonstration or stand for election for any political position.
            Neither shall they participate in any demonstration, which would
            incite an offence as described in ‘The Indian Penal Code’ or any
            other law of the time being in force.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              {' '}
              <br />
              EMPLOYEES TO BE PUNCTUAL
            </h5>
            Every employee is expecting to be regular and punctual in his/her
            attendance at work. An employee shall not absent himself from his
            duties without having first obtained the permission of the competent
            authority. However, in special circumstances like sickness or
            accident the employee may absent without prior permission in that
            case he shall inform the organization at earliest and shall produce
            the necessary evidence justifying such absence.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              ABSENT FROM DUTY
            </h5>
            An employee who absents himself from duty without leave or overstay
            his leave, except under circumstances beyond his control for which
            he must tender a satisfactory explanation, shall not be entitled to
            draw any pay and allowances in respect of the period of such absence
            or overstayed. Such unauthorized absence shall be treated as
            misconduct and employee shall further be liable to such penalties as
            the Management may deem fit. If such absence or overstay is shown to
            be beyond his control and a satisfactory explanation is tendered,
            the period of such absence or overstay may be treated as period
            spend on privilege, sick or extraordinary leave as the Management
            may determine.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              DEALINGS WITH THE PRESS
            </h5>
            No employee shall communicate to the press any thing relating to the
            affairs of the company or publish any paper in any journal/magazine
            without the prior approval/sanction of the Management. They shall
            not participate in or get associated with any radio/television
            broadcast or in publication or in communication to the press or
            publish speech/utterances without prior approval of the Management.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              DEVELOPMENT OF PATENTS
            </h5>
            No employee shall acquire any patent rights of any product /goods/
            process/ drawings which he develops during his employment with the
            company. Any such patent or process improvement becomes property of
            the company and the concerned employee cannot 11 Employee Policy-
            Rev 0 claim any rights, whatsoever. All know how which the employee
            acquires as a result of research and development activity shall pass
            on to the company.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              PRIOR PERMISSION FOR JOINING OUTSIDE COURSE
            </h5>
            In case an employee wishes to join any outside course (part time or
            full time) or undertake any study for his own enhancement, he/she
            would be require to take prior permission from the management. Such
            permission would be granted provided that Management is satisfied
            that such work does not interfere with the performance of duties and
            such study is relevant to his/her job or company’s business.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              DEALINGS WITH COMPANY’S SUPPLIERS/DEALERS/CUSTOMERS
            </h5>
            No employee shall either directly or through any other person or
            relation, is associated with either any supplier of goods/
            materials/ services of the company. Similarly no employee shall have
            either directly or indirectly any business arrangement outside the
            limits of the company’s dealings or use his position for any
            personal benefits to any friend/relation with/for any of the
            company’s customers/agents/suppliers. No employee shall have either
            directly or indirectly any business relationship with company’s
            present suppliers of goods/material/services (including consultants)
            and customers and undertake to dissociate themselves for such
            suppliers/customers as and when directed t do so by the Management.
            <br />
            <br />
            If in future there is likelihood of any conflict of interest on this
            account, prior written approval of the Managing director will be
            necessary, and the decision of the Managing Director will be final
            and binding.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              PRIVATE TRADING & SPECULATION
            </h5>
            No employee shall engage in any commercial business or pursuit
            either on his own account or as an agent for other, nor act as an
            agent for an Insurance company nor shall he be connected with the
            formation of the Management of a joint stock company.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              EMPLOYEES NOT TO TAKE ANY GIFTS
            </h5>
            No employee shall either directly or indirectly accepts gifts either
            in cash or kind whether from any supplier/dealer/customer in India
            or abroad. Any gift received from any sources or from any person
            with whom the company has business dealings should immediately be
            surrendered to the company. An employee of the company shall not
            accept any form of lavish or frequent hospitality from any
            individual or from having official dealings with him.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              CONSUMPOTION OF ALCOHOLICS DRINKS/DRUGS
            </h5>
            No employee shall be under influence of intoxicating drinks or drugs
            in the official premises and adhere to the applicable laws of
            prohibition.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              COMPANY’S PROPERTY/EQUIPMENT
            </h5>
            All employees are requiring handling the company’s
            property/equipment with due diligence and care. They shall return
            all such property/equipment to the company in good condition at the
            time of separation from the company or as and when directed by the
            Management.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              MISBEHAVIOUR WITH WOMAN
            </h5>
            In case an employee is found to misbehave with any woman within the
            office premises or involved in an act of sexual harassment of any
            nature whatsoever, he would be liable for termination from his
            employment.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              EMBEZZLEMENT OF COMPANY’S FUNDS/MONEY
            </h5>
            In case an employee is found to be involved either directly or
            indirectly, individually or collectively in any act of embezzlement
            or misappropriation of money or funds he would be liable for
            termination from his employment.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              TAMPERING WITH OFFICIAL RECORDS
            </h5>
            No employee will tamper with any official record or unauthorized
            destroy any official record or commits a nuisance in the premised of
            the company.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              CONVICTION/ ARREST
            </h5>
            An employee convicted by a court of law or arrested shall at once
            report in writing the fact of his conviction of arrest to
            Management.
          </span>
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              MISCONDUCT
            </h5>
            The following actions of omission and commission inter alias shall
            be treated as misconduct. <br />
            <ol>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Theft, fraud, forgery, embezzlement, misappropriation,
                dishonesty in connection with the business or property of the
                company or property of another employee within the premises of
                the company
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Taking bribes or any illegal gratification.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Making use of one’s position in the company to influence
                business associates or others connected with the company
                business for personal gains.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Acting in a manner prejudicial to the interests of the company.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Willful insubordination or disobedience, whether or not in
                combination with others, of any lawful and reasonable order of
                his superior.{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Absence without leave or overstaying the sanctioned leave
                without sufficient reasons or proper or satisfactory
                explanation.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Habitual late or irregular attendance.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Neglect of work or negligence in the performance of duty
                including malingering or slowing down of work.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Willful damage to any property of the company or to work in
                process.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Interference or tampering with any safety devices installed or
                about the premises of the company.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Drunkenness or riotous or disorderly or indecent behavior in the
                premises of the company or outside such premises where such
                behavior is related to or connected with the employment.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Commission of any act, which amounts to a criminal offense
                involving moral turpitude.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Breach of rules duly notified, or violation of procedures laid
                down in connection with the company’s business.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Abetment of or attempt at abetment of any act, which amounts to
                misconduct.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Taking part in subversive activities
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Tampering with or unauthorized destruction of the official
                record of the company.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Unauthorized disclosure of secret/official information in the
                records of the company.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Absence from the appointed place of work or leaving station
                without permission from the department head or sufficient cause.
              </li>
            </ol>
          </span>

          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              <br />
              GENERAL
            </h5>
            Any employee who commits breach of the above rules or who displays
            negligence, inefficiency or indolence or who knowingly does anything
            detrimental to the interest of the company or in conflict with its
            instructions, or who commits a breach of discipline or is guilty of
            any other act of misconduct, shall be liable to the following
            penalties
            <br />
            <ol>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Warning
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Stoppage of increment
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Recovery from the salary of the whole or part of any pecuniary
                loss caused to the company by the employee.
              </li>
              <li style={{ listStyleType: 'square' }} className="p-1">
                Termination of employment
              </li>
            </ol>
          </span>
        </div>
      </section>

      <PolicyFooter />
    </div>
  );
};

export default StaffPolicy;
