import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Assuming you have a sequelize instance
// UID, NAME, Reg_no, email, Contact_No
const ScopeofWork = sequelize.define('ScopeofWork', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  client_name: {
    type: DataTypes.STRING,
  },

  plant_capacity: {
    type: DataTypes.STRING,
  },
  purchase_order_no: {
    type: DataTypes.STRING,
    unique: true, // Enforce uniqueness
  },

  purchase_order_date: {
    type: DataTypes.STRING,
  },

  docking_station_frame: {
    type: DataTypes.STRING,
  },
  solar_module_capacity: {
    type: DataTypes.STRING,
  },
  module_mounting_structure: {
    type: DataTypes.STRING,
  },

  docking_station_piling: {
    type: DataTypes.STRING,
  },

  gateway_type: {
    type: DataTypes.STRING,
  },
  internet_connectivity: {
    type: DataTypes.STRING,
  },
  mounting_pole: {
    type: DataTypes.STRING,
  },
  power_supply_for_pole: {
    type: DataTypes.STRING,
  },

  bridge_type: {
    type: DataTypes.STRING,
  },

  bridge_installation: {
    type: DataTypes.STRING,
  },
  reversing_station_type: {
    type: DataTypes.STRING,
  },
  is_docking_station_returnable: {
    type: DataTypes.STRING,
  },
  docking_station_layers: {
    type: DataTypes.STRING,
  },
  transportation_scope: {
    type: DataTypes.STRING,
  },
  loading_unloading_atsite: {
    type: DataTypes.STRING,
  },
  movement_within_site: {
    type: DataTypes.STRING,
  },
  purlin_extension_scope: {
    type: DataTypes.STRING,
  },
  installation_scope: {
    type: DataTypes.STRING,
  },
  frame_for_bridges: {
    type: DataTypes.STRING,
  },
  purlin_extension_for_bridges: {
    type: DataTypes.STRING,
  },

  PO_value: {
    type: DataTypes.STRING,
  },
  committed_dispatch_date: {
    type: DataTypes.STRING,
  },
  expected_commisioning_date: {
    type: DataTypes.STRING,
  },
  submittedBy: {
    type: DataTypes.STRING,
  },
});
export default ScopeofWork;
