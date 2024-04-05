import React from 'react';
import './taxInvest.css';
const InvestDeclarationForm = () => {
  return (
    <div className="container">
      <h3 className="text-center fw-bold" style={{ color: 'crimson' }}>
        Investment Declaration
      </h3>

      <div className="card p-2 mb-4">
        <form className="row g-3" autoComplete="off">
          <div className="col-md-6">
            <div className="d-flex">
              <label for="80C" className="form-label">
                80C
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">
                  Investment made in Equity Linked Saving Schemes, PPF/SPF/RPF,
                  payments made towards Life Insurance Premiums, principal sum
                  of a home loan, SSY, NSC, SCSS, etc.
                </span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="80C" />
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <label for="80CC" className="form-label">
                80CC
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">Payment made towards pension funds</span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="inputPassword4" />
          </div>

          <div className="col-md-6">
            <div className="d-flex">
              <label for="80CCC" className="form-label">
                80CCC
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">Payment made towards pension funds</span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="inputPassword4" />
          </div>

          <div className="col-md-6">
            <div className="d-flex">
              <label for="80C" className="form-label">
                80CCD(1)
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">
                  Payments made towards Atal Pension Yojana or other pension
                  schemes notified by government
                </span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <label for="80C" className="form-label">
                80CCE
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">
                  Total deduction under Section 80C, 80CCC, 80CCD(1)
                </span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="inputPassword4" />
          </div>

          <div className="col-md-6">
            <div className="d-flex">
              <label for="80C" className="form-label">
                80CCD(1B)
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">
                  Investments in NPS (outside Rs 1,50,000 limit under Section
                  80CCE)
                </span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <label for="80C" className="form-label">
                80CCD(2)
              </label>
              &nbsp;
              <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
                {' '}
                <i className="fas fa-question"></i>
                <span class="tooltip">
                  Employer’s contribution towards NPS (outside Rs 1,50,000 limit
                  under Section 80CCE)
                </span>
                <span class="text"></span>
              </div>
            </div>
            <br />
            <input type="text" className="inputField2 " id="inputPassword4" />
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <label for="80C" className="form-label">
                Regime
              </label>
            </div>
            <br />
            <select
              id="inputState"
              className="inputField2"
              style={{ width: '400px' }}
            >
              <option selected>Choose...</option>
              <option value="old">OLD</option>
              <option value="new">NEW</option>
            </select>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-warning fw-bold p-0 "
              style={{ width: '200px', height: '30px' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestDeclarationForm;
