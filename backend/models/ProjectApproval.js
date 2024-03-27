import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProjectApproval = sequelize.define('ProjectApproval', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  BU: {
    type: DataTypes.STRING,
  },

  customer: {
    type: DataTypes.STRING,
  },
  contact_person: {
    type: DataTypes.STRING,
  },
  project_capacity: {
    type: DataTypes.STRING,
  },

  mms_type: {
    type: DataTypes.STRING,
  },
  distance_to_nearest_city: {
    type: DataTypes.STRING,
  },

  is_feasible_at_cost: {
    type: DataTypes.STRING,
  },

  final_quote: {
    type: DataTypes.STRING,
  },
  final_quote_date: {
    type: DataTypes.STRING,
  },
  project_state: {
    type: DataTypes.STRING,
  },
  project_approval_status: {
    type: DataTypes.STRING,
  },
  created_by: {
    type: DataTypes.STRING,
  },

  sales_director: {
    type: DataTypes.STRING,
  },
  signature: {
    type: DataTypes.STRING,
  },
  remark: {
    type: DataTypes.STRING,
  },
  date_of_approval: {
    type: DataTypes.STRING,
  },
  date_of_project_closure: {
    type: DataTypes.STRING,
  },
  site_location: {
    type: DataTypes.STRING,
  },
  robot_quantity: {
    type: DataTypes.STRING,
  },
});

export default ProjectApproval;
