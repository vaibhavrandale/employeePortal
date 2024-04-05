import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import toast from 'react-hot-toast';
import { getError } from '../../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loadingSalary: true };

    case 'FETCH_SUCCESS':
      return { ...state, investment: action.payload, loadingSalary: false };

    case 'FETCH_FAIL':
      return { ...state, loadingSalary: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, investment: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

const UpdateInvestment = () => {
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    investment: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { id } = useParams();

  const navigate = useNavigate();

  const Day = new Date();
  const today = Day.getDate();
  const month = Day.getMonth();
  const year = Day.getFullYear();
  const todayDate = `${today}/${month + 1}/${year}`;

  const [Name, setName] = useState();
  const [email, setemail] = useState();
  const [employee_id, setemployee_id] = useState();
  const [A_80C, setA_80C] = useState();
  const [A_80CC, setA_80CC] = useState();
  const [B_80CCC, setB_80CCC] = useState();
  const [C_80CCD_1, setC_80CCD_1] = useState();
  const [D_80CCE, setD_80CCE] = useState();
  const [Regime, setRegime] = useState();
  const [F_80CCD_2, setF_80CCD_2] = useState();
  const [submittedBy, setsubmittedBy] = useState(userInfo.NAME);
  const [submittedAt, setsubmittedAt] = useState(todayDate);

  useEffect(() => {
    const SalaryData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/investment/${id}`);
        //console.log(result.data.investment);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.investment,
        });

        setName(result.data.investment.Name);
        setemail(result.data.investment.email);
        setemployee_id(result.data.investment.employee_id);
        setA_80C(result.data.investment.A_80C);
        setA_80CC(result.data.investment.A_80CC);
        setB_80CCC(result.data.investment.B_80CCC);
        setB_80CCC(result.data.investment.B_80CCC);
        setC_80CCD_1(result.data.investment.C_80CCD_1);
        setD_80CCE(result.data.investment.D_80CCE);
        setRegime(result.data.investment.Regime);
        setF_80CCD_2(result.data.investment.setF_80CCD_2);
        // console.log(result.data.employee.address);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    SalaryData();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Create an array to store the names of empty fields
    const emptyFields = [];

    if (!A_80C) {
      emptyFields.push('Please Enter A_80C');
    }
    if (!A_80CC) {
      emptyFields.push('Please Enter A_80CC');
    }
    if (!B_80CCC) {
      emptyFields.push('Please Enter B_80CCC');
    }
    if (!C_80CCD_1) {
      emptyFields.push('Please Enter C_80CCD_1');
    }
    if (!D_80CCE) {
      emptyFields.push('Please Enter D_80CCE');
    }
    if (!F_80CCD_2) {
      emptyFields.push('Please Enter F_80CCD_2');
    }
    if (!Regime) {
      emptyFields.push('Please Enter Regime');
    }

    // Perform your required field validation here
    if (emptyFields.length > 0) {
      const errorMessage = `Please fill the following fields: ${emptyFields.join(
        ', '
      )} .`;
      // alert(errorMessage);
      toast.error(errorMessage);
      return; // Prevent form submission if any required field is empty
    }

    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/investment/${id}`,
        {
          Name,
          email,
          employee_id,
          A_80C,
          A_80CC,
          B_80CCC,
          C_80CCD_1,
          D_80CCE,
          Regime,
          F_80CCD_2,
          submittedBy,
          submittedAt,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Investment updated successfully', {
        position: 'bottom-right',
      });
      navigate(`/`);
    } catch (err) {
      toast.error(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="container">
      <form className="row g-3" autoComplete="off" onSubmit={submitHandler}>
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
                payments made towards Life Insurance Premiums, principal sum of
                a home loan, SSY, NSC, SCSS, etc.
              </span>
              <span class="text"></span>
            </div>
          </div>
          <br />
          <input
            type="text"
            className="inputField2 "
            id="80C"
            value={A_80C}
            onChange={(e) => setA_80C(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex">
            <label for="80C" className="form-label">
              80CC
            </label>
            &nbsp;
            <div class="tooltip-container d-flex justify-content-center align-items-center  p-2">
              {' '}
              <i className="fas fa-question"></i>
              <span class="tooltip">
                Investment made in Equity Linked Saving Schemes, PPF/SPF/RPF,
                payments made towards Life Insurance Premiums, principal sum of
                a home loan, SSY, NSC, SCSS, etc.
              </span>
              <span class="text"></span>
            </div>
          </div>
          <br />
          <input
            type="text"
            className="inputField2 "
            id="80C"
            value={A_80CC}
            onChange={(e) => setA_80CC(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <div className="d-flex">
            <label for="80C" className="form-label">
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
          <input
            type="text"
            className="inputField2 "
            id="inputPassword4"
            value={B_80CCC}
            onChange={(e) => setB_80CCC(e.target.value)}
          />
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
          <input
            type="text"
            className="inputField2 "
            id="inputEmail4"
            value={C_80CCD_1}
            onChange={(e) => setC_80CCD_1(e.target.value)}
          />
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
          <input
            type="text"
            className="inputField2 "
            id="inputPassword4"
            value={D_80CCE}
            onChange={(e) => setD_80CCE(e.target.value)}
          />
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
          <input
            type="text"
            className="inputField2 "
            id="inputEmail4"
            value={D_80CCE}
            onChange={(e) => setD_80CCE(e.target.value)}
          />
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
          <input
            type="text"
            // className="inputField2 "
            value={F_80CCD_2}
            onChange={(e) => setF_80CCD_2(e.target.value)}
          />
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
            value={Regime}
            onChange={(e) => setRegime(e.target.value)}
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
            {loadingUpdate ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateInvestment;
