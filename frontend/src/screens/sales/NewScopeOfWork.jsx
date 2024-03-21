// import React from 'react';

// const NewScopeOfWork = () => {
//   return <div className="container">NewScopeOfWork</div>;
// };

// export default NewScopeOfWork;

import React, { useContext, useReducer, useState } from 'react';
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
      return { ...state, scopeofwork: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_REQUEST':
      return { ...state, loadingCreate: true };

    case 'ADD_SUCCESS':
      return { ...state, scopeofwork: action.payload, loadingCreate: false };

    case 'ADD_FAIL':
      return { ...state, loadingCreate: false, error: action.payload };

    default:
      return state;
  }
};

const NewScopeOfWork = () => {
  const { id } = useParams();
  const [{ loading, loadingCreate }, dispatch] = useReducer(reducer, {
    scopeofwork: {},
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();
  const [client_name, setClientName] = useState('');
  const [plant_capacity, setPlantCapacity] = useState('');
  const [purchase_order_no, setPurchaseOrderNo] = useState('');
  const [purchase_order_date, setPurchaseOrderDate] = useState('');
  const [docking_station_frame, setDockingStationFrame] = useState('');
  const [solar_module_capacity, setSolarModuleCapacity] = useState('');
  const [module_mounting_structure, setModuleMountingStructure] = useState('');
  const [docking_station_piling, setDockingStationPiling] = useState('');
  const [gateway_type, setGatewayType] = useState('');
  const [internet_connectivity, setInternetConnectivity] = useState(false);
  const [mounting_pole, setMountingPole] = useState('');
  const [power_supply_for_pole, setPowerSupplyForPole] = useState('');
  const [bridge_type, setBridgeType] = useState('');
  const [bridge_installation, setBridgeInstallation] = useState('');
  const [reversing_station_type, setReversingStationType] = useState('');
  const [is_docking_station_returnable, setIsDockingStationReturnable] =
    useState(false);
  const [docking_station_layers, setDockingStationLayers] = useState(0);
  const [transportation_scope, setTransportationScope] = useState('');
  const [loading_unloading_atsite, setLoadingUnloadingAtSite] = useState(false);
  const [movement_within_site, setMovementWithinSite] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [purlin_extension_scope, setPurlin_Extension_Scope] = useState('');
  const [installation_scope, setInstallation_scope] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];

    if (!client_name) {
      missingFields.push('Please enter client Name');
    }
    if (!purchase_order_no) {
      missingFields.push('Please enter PO number');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(', ')}`);

      return;
    }
    dispatch({
      type: 'ADD_REQUEST',
    });
    try {
      const { data } = await axios.post(
        `/api/sales/scopeofwork/`,
        {
          client_name,
          plant_capacity,
          purchase_order_no,
          purchase_order_date,
          docking_station_frame,
          solar_module_capacity,
          module_mounting_structure,
          docking_station_piling,
          gateway_type,
          internet_connectivity,
          mounting_pole,
          power_supply_for_pole,
          bridge_type,
          bridge_installation,
          reversing_station_type,
          is_docking_station_returnable,
          docking_station_layers,
          transportation_scope,
          loading_unloading_atsite,
          movement_within_site,
          purlin_extension_scope,
          installation_scope,
          submittedBy,
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
      toast.success('Scope of Work addedd successfully');
      navigate(`/scope-of-work`);
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
        <title>Scope of Work Questionnaire </title>
      </Helmet>
      <h3 className="text-center fw-bold">Scope of Work Questionnaire </h3>
      <div className="card p-2" style={{ width: '650px', margin: 'auto' }}>
        <form>
          <div className="mb-3">
            <label htmlFor="client_name" className="form-label">
              Client Name
            </label>
            <input
              type="text"
              className="inputField3 "
              id="client_name"
              name="client_name"
              value={client_name}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="plant_capacity" className="form-label">
              Plant Capacity
            </label>
            <input
              type="text"
              className="inputField3 "
              id="plant_capacity"
              name="plant_capacity"
              value={plant_capacity}
              onChange={(e) => setPlantCapacity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="purchase_order_no" className="form-label">
              Purchase Order Number
            </label>
            <input
              type="text"
              className="inputField3 "
              id="purchase_order_no"
              name="purchase_order_no"
              value={purchase_order_no}
              onChange={(e) => setPurchaseOrderNo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="purchase_order_date" className="form-label">
              Purchase Order Date
            </label>
            <input
              type="date"
              className="inputField3 "
              id="purchase_order_date"
              name="purchase_order_date"
              value={purchase_order_date}
              onChange={(e) => setPurchaseOrderDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="docking_station_frame" className="form-label">
              Docking Station Frame
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={docking_station_frame}
              onChange={(e) => setDockingStationFrame(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="solar_module_capacity" className="form-label">
              Solar Module Capacity
            </label>
            <input
              type="text"
              className="inputField3 "
              id="solar_module_capacity"
              name="solar_module_capacity"
              value={solar_module_capacity}
              onChange={(e) => setSolarModuleCapacity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="module_mounting_structure" className="form-label">
              Module Mounting Structure
            </label>
            {/* <input
              type="text"
             className="inputField3 "
              id="module_mounting_structure"
              name="module_mounting_structure"
              value={module_mounting_structure}
              onChange={(e) => setModuleMountingStructure(e.target.value)}
            /> */}

            <select
              id="leave"
              className="inputField3 "
              value={module_mounting_structure}
              onChange={(e) => setModuleMountingStructure(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="docking_station_piling" className="form-label">
              Docking Station Piling
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={docking_station_piling}
              onChange={(e) => setDockingStationPiling(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="gateway_type" className="form-label">
              Gateway Type
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={gateway_type}
              onChange={(e) => setGatewayType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Indoor Gateway">Indoor Gateway</option>
              <option value="outdoor Gateway">outdoor Gateway</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="internet_connectivity" className="form-label">
              Internet Connectivity
            </label>

            <select
              id="leave"
              className="inputField3 "
              checked={internet_connectivity}
              onChange={(e) => setInternetConnectivity(e.target.checked)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mounting_pole" className="form-label">
              Mounting Pole
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={mounting_pole}
              onChange={(e) => setMountingPole(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="power_supply_for_pole" className="form-label">
              Power Supply For Pole
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={power_supply_for_pole}
              onChange={(e) => setPowerSupplyForPole(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bridge_type" className="form-label">
              Bridge Type
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={bridge_type}
              onChange={(e) => setBridgeType(e.target.value)}
            >
              <option value="">Select</option>
              <option value="fixed">Fixed Type (End Extensions)</option>
              <option value="hinge">Hinge Type</option>
              <option value="frame">Frame Type</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="bridge_installation" className="form-label">
              Bridge Installation
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={bridge_installation}
              onChange={(e) => setBridgeInstallation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="reversing_station_type" className="form-label">
              Reversing Station Type
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={bridge_installation}
              onChange={(e) => setBridgeInstallation(e.target.value)}
            >
              <option value="">Select</option>
              <option value="End Extensions">End Extensions</option>
              <option value="Frame Type">Frame Type</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="is_docking_station_returnable"
              className="form-label"
            >
              Is Docking Station Returnable
            </label>

            <select
              id="leave"
              className="inputField3 "
              checked={is_docking_station_returnable}
              onChange={(e) => setIsDockingStationReturnable(e.target.checked)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="docking_station_layers" className="form-label">
              Docking Station Layers
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={docking_station_layers}
              onChange={(e) => setDockingStationLayers(e.target.value)}
            >
              <option value="">Select</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="power_supply_for_pole" className="form-label">
                Installations Scope
              </label>

              <select
                id="leave"
                className="inputField3 "
                value={installation_scope}
                onChange={(e) => setInstallation_scope(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Taypro">Taypro</option>
                <option value="client">Client</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="power_supply_for_pole" className="form-label">
                purlin Extension Scope
              </label>

              <select
                id="leave"
                className="inputField3 "
                value={purlin_extension_scope}
                onChange={(e) => setPurlin_Extension_Scope(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Taypro">Taypro</option>
                <option value="client">Client</option>
              </select>
            </div>

            <label htmlFor="transportation_scope" className="form-label">
              Transportation Scope
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={transportation_scope}
              onChange={(e) => setTransportationScope(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>

          {/* loading_unloading_atsite,
          movement_within_site, */}
          {/* submittedBy, */}
          <div className="mb-3">
            <label htmlFor="transportation_scope" className="form-label">
              loading/Unloading At site
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={loading_unloading_atsite}
              onChange={(e) => setLoadingUnloadingAtSite(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="movement_within_site" className="form-label">
              Movement within Site
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={movement_within_site}
              onChange={(e) => setMovementWithinSite(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="hidden"
              className="inputField3 "
              id="submittedBy"
              name="submittedBy"
              value={submittedBy}
              onChange={(e) => setSubmittedBy(e.target.value)}
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

export default NewScopeOfWork;
