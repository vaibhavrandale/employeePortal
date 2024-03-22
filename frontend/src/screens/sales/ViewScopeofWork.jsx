import React, { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, scopeofwork: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const Viewscopeofwork = () => {
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
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    fetchData();

    // fetchData();
  }, [id, userInfo.token]);
  return (
    <div className="container">
      {' '}
      <div className="card">
        <div className="card-header">
          <h3>
            Scope of Work Details -{' '}
            <div className="badge bg-success">
              {scopeofwork.purchase_order_no}
            </div>{' '}
          </h3>
        </div>

        {loading ? (
          <LoadingBox5 />
        ) : (
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Client Name:</strong> {scopeofwork.client_name}
                </p>
                <p>
                  <strong>Plant Capacity:</strong> {scopeofwork.plant_capacity}
                </p>
                <p>
                  <strong>Purchase Order Number:</strong>{' '}
                  {scopeofwork.purchase_order_no}
                </p>
                <p>
                  <strong>Purchase Order Date:</strong>{' '}
                  {scopeofwork.purchase_order_date}
                </p>
                <p>
                  <strong>Docking Station Frame:</strong>{' '}
                  {scopeofwork.docking_station_frame}
                </p>
                <p>
                  <strong>Solar Module Capacity:</strong>{' '}
                  {scopeofwork.solar_module_capacity}
                </p>
                <p>
                  <strong>Module Mounting Structure:</strong>{' '}
                  {scopeofwork.module_mounting_structure}
                </p>
                <p>
                  <strong>Docking Station Piling:</strong>{' '}
                  {scopeofwork.docking_station_piling}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Gateway Type:</strong> {scopeofwork.gateway_type}
                </p>
                <p>
                  <strong>Internet Connectivity:</strong>{' '}
                  {scopeofwork.internet_connectivity}
                </p>
                <p>
                  <strong>Mounting Pole:</strong> {scopeofwork.mounting_pole}
                </p>
                <p>
                  <strong>Power Supply for Pole:</strong>{' '}
                  {scopeofwork.power_supply_for_pole}
                </p>
                <p>
                  <strong>Bridge Type:</strong> {scopeofwork.bridge_type}
                </p>
                <p>
                  <strong>Bridge Installation:</strong>{' '}
                  {scopeofwork.bridge_installation}
                </p>
                <p>
                  <strong>Reversing Station Type:</strong>{' '}
                  {scopeofwork.reversing_station_type}
                </p>
                <p>
                  <strong>Is Docking Station Returnable:</strong>{' '}
                  {scopeofwork.is_docking_station_returnable}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Docking Station Layers:</strong>{' '}
                  {scopeofwork.docking_station_layers}
                </p>
                <p>
                  <strong>Transportation Scope:</strong>{' '}
                  {scopeofwork.transportation_scope}
                </p>
                <p>
                  <strong>Loading Unloading at Site:</strong>{' '}
                  {scopeofwork.loading_unloading_atsite}
                </p>
                <p>
                  <strong>Movement Within Site:</strong>{' '}
                  {scopeofwork.movement_within_site}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Purlin Extension Scope:</strong>{' '}
                  {scopeofwork.purlin_extension_scope}
                </p>
                <p>
                  <strong>Installation Scope:</strong>{' '}
                  {scopeofwork.installation_scope}
                </p>
                <p>
                  <strong>Submitted By:</strong> {scopeofwork.submittedBy}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewscopeofwork;
