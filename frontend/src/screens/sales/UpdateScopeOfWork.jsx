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
      return { ...state, scopeofwork: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, scopeofwork: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

    default:
      return state;
  }
};

const UpdateScopeOfWork = () => {
  const [{ loading, loadingUpdate, scopeofwork }, dispatch] = useReducer(
    reducer,
    {
      scopeofwork: {},
      loading: true,
      error: '',
    }
  );
  const { id } = useParams();
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
  const [internet_connectivity, setInternetConnectivity] = useState('');
  const [mounting_pole, setMountingPole] = useState('');
  const [power_supply_for_pole, setPowerSupplyForPole] = useState('');
  const [bridge_type, setBridgeType] = useState('');
  const [bridge_installation, setBridgeInstallation] = useState('');
  const [reversing_station_type, setReversingStationType] = useState('');
  const [is_docking_station_returnable, setIsDockingStationReturnable] =
    useState('');
  const [docking_station_layers, setDockingStationLayers] = useState(0);
  const [transportation_scope, setTransportationScope] = useState('');
  const [loading_unloading_atsite, setLoadingUnloadingAtSite] = useState('');
  const [movement_within_site, setMovementWithinSite] = useState('');
  const [submittedBy, setSubmittedBy] = useState(userInfo.NAME);
  const [purlin_extension_scope, setPurlin_Extension_Scope] = useState('');
  const [installation_scope, setInstallation_scope] = useState('');

  useEffect(() => {
    // Simulate API call or data fetching
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/sales/scopeofwork/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.scopeofwork });
        console.log(result.data);

        setClientName(result.data.scopeofwork.client_name);
        setPlantCapacity(result.data.scopeofwork.plant_capacity);
        setPurchaseOrderNo(result.data.scopeofwork.purchase_order_no);
        setPurchaseOrderDate(result.data.scopeofwork.purchase_order_date);
        setDockingStationFrame(result.data.scopeofwork.docking_station_frame);
        setSolarModuleCapacity(result.data.scopeofwork.solar_module_capacity);
        setModuleMountingStructure(
          result.data.scopeofwork.module_mounting_structure
        );
        setDockingStationPiling(result.data.scopeofwork.docking_station_piling);
        setInternetConnectivity(result.data.scopeofwork.internet_connectivity);
        setGatewayType(result.data.scopeofwork.gateway_type);
        setMountingPole(result.data.scopeofwork.mounting_pole);
        setPowerSupplyForPole(result.data.scopeofwork.power_supply_for_pole);
        setBridgeType(result.data.scopeofwork.bridge_type);
        setGatewayType(result.data.scopeofwork.gateway_type);
        setBridgeInstallation(result.data.scopeofwork.bridge_installation);
        setReversingStationType(result.data.scopeofwork.reversing_station_type);
        setIsDockingStationReturnable(
          result.data.scopeofwork.is_docking_station_returnable
        );
        setDockingStationLayers(result.data.scopeofwork.docking_station_layers);
        setTransportationScope(result.data.scopeofwork.transportation_scope);
        setLoadingUnloadingAtSite(
          result.data.scopeofwork.loading_unloading_atsite
        );
        setPurlin_Extension_Scope(
          result.data.scopeofwork.purlin_extension_scope
        );
        setMovementWithinSite(result.data.scopeofwork.movement_within_site);
        setInstallation_scope(result.data.scopeofwork.installation_scope);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [id, userInfo.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missingFields = [];

    if (!client_name) {
      missingFields.push('Please enter Client Name');
    }
    if (!plant_capacity) {
      missingFields.push('Please enter plant capacity');
    }
    if (!purchase_order_no) {
      missingFields.push('Please enter PO number');
    }
    if (!purchase_order_date) {
      missingFields.push('Please enter purchase order date');
    }
    if (!purchase_order_date) {
      missingFields.push('Please enter purchase order date');
    }
    if (!docking_station_frame) {
      missingFields.push('Please select docking station Frame Type');
    }
    if (!solar_module_capacity) {
      missingFields.push('Please Enter solar module capacity');
    }
    if (!module_mounting_structure) {
      missingFields.push('Please Enter module mounting structure');
    }
    if (!docking_station_piling) {
      missingFields.push('Please Enter docking station piling');
    }
    if (!gateway_type) {
      missingFields.push('Please select gateway type');
    }
    if (!internet_connectivity) {
      missingFields.push('Please select internet connectivity');
    }

    if (!mounting_pole) {
      missingFields.push('Please select mounting pole');
    }
    if (!power_supply_for_pole) {
      missingFields.push('Please select power supply for pole');
    }
    if (!power_supply_for_pole) {
      missingFields.push('Please select power supply for pole');
    }

    if (!bridge_type) {
      missingFields.push('Please select bridge type');
    }

    if (!bridge_installation) {
      missingFields.push('Please select bridge installation');
    }
    if (!reversing_station_type) {
      missingFields.push('Please select reversing station type');
    }
    if (!is_docking_station_returnable) {
      missingFields.push('Please select docking station returnable or not');
    }

    if (!docking_station_layers) {
      missingFields.push('Please select docking station layers');
    }

    if (!docking_station_layers) {
      missingFields.push('Please select docking station layers');
    }

    if (!transportation_scope) {
      missingFields.push('Please select transportation scope');
    }
    if (!loading_unloading_atsite) {
      missingFields.push('Please select loading unloading atsite');
    }
    if (!movement_within_site) {
      missingFields.push('Please select movement within site');
    }
    if (!purlin_extension_scope) {
      missingFields.push('Please select purlin extension scope');
    }
    if (!installation_scope) {
      missingFields.push('Please select installation scope');
    }

    if (missingFields.length > 0) {
      toast.error(`${missingFields.join(',\n ')}`);

      return;
    }
    dispatch({
      type: 'UPDATE_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/sales/scopeofwork/${id}`,
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
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      // toast.success('Leave Approved Successfully', {
      //   position: 'bottom-right',
      // });
      toast.success('Scope of Work Updated successfully');
      navigate(`/scope-of-work`);
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
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
              <option value="Client">Client</option>
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
             className="inputField3 " required
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
              <option value="Client">Client</option>
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
              <option value="Client">Client</option>
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
              <option value="Outdoor Gateway">Outdoor Gateway</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="internet_connectivity" className="form-label">
              Internet Connectivity
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={internet_connectivity}
              onChange={(e) => setInternetConnectivity(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Taypro">Taypro</option>
              <option value="Client">Client</option>
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
              <option value="Client">Client</option>
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
              <option value="Client">Client</option>
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
              <option value="Fixed Type (End Extensions)">
                Fixed Type (End Extensions)
              </option>
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
              <option value="Client">Client</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="reversing_station_type" className="form-label">
              Reversing Station Type
            </label>

            <select
              id="leave"
              className="inputField3 "
              value={reversing_station_type}
              onChange={(e) => setReversingStationType(e.target.value)}
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
              value={is_docking_station_returnable}
              onChange={(e) => setIsDockingStationReturnable(e.target.value)}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
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
                required
                value={installation_scope}
                onChange={(e) => setInstallation_scope(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Taypro">Taypro</option>
                <option value="Client">Client</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="power_supply_for_pole" className="form-label">
                purlin Extension Scope
              </label>

              <select
                id="leave"
                className="inputField3 "
                required
                value={purlin_extension_scope}
                onChange={(e) => setPurlin_Extension_Scope(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Taypro">Taypro</option>
                <option value="Client">Client</option>
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
              <option value="Client">Client</option>
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
              <option value="Client">Client</option>
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
              <option value="Client">Client</option>
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
              {loadingUpdate ? (
                <>
                  Updating...
                  <LoadingBox4 />
                </>
              ) : (
                'Update'
              )}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScopeOfWork;
