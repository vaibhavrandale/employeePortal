import React from 'react';
import PolicyFooter from './PolicyFooter';

const PaidLeaves = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1693812425/wzdesp1oce9ndc5yipep.png';

  return (
    <div className="policy-container py-1">
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading">Paid Leaves Policy</h3>
      </div>

      <section className="policy-section1">
        {/* <h5 className="policy-section1-heading">1] ATTENDANCE</h5> */}
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              1] Objective
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            The primary objective of introducing the Leave policy is to ensure
            employees are provided with a reasonable and regular amount of rest
            and recreation away from work. Some types of leave are introduced
            for personal emergencies. This policy is a guideline for all
            employees to follow and explains the available leave types,
            eligibility and procedure to avail leave.
          </span>
          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              2] Scope and Applicability
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            All employees in the organisation.
          </span>
          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              3] Policy/Process
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            HR owns the leave policy and hence will administer the same
            appropriately. The policies and procedures are subject to change
            from time to time depending on various socio-economic factors or as
            per law and will be decided solely by HR.
          </span>
          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              4] Eligibility
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            All regular and confirmed employees of the organisation are covered
            in the leave policy. Employees who are on probation or hired as
            trainees and whose age more than 60 years It will be not eligible
            for type of leave only. Leave year begins from 1st of April to 31st
            of March each year and will be available only upon completion of
            each year of service. Leave will be credited to individual
            employee’s leave account in advance at the beginning of the year (or
            from the date of confirmation after 6 Month Probation Period), and
            employees can avail of leave in advance during the year. Employees
            who have joined during the year will be eligible for prorated leave
            from the date of confirmation of employment. Any weekly offs or
            declared holidays or national holidays that fall in between leave
            applied by an employee will not be considered as leave days.
          </span>
          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              5] General
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            All leave as provided in these rules is subject to satisfactory
            service of the employee and cannot be claimed as matter of right. It
            will be granted at the convenience of the management and on the
            exigencies of work.
          </span>
          <span className="second-para px-4">
            All the employees will have following leave for every completed year
            of Service, except new specified employees.
          </span>
          <span className="second-para px-4">
            <ul className="my-2">
              <li style={{ listStyleType: 'square' }} className="py-2">
                PRIVILEGE LEAVE -12
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                CASUAL LEAVE -03
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                SICK LEAVE -03
              </li>
            </ul>
          </span>
          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              5.1 ] Privilege Leave
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            <ul>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Every Employee who has worked from April to March in a calendar
                year shall be allowed during the subsequent year Privilege Leave
                with salary for 12 days.{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                An Employee who joins during calendar year and works less than
                one year shall also be eligible to avail privilege leave during
                subsequent calendar year and calculation of his privilege leave
                shall be on pro-rata basis.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                If an Employee leaves the employment of the company after
                confirmation, he shall be entitled for encashment of privilege
                leave on pro-rata basis.{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                If an Employee wants to accumulate the privilege leave, he may
                accumulate the leave which should not exceed 24 days. He shall
                have to forego or encash any leave accumulated beyond 24 days.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                All paid holidays and weekly off falling during the period of
                P.L. shall be considered as PL{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                P.L. cannot be combined with S.L. & CL
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                PL shall be allowed to be accumulated for a maximum of 24 day.
                This Can be Carry Forword for the quantum up to the total three
                years{' '}
              </li>
            </ul>
          </span>

          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              5.2 ] SICK LEAVE
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            <ul>
              <li style={{ listStyleType: 'square' }} className="py-2">
                The Employees are entitled for 03(Three) days sick leave in a
                calendar year and same can be accumulated up to 6 days
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                For S.L. of two days or more, an Employee shall have to produce
                medical certificate from a registered medical practitioner.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                If any employee falls sick, he shall have to avail only S.L.
                available to his credit and he shall be allowed to take P.L.
                only after the S.L. is exhausted.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Any holiday between two S.L. will be considered as S.L.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Sick Leave remained utilized after the two years will lapse. In
                no case, encashment against unutilized Sick Leave will be
                allowed
              </li>
            </ul>
          </span>

          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              5.3 ] CASUAL LEAVE
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            <ul>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Casual leave (C.L.) shall be non-cumulative and no leave of any
                kind shall be combined with C.L., an employee shall be allowed
                to avail 03 (Three) C.L. in a calendar year. All paid Holiday,
                weekly off declared by the company may be prefixed, or suffixed
                to casual leave. C.L. may be availed up to a maximum of 2 (two)
                days at a time.{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                As and when possible prior permission of department head is
                required in writing (by filling up leave card) for availing C.L.
                and when it is not possible, a message or email (through person
                or telephone) should be sent to the concerned department head,
                and he has to complete the leave formality soon after resuming
                duty.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Any holiday between two C.L. will be considered as C.L.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Unutilized C.L. as on 31st December of every calendar year shall
                be lapsed.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                The Employees can avail half day C.L./S.L. in case of
                emergencies.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                If an employee avails the leave during the month, he must
                complete the leave formality (by filling up the leave card)
                before the end of the month otherwise it will be treated as
                absent and proportionate deduction shall be made from the
                salary.{' '}
              </li>
            </ul>
          </span>

          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              6] SHORT LEAVE
            </h5>{' '}
            <br />
          </span>
          <span className="second-para px-4">
            <ul>
              <li style={{ listStyleType: 'square' }} className="py-2">
                It can mean 2 hours coming late to the office, taking a 2-hour
                gap in between or leaving 2-hours early
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Only Two a short leave is allowed in month.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Whenever you feel the need to do so, please obtain prior
                permission of your Partner/Reporting Manager
              </li>
            </ul>
          </span>

          <br />
        </section>
      </section>

      <section className="policy-section1">
        <section className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <h5
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              7] TERMS AND CONDITIONS
            </h5>{' '}
            <br />
            <h6
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              7.1 ] Prefix/Suffix
            </h6>{' '}
          </span>
          <span className="second-para px-4">
            <ul>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Leave taken at the beginning of a work week immediately
                succeeding a weekly off or end of a work week immediately
                preceding a weekly off will be considered as leave days,
                including the weekly off days.
              </li>
            </ul>
          </span>

          <br />
          <span className="first-para px-4">
            <h6
              className="policy-section1-heading  fw-bolder"
              style={{ textTransform: 'uppercase' }}
            >
              7.2] Other Conditions
            </h6>
          </span>
          <span className="second-para px-4">
            <ul>
              <li style={{ listStyleType: 'square' }} className="py-2">
                It is the responsibility of employees to ensure that their
                respective Managers take appropriate action on the leave
                applications before proceeding on leaves.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                If an employee leaves the organisation or becomes ineligible for
                leaves for whatever reason, leave availed in excess of
                eligibility will result in loss of pay (LOP).
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Employees are not allowed to merge two types of leave
                continuously.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                All confirmed employees are eligible for 12 of PL per completed
                year of service. However, employees can avail leave during the
                year in advance as and when credited to their respective
                accounts.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                It is the firm’s policy is that not more than 24 days leave will
                be carried forward from year to year. This means that on January
                1, of a year the maximum leave you can have to your credit is:
                24 days carried forward leave and the current year’s entitlement
                of 12 days, making it a total 36 days. Any excess leave to your
                credit will lapse and be stricken off{' '}
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Leave encashment is allowed only upon termination of the
                contract for any official reason and where the employee has
                unveiled PL leave balance. Encashment is based on monthly basic
                salary, divided by 30 days of the month and multiplied by the
                number of days of unveiled leave balance of the employee.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Grant of leave is at the discretion of the Manager or HR, as the
                case may be, and in line with the ground reality of any
                important assignments or client commitment that cannot be
                compromised.
              </li>
              <li style={{ listStyleType: 'square' }} className="py-2">
                Procedure to avail PL: Employees are required to plan their
                annual vacation at least 1 month in advance and inform their
                managers. Post the discussion and agreement, PL should be
                appropriately applied through leave application or mail.
              </li>
            </ul>
          </span>

          <br />
        </section>
      </section>
      <PolicyFooter />
    </div>
  );
};

export default PaidLeaves;
