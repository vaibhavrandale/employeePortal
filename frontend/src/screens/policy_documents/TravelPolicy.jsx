import React from 'react';
import PolicyFooter from './PolicyFooter';
import { Helmet } from 'react-helmet';
const TravelPolicy = () => {
  const logo =
    'https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png';

  return (
    <div className="policy-container py-1">
      <Helmet>
        <title>Travel Policy</title>
      </Helmet>
      <div className=" policy-heading-container">
        <img src={logo} className="policy-logo " alt="" />
        <h3 className="policy-heading">Travel Policy</h3>
      </div>

      <section className="policy-section1">
        {/* <h5 className="policy-section1-heading">Dear Team,</h5> */}
        <h5 className="policy-section1-heading">1] Purpose</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            This policy is written to establish a uniform system of expenditure
            allowable to employees when they travel outstation on Company
            business after taking written approval from the reporting
            Manager/competent Authority. The policy provides for a flat rate
            allowance as a recommended alternative to specified categories of
            employees. It also provides a set of procedures so that issues of
            advances, settlement of accounts, reimbursements, etc. can be
            carried out consistently and promptly. <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">
          2] DEFINITION OF OUTSTATION TRAVEL:
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Outstation Travel is defined as an outstation journey required to be
            undertaken by an employee for official work for a period necessarily
            requiring an overnight stay or overnight travel. <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">3] SCOPE :</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            This policy applies to all employees of TAYPRO PRIVATE LIMITED.
            traveling within India on official business where the duration of an
            overnight stay or overnight travel extends up to a maximum of{' '}
            <b>
              seven consecutive days. The period of seven days may be extended
              where justified by the Reporting Manager/Competent Authority,
              however, this policy is not to apply in cases where an employee is
              expected to be based at a different location for extended periods
              of time.
            </b>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">
          4] REIMBURSEMENT LIMITS APPLICABLE TO ACTUAL EXPENSES :
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The employees in Grades M1 to M5 will be reimbursed EITHER at actual
            against supporting bills/vouchers subject to the following limits
            mentioned below OR per Flat rate allowance specified in Para 5.0 .
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">LODGING :</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Accommodation - Rates are to be reduced by 35% in case of
                      a Trip exceeding 7 Days
                    </th>
                    <th className="text-center">"A" class City</th>
                    <th className="text-center">"B" class City</th>
                    <th className="text-center">"C" class City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">T-1</td>
                    <td className="text-center">Directors/CEO</td>

                    <td className="text-center">2500</td>
                    <td className="text-center">2200</td>
                    <td className="text-center">1100</td>
                  </tr>
                  <tr>
                    <td className="text-center">T-2</td>

                    <td className="text-center">
                      Head of the department/Managers
                    </td>

                    <td className="text-center">2000</td>
                    <td className="text-center">1500</td>
                    <td className="text-center">1000</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-3</td>
                    <td className="text-center">
                      Asst. General Manager/Asst. HOD/Engineers
                    </td>

                    <td className="text-center">1500</td>
                    <td className="text-center">1000</td>
                    <td className="text-center">800</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-4</td>
                    <td className="text-center">
                      Site Technicians/Labours/Workers
                    </td>

                    <td className="text-center">1000</td>
                    <td className="text-center">800</td>
                    <td className="text-center">700</td>
                  </tr>
                </tbody>
              </table>
              The limits mentioned above refer to room rent plus service charges
              if any. All other taxes like luxury tax, expenditure tax, GST,
              etc., are excluded from this limit.
            </div>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">3] FOOD AND BEVERAGES: </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Food & Beverages
                    </th>
                    <th className="text-center">"A" class City</th>
                    <th className="text-center">"B" class City</th>
                    <th className="text-center">"C" class City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">T-1</td>
                    <td className="text-center">Directors/CEO</td>

                    <td className="text-center">850</td>
                    <td className="text-center">750</td>
                    <td className="text-center">650</td>
                  </tr>
                  <tr>
                    <td className="text-center">T-2</td>

                    <td className="text-center">
                      Head of the department/Managers
                    </td>

                    <td className="text-center">700</td>
                    <td className="text-center">600</td>
                    <td className="text-center">500</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-3</td>
                    <td className="text-center">
                      Asst. General Manager/Asst. HOD/Engineers
                    </td>

                    <td className="text-center">600</td>
                    <td className="text-center">500</td>
                    <td className="text-center">400</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-4</td>
                    <td className="text-center">
                      Site Technicians/Labours/Workers
                    </td>

                    <td className="text-center">500</td>
                    <td className="text-center">400</td>
                    <td className="text-center">300</td>
                  </tr>
                </tbody>
              </table>
              The above rates are exclusive of all taxes and in-built service
              charges. Employees should not consider this as a lumpsum amount
              and Bills to the maximum extent should be provided
            </div>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">4] OUT-OF-POCKET EXPENSES:</h5>
        <p className="policy-section1-heading text-muted">
          (e.g. Portage, Reading materials, Laundry, Mineral water, etc.)
        </p>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <div className="table-responsive">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Out of Pocket Expenses
                    </th>
                    <th className="text-center">"A" class City</th>
                    <th className="text-center">"B" class City</th>
                    <th className="text-center">"C" class City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">T-1</td>
                    <td className="text-center">Directors/CEO</td>

                    <td className="text-center">20</td>
                    <td className="text-center">150</td>
                    <td className="text-center">150</td>
                  </tr>
                  <tr>
                    <td className="text-center">T-2</td>

                    <td className="text-center">
                      Head of the department/Managers
                    </td>

                    <td className="text-center">150</td>
                    <td className="text-center">125</td>
                    <td className="text-center">125</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-3</td>
                    <td className="text-center">
                      Asst. General Manager/Asst. HOD/Engineers
                    </td>

                    <td className="text-center">125</td>
                    <td className="text-center">125</td>
                    <td className="text-center">100</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-4</td>
                    <td className="text-center">
                      Site Technicians/Labours/Workers
                    </td>

                    <td className="text-center">110</td>
                    <td className="text-center">100</td>
                    <td className="text-center">75</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">5] FLAT ALLOWANCE : </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Employees can avail of a Flat Allowance in place of claiming actual
            expenses as an alternative. This Flat Allowance will cover Lodging,
            food and beverages, laundry, out-of-pocket expenses, etc. No
            supporting bills/vouchers will be required for claiming a flat rate
            allowance. Under no circumstances actual and flat rates both can be
            claimed on one trip to the same location. Flat Allowance will be
            allowed on 24 Hour basis from the time of reaching the destination
            to the time of arriving back to the base station. <br />
            <p> The following limits will be applicable </p>
            <div className="table-responsive">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Flat Allowance - Rates to be reduced by 35% in case of
                      Trip exceeding 7 Days
                    </th>
                    <th className="text-center">"A" class City</th>
                    <th className="text-center">"B" class City</th>
                    <th className="text-center">"C" class City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">T-1</td>
                    <td className="text-center">Directors/CEO</td>

                    <td className="text-center">2500</td>
                    <td className="text-center">2000</td>
                    <td className="text-center">1500</td>
                  </tr>
                  <tr>
                    <td className="text-center">T-2</td>

                    <td className="text-center">
                      Head of the department/Managers
                    </td>

                    <td className="text-center">1500</td>
                    <td className="text-center">1200</td>
                    <td className="text-center">1000</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-3</td>
                    <td className="text-center">
                      Asst. General Manager/Asst. HOD/Engineers
                    </td>

                    <td className="text-center">1500</td>
                    <td className="text-center">1200</td>
                    <td className="text-center">1000</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-4</td>
                    <td className="text-center">
                      Site Technicians/Labours/Workers
                    </td>

                    <td className="text-center">1000</td>
                    <td className="text-center">900</td>
                    <td className="text-center">800</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">
          6] DAY TRIPS – (For employees in all Grades) :
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            For day trips without overnight stay or travel, the limits for Lunch
            and Dinner will be applicable as per the Provisions and terms &
            conditions prescribed in the Policy on food and beverage above. In
            addition, an Out of pocket allowance referred to at para 4.0 above
            will be provided. <br />
            <b>Note:</b> The approving manager will ensure that no overnight is
            allowed, If the task can be accomplished within the day trip only.
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">
          7] FOOD AND BEVERAGES WITH COMPANY PERSONNEL :
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Only departmental in-charge on tour can entertain other locational
            company employees on exceptional cases and not on regular basis as
            per the limits prescribed herein below.
            <br />
            <div className="border border-dark d-flex flex-column justify-content-between w-50 m-auto">
              <div className="d-flex">
                <div className="border border-dark w-50 d-flex justify-content-center p-2 fw-bold">
                  GRADE
                </div>
                <div className="border border-dark w-50 d-flex justify-content-center p-2 fw-bold">
                  LIMITS
                </div>
              </div>
              <div className="d-flex">
                <div className="border border-dark w-50 d-flex justify-content-center p-2 ">
                  T1 & T2 GRADE
                </div>
                <div className="border border-dark w-50 d-flex justify-content-center p-2">
                  Maximum 500/- per employee
                </div>
              </div>
            </div>
            <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">8] ALCOHOLIC BEVERAGES :</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The Company does not encourage consumption of alcoholic beverages on
            Company account by employees on tour. Employees should restrict 4
            Travel Policy- Rev 0 consumption of alcoholic beverages, at most to
            the equivalent to one bottle of beer within the limits mentioned in
            this policy.
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">
          9] CUSTOMER ENTERTAINMENT WHILE ON TOUR :{' '}
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Vice President, General Managers & Managers are allowed to entertain
            customer/other relevant authority, where it is necessary for
            business development. <br /> <br />
            Expenses limits specified below and the expense limit per person
            which includes service charges but exclusive of taxes. <br />
            <br />
            <div className="table-responsive">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th className="text-center"></th>
                    <th className="text-center">No of guests allowed</th>
                    <th className="text-center">A City</th>
                    <th className="text-center">B City</th>
                    <th className="text-center">C City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">Directors/CEO [T1 GRADE]</td>
                    <td className="text-center">4</td>

                    <td className="text-center">1500</td>
                    <td className="text-center">1000</td>
                    <td className="text-center">750</td>
                  </tr>

                  <tr>
                    <td className="text-center">Managers [T2 Grade]</td>
                    <td className="text-center">2</td>

                    <td className="text-center">750</td>
                    <td className="text-center">600</td>
                    <td className="text-center">500</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">10] MODE OF TRAVEL :</h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The following table specifies the normal mode of travel in
            connection with Company’s business unless otherwise a higher mode is
            specifically authorized with reasons by authorized signatories under
            the Policy.
            <br />
            <br />
            <div className="table-responsive">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Mode of Travel
                    </th>
                    <th className="text-center">
                      Mode of Local Conveyance while on tour
                    </th>
                    <th className="text-center">Mode of Travel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">T-1</td>
                    <td className="text-center">Directors/CEO</td>

                    <td className="text-center ">
                      Air journey in economy class.
                      <hr />
                      <tr>
                        <td className="text-center ">
                          Two Tier AC / AC Chair Car by train in case of
                          destination which can be reached by overnight train
                          journey.
                        </td>
                      </tr>
                    </td>
                    <td className="text-center ">
                      Air journey in economy class.
                      <hr />
                      <tr>
                        <td className="text-center ">
                          Two Tier AC / AC Chair Car by train in case of
                          destination which can be reached by overnight train
                          journey.
                        </td>
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-center">T-2</td>
                    <td className="text-center">
                      Head of the department/Managers
                    </td>

                    <td className="text-center ">
                      <tr>
                        <td className="text-center ">
                          Two Tier AC/ AC Chair Car/1st Class Railway however
                          Air Journey may be permitted provided prior approval
                          is obtained
                        </td>
                      </tr>
                    </td>
                    <td className="text-center ">
                      <tr>
                        <td className="text-center ">
                          Two Tier AC/ AC Chair Car/1st Class Railway however
                          Air Journey may be permitted provided prior approval
                          is obtained
                        </td>
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-center">T-3</td>
                    <td className="text-center">
                      Asst. General Manager/Asst. HOD/Engineers
                    </td>

                    <td className="text-center ">
                      <tr>
                        <td className="text-center ">
                          Two Tier AC / Three Tier AC / AC Chair Car / 1st Class
                          Railway
                        </td>
                      </tr>
                    </td>
                    <td className="text-center ">
                      <tr>
                        <td className="text-center ">
                          Two Tier AC / Three Tier AC / AC Chair Car / 1st Class
                          Railway
                        </td>
                      </tr>
                    </td>
                  </tr>

                  <tr>
                    <td className="text-center">T-4</td>
                    <td className="text-center">
                      Site Technicians/Labours/Workers
                    </td>

                    <td className="text-center ">2nd Class Railway / Bus</td>
                    <td className="text-center ">2nd Class Railway / Bus</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <br />
            <h5 className="policy-section1-heading">Notes :</h5>
            <span className="first-para px-4">
              <ol>
                <li>
                  Persons authorized to travel by air must select the Airlines
                  on cost considerations. No Air travel will be allowed, and the
                  destination can be reached by overnight train journey. Only
                  grade M1 employees may be permitted in exceptional cases with
                  the prior written approval of a Director. Any additional
                  charges paid for the convenience of travel (Seat Choice, etc.)
                  except nominal charges of the ticket will be borne by the
                  employee.
                </li>
                <br />
                <li>
                  <b>For Train Journey :</b>
                  <ol>
                    <li style={{ listStyleType: 'number' }}>
                      For train journey, tickets should be attached to the
                      travel expense statement in all the cases, irrespective of
                      the class of travel.
                    </li>
                    <li style={{ listStyleType: 'number' }}>
                      It is encouraged to book the ticket using ONLINE facility
                      of IRCTC. In case the ticket is booked by employee
                      through, agent, agent’s booking charges up to a maximum of
                      Rs. 50/- can be claimed.
                    </li>
                    <li style={{ listStyleType: 'number' }}>
                      Any cancellation of tickets booked directly or through
                      company are to be justified with reasons and approved by
                      reporting manager.
                    </li>
                  </ol>
                </li>
                <br />
                <li>
                  In the Case of Car Hire, the official Printed Receipt must be
                  provided along with the justification.
                </li>
              </ol>
            </span>
            <br /> <br />
          </span>
        </div>

        <h5 className="policy-section1-heading">
          6] DAY TRIPS – (For employees in all Grades) :
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            <ol className="my-2">
              <li style={{ listStyleType: 'number' }} className="py-2">
                All categories of employees will fly in Economy Class
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                Insurance Coverage will be borne by the company separately
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                Except for Local Conveyance and Food, employees should use Card
                instead of TCs & Cash
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                Daily Allowance entitlement covers all expenses on Food, Water
                Bottle, Laundry etc. for which employee is not required to
                furnish bills
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                Daily Allowance will be considered on 24 Hrs basis from the
                reaching to the destination
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                Daily Allowance stated below is for the first 10 Days of trip
                and in case of additional days the same is to be increased by
                50% for the additional days only [Only when all expenses are on
                TAYPRO Account].
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                Hotel Accommodation Limits stated below are inclusive of
                Breakfast and Service Charges. Taxes if any shall be separate.
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                In case where the customer will be bearing all lodging &
                boarding expenses as per his purchase order, the employee will
                get USD 15 per day as out of pocket expenses. Against these out
                of pocket expenses, he / she does not need to submit any proofs
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                In case where the customer has agreed to bear only the lodging
                cost, the employee will get USD 50 per day for his out of pocket
                expenses against which he has to submit proofs (includes, lunch
                / dinner, water, laundry). In this case, the employee cannot
                charge the company for his hotel stay charges.
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                In case where the customer has agreed to bear only the boarding
                cost (highly unlikely), the employee will get USD 15 per day as
                out of pocket expenses against which no proof submission is
                required. In this case, the employee will also get the hotel
                stay expenses as per his category, as outlined in the policy.
              </li>
            </ol>

            <div className="table-responsive mt-2">
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <th colSpan={2} className="text-center">
                      Overseas Daily Allowance & Accommodation Limits [USD Per
                      Day]
                    </th>

                    <th className="text-center" colSpan={2}>
                      US & Europe
                      <br />
                      <div className="d-flex justify-content-between ">
                        <span className="">Day</span>
                        <span>Stay</span>
                      </div>
                    </th>
                    <th className="text-center" colSpan={2}>
                      others <br />
                      <div className="d-flex justify-content-between ">
                        <span className="">Day</span>
                        <span>Stay</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">T-1</td>
                    <td className="text-center">Directors/CEO</td>

                    <td className="text-center">50</td>
                    <td className="text-center">175</td>
                    <td className="text-center">40</td>
                    <td className="text-center">135</td>
                  </tr>
                  <tr>
                    <td className="text-center">T-2</td>

                    <td className="text-center">
                      Head of the department/Managers
                    </td>

                    <td className="text-center">50</td>
                    <td className="text-center">125</td>
                    <td className="text-center">40</td>
                    <td className="text-center">95</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-3</td>
                    <td className="text-center">
                      Asst. General Manager/Asst. HOD/Engineers
                    </td>

                    <td className="text-center">50</td>
                    <td className="text-center">125</td>
                    <td className="text-center">40</td>
                    <td className="text-center">95</td>
                  </tr>{' '}
                  <tr>
                    <td className="text-center">T-4</td>
                    <td className="text-center">
                      Site Technicians/Labours/Workers
                    </td>

                    <td className="text-center">40</td>
                    <td className="text-center">90</td>
                    <td className="text-center">32</td>
                    <td className="text-center">70</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </span>
        </div>

        <h5 className="policy-section1-heading">
          12] TRAVEL PLAN APPROVAL AND TRIP COMPLETION REPORTTRAVEL PLAN
          APPROVAL AND TRIP COMPLETION REPORT
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            Requisition for traveling advance should be submitted to accounts in
            duplicate. <br />
            <br />
            Traveling advance requisition must be accomplished by “TRAVEL PLAN
            APPROVAL” report in the prescribed format. In case where, fixed rate
            allowance is applicable, the amount of advance shall not exceed 100%
            of the applicable fixed rate for the duration of stay.
            <br />
            <br />
            Travel expense report shall be accomplished by “TRIP COMPLETION
            REPORT” in the prescribed format and duly approved by the Dept/
            Functional heads. Accounts will not be settled without approved
            ‘TRIP COMPLETION REPORT’.
          </span>
        </div>

        <h5 className="policy-section1-heading mt-2">
          13] ADMINISTRATIVE PROCEDURES RELATED TO TRAVEL FOR EMPLOYEES BASED AT
          Mumbai/Pune <br />
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;TRAVEL EXPENSE REPORT (TER)
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            On completion of tour, travel expense report should be immediately
            submitted to department head or immediate superior who has been
            authorized to approve the expenses voucher.
            <br />
            <br />
            The departmental head would be responsible to ensure that all
            expenses are claimed within the policy or otherwise reasonable and
            valid before recording his approval.
            <br />
            <br />
            After approval, if the expense exceeds the advances, TER shall be
            sent to accounts department.
            <br />
            <br />
            If the advance exceeds the local expenses, the approved TER should
            be submitted directly to the cashier together with the amount due to
            the company. The cashier shall issue a cash receipt for the amount
            refunded. The travel expenses statement so submitted shall be
            subject to verification, and in the event of any discrepancy the
            difference payable by the Company or the traveler shall be settled
            forthwith in cash/cheque.
          </span>
        </div>

        <h5 className="policy-section1-heading mt-2">
          13] FOR EMPLOYEES BASED AT FACTORY AND REGIONAL OFFICES:
        </h5>
        <div className="d-flex flex-column first-para-container">
          <span className="first-para px-4">
            The classification of cities for the purpose of this policy will be
            as under.
            <br />
            <br />
            <ol className="my-2">
              <li style={{ listStyleType: 'number' }} className="py-2">
                <ul>
                  <li style={{ listStyleType: 'number' }}>
                    <b>A Cities :</b> Bombay, Calcutta, Delhi, Chennai,
                    Bengaluru, New Bombay, Hyderabad (including Secunderabad),
                    Ahmedabad. Gurgaon, Noida, Pune
                  </li>
                  <li style={{ listStyleType: 'number' }}>
                    <b>B Cities</b> Allahabad, Amritsar, Bhopal, Bhubaneshwar,
                    Chandigarh, Cochin, Cuttack, Guwahati, Goa, Indore, Imphal,
                    Jaipur, Jamnagar, Jamshedpur, Kanpur, Kota, Lucknow,
                    Madurai, Manglore, Nagpur, Patna, Panjim, Vadodara, Rochi,
                    Rajkot, Shillong, Surat, Trivendrum, Trichy, Udaipur,
                    Varanasi, Vishakhapatnam.
                  </li>
                  <li style={{ listStyleType: 'number' }}>
                    <b>C Cities</b> All other cities will be considered as ‘C’
                    class cities.
                  </li>
                </ul>
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                The expense statements shall be supported by vouchers wherever
                applicable (including tickets purchased by the Company through
                the travel agents). In the absence of insufficient and
                non-suitable supporting, the expenses claimed would be
                disallowed.
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                All travel expenses must be settled within ten working days of
                completion of the tour. An advance paid in one month would be
                liable to be deducted from the salary if not settled by the 10th
                of the following month.
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                All employees should settle the total hotel bills of their own
                and attach the same along with the travel expenses statement in
                the case where actual expenses are claimed within the limits
                specified under this policy.
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                On a specific request in writing local offices can arrange to
                book the hotel or taxi for the travelling employee, However
                employees has to pay for the Hotel and Taxi and obtain the
                receipt, which should be claimed at the time of submission of
                bill. Company shall not pay to any hotel or taxi. This can have
                exemption only for Director/ President/Vice President/ General
                Manager. This may not be applicable if some mass booking is done
                by the Company for any conference etc.
              </li>
              <li style={{ listStyleType: 'number' }} className="py-2">
                The Policy shall be reviewed for removal of practical
                difficulties and to respond to changing situations once every
                six months in March and September. Recommendations may be sent
                to the Manager H.R. for consideration by management and
                revisions issued effective April and October. The Management
                reserves the right, to amend, alter, change or withdraw any or
                all the service conditions, governing employment without notice
                and without assigning any reason thereof.
              </li>
            </ol>
          </span>
        </div>
      </section>

      <PolicyFooter />
    </div>
  );
};

export default TravelPolicy;
