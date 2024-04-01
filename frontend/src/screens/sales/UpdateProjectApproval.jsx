// import React from 'react';

// const UpdateProjectApproval = () => {
//   return <div className="container">UpdateProjectApproval</div>;
// };

// export default UpdateProjectApproval;

import React, { useContext, useEffect, useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../utils';

import { Helmet } from 'react-helmet';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, projectapproval: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_REQUEST':
      return { ...state, loadingCreate: true };

    case 'ADD_SUCCESS':
      return {
        ...state,
        projectapproval: action.payload,
        loadingCreate: false,
      };

    case 'ADD_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };

    case 'FETCH_EMPLOYEE_REQUEST':
      return { ...state, loadingEmployees: true };

    case 'FETCH_EMPLOYEE_SUCCESS':
      return { ...state, employees: action.payload, loadingEmployees: false };

    case 'FETCH_EMPLOYEE_FAIL':
      return { ...state, loadingEmployees: false, error: action.payload };

    default:
      return state;
  }
};

const NewProjectApproval = () => {
  const [{ loading, loadingCreate, loadingEmployees, employees }, dispatch] =
    useReducer(reducer, {
      projectapproval: {},
      employees: [],
      loading: true,
      error: '',
    });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const { id } = useParams();

  const navigate = useNavigate();
  const [customer, setcustomer] = useState('');
  const [contact_person, setcontact_person] = useState('');
  const [project_capacity, setproject_capacity] = useState('');
  const [mms_type, setmms_type] = useState('');
  const [BU, setBU] = useState('');
  const [is_feasible_at_cost, setis_feasible_at_cost] = useState('');
  const [distance_to_nearest_city, setdistance_to_nearest_city] = useState('');
  const [final_quote, setfinal_quote] = useState('');
  const [final_quote_date, setfinal_quote_date] = useState('');
  const [project_state, setproject_state] = useState('');
  const [project_approval_status, setproject_approval_status] = useState('');
  const [created_by, setcreated_by] = useState(userInfo.NAME);
  const [sales_director, setsales_director] = useState('');
  const [signature, setsignature] = useState('Signature');
  const [remark, setremark] = useState('');
  const [date_of_approval, setdate_of_approval] = useState('');
  const [date_of_project_closure, setdate_of_project_closure] = useState('');
  const [robot_quantity, setrobot_quantity] = useState('');
  const [site_location, setsite_location] = useState('');

  useEffect(() => {
    const checkPoExistence = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/sales/project-approval/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data.projectapproval,
        });

        setBU(result.data.projectapproval.BU);
        setcustomer(result.data.projectapproval.customer);
        setcontact_person(result.data.projectapproval.contact_person);
        setproject_capacity(result.data.projectapproval.project_capacity);
        setmms_type(result.data.projectapproval.mms_type);
        setdistance_to_nearest_city(
          result.data.projectapproval.distance_to_nearest_city
        );
        setis_feasible_at_cost(result.data.projectapproval.is_feasible_at_cost);
        setfinal_quote(result.data.projectapproval.final_quote);
        setfinal_quote_date(result.data.projectapproval.final_quote_date);
        setproject_state(result.data.projectapproval.project_state);
        setproject_approval_status(
          result.data.projectapproval.project_approval_status
        );
        setcreated_by(result.data.projectapproval.created_by);
        setsales_director(result.data.projectapproval.sales_director);
        setsignature(result.data.projectapproval.signature);
        setremark(result.data.projectapproval.remark);
        setdate_of_approval(result.data.projectapproval.date_of_approval);
        setdate_of_project_closure(
          result.data.projectapproval.date_of_project_closure
        );
        setrobot_quantity(result.data.projectapproval.robot_quantity);
        setsite_location(result.data.projectapproval.site_location);
      } catch (error) {
        console.error('Error checking PO existence:', error);
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    const fetchEmployees = async () => {
      dispatch({ type: 'FETCH_EMPLOYEE_REQUEST' });
      try {
        const result = await axios.get(`/api/employees`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
          type: 'FETCH_EMPLOYEE_SUCCESS',
          payload: result.data.employees,
        });
      } catch (error) {
        console.error('Error checking PO existence:', error);
        dispatch({ type: 'FETCH_EMPLOYEE_FAIL', payload: error.message });
      }
    };

    checkPoExistence();
    fetchEmployees();
  }, [id, userInfo.token]); // Removed purchase_order_no from dependency array

  const directors = employees.filter(
    (employee) => employee.designation === 'Director'
  );
  console.log(directors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];

    if (!customer) {
      missingFields.push('Please enter client Name');
    }

    if (!BU) {
      missingFields.push('Please enter BU');
    }
    if (!contact_person) {
      missingFields.push('Please enter contact person');
    }

    if (!project_capacity) {
      missingFields.push('Please enter project capacity');
    }
    if (!mms_type) {
      missingFields.push('Please select MMS Type');
    }
    if (!is_feasible_at_cost) {
      missingFields.push('Please select feasible At Cost');
    }

    if (!final_quote) {
      missingFields.push('Please  Enter final quote');
    }

    if (!final_quote_date) {
      missingFields.push('Please  Enter Final Quote Date');
    }

    if (!project_state) {
      missingFields.push('Please  Select Project State');
    }
    if (!project_approval_status) {
      missingFields.push('Please  Select Project Approval Status');
    }
    if (!sales_director) {
      missingFields.push('Please  Select sales director');
    }

    if (!remark) {
      missingFields.push('Please Enter remark');
    }

    if (!date_of_approval) {
      missingFields.push('Please Enter date of approval');
    }

    if (!date_of_project_closure) {
      missingFields.push('Please Enter date of project closure');
    }
    if (!signature) {
      missingFields.push('Please Enter signature');
    }
    if (!robot_quantity) {
      missingFields.push('Please Enter Robot Quantity');
    }
    if (!site_location) {
      missingFields.push('Please Enter site location');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(',\n ')}`);

      return;
    }
    dispatch({
      type: 'ADD_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/sales/project-approval/${id}`,
        {
          BU,
          customer,
          contact_person,
          project_capacity,
          mms_type,
          distance_to_nearest_city,
          is_feasible_at_cost,
          final_quote,
          final_quote_date,
          project_state,
          project_approval_status,
          created_by,
          sales_director,
          signature,
          remark,
          date_of_approval,
          date_of_project_closure,
          robot_quantity,
          site_location,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'ADD_SUCCESS',
        payload: data,
      });
      // toast.success('Leave Approved Successfully', {
      //   position: 'bottom-right',
      // });
      toast.success('Project Approval addedd successfully');
      navigate(`/project-approval`);
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'ADD_FAIL' });
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Project Approval </title>
      </Helmet>
      <h3 className="text-center fw-bold">Project Approval</h3>
      <div className=" p-2" style={{ maxWidth: '550px', margin: 'auto' }}>
        <form>
          <div className="mb-3">
            <label htmlFor="client_name" className="form-label">
              BU
            </label>
            <select
              id="leave"
              className="inputField3 "
              value={BU}
              onChange={(e) => setBU(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
              <option value="both">both</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Customer" className="form-label">
              Customer
            </label>
            <input
              type="text"
              className="inputField3 "
              id="customer"
              name="customer"
              value={customer}
              onChange={(e) => setcustomer(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact_person" className="form-label">
              Contact Person
            </label>
            <input
              type="text"
              className="inputField3"
              id="contact_person"
              name="contact_person"
              value={contact_person}
              onChange={(e) => {
                setcontact_person(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="project_capacity" className="form-label">
              Project Capacity
            </label>
            <input
              type="text"
              className="inputField3 "
              id="project_capacity"
              name="project_capacity"
              value={project_capacity}
              onChange={(e) => setproject_capacity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="mms_type" className="form-label">
              MMS type
            </label>
            <select
              id="leave"
              className="inputField3 "
              value={mms_type}
              onChange={(e) => setmms_type(e.target.value)}
            >
              <option value="">Select</option>
              <option value="2P">2P</option>
              <option value="4L">4L</option>
              <option value="5L">5L</option>
              <option value="3P">3P</option>
              <option value="6L">6L</option>
              <option value="7L">7L</option>
              <option value="4P">4P</option>
              <option value="8L">8L</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="distance_to_nearest_city" className="form-label">
              Distance to nearest city
            </label>
            <input
              type="text"
              className="inputField3 "
              id="distance_to_nearest_city"
              name="distance_to_nearest_city"
              value={distance_to_nearest_city}
              onChange={(e) => setdistance_to_nearest_city(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="is_feasible_at_cost" className="form-label">
              Feasible at Cost
            </label>
            <select
              id="leave"
              className="inputField3 "
              value={is_feasible_at_cost}
              onChange={(e) => setis_feasible_at_cost(e.target.value)}
            >
              <option value="">Select</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="final_quote" className="form-label">
              final Quote
            </label>

            <input
              type="text"
              className="inputField3 "
              id="final_quote"
              name="final_quote"
              value={final_quote}
              onChange={(e) => setfinal_quote(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="final_quote_date" className="form-label">
              Final Quote Date
            </label>
            <input
              type="date"
              className="inputField3 "
              id="final_quote_date"
              name="final_quote_date"
              value={final_quote_date}
              onChange={(e) => setfinal_quote_date(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="site_location" className="form-label">
              site Location
            </label>
            <input
              type="text"
              className="inputField3 "
              id="site_location"
              name="site_location"
              value={site_location}
              onChange={(e) => setsite_location(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="robot_quantity" className="form-label">
              robot_quantity
            </label>
            <input
              type="text"
              className="inputField3 "
              id="robot_quantity"
              name="robot_quantity"
              value={robot_quantity}
              onChange={(e) => setrobot_quantity(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="project_state" className="form-label">
              Project State
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={project_state}
              onChange={(e) => setproject_state(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Healthy">Healthy</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="OK">OK</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="project_approval_status" className="form-label">
              Project Approval Status
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={project_approval_status}
              onChange={(e) => setproject_approval_status(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date_of_approval" className="form-label">
              date Of Approval
            </label>
            <input
              type="text"
              className="inputField3 "
              id="date_of_approval"
              name="date_of_approval"
              value={date_of_approval}
              onChange={(e) => setdate_of_approval(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sales_director" className="form-label">
              sales_director
            </label>

            <select
              id="sales_director"
              className="inputField3"
              value={sales_director} // Use value instead of checked for select elements
              onChange={(e) => setsales_director(e.target.value)}
            >
              <option value="">select</option>
              {directors.map((item, index) => (
                <option value={item.NAME} key={index}>
                  {item.NAME}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date_of_project_closure" className="form-label">
              date Of Project Closure
            </label>

            <input
              type="date"
              id="leave"
              className="inputField3 "
              value={date_of_project_closure}
              onChange={(e) => setdate_of_project_closure(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="remark" className="form-label">
              Remark
            </label>

            <textarea
              type="text"
              id="leave"
              className="inputField3 "
              value={remark}
              onChange={(e) => setremark(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="Signature" className="form-label">
              Signature
            </label>

            <textarea
              type="text"
              id="leave"
              className="inputField3 "
              value={signature}
              onChange={(e) => setsignature(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="hidden"
              className="inputField3 "
              id="created_by"
              name="created_by"
              value={created_by}
              onChange={(e) => setcreated_by(e.target.value)}
            />
          </div>

          <div className="mb-3 d-flex justify-content-end fw-bold">
            <Link
              type="submit"
              onClick={handleSubmit}
              className="btn btn-sm btn-warning"
            >
              {loadingCreate ? (
                <>
                  submitting...
                  <LoadingBox4 />
                </>
              ) : (
                'Submit'
              )}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectApproval;
