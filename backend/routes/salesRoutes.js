import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Sequelize, Op } from 'sequelize';
import { isAuth, isAdmin } from '../utils.js';
import dotenv from 'dotenv';
import ScopeofWork from '../models/ScopeofWork.js';

const scopeofworkRouter = express.Router();

dotenv.config();

scopeofworkRouter.get('/scopeofwork', async (req, res) => {
  const scopeofwork = await ScopeofWork.findAll();
  if (scopeofwork) {
    // Send the created employees as the response
    return res.status(200).send({ scopeofwork });
  } else {
    return res.status(400).send({ message: 'scope of work Not found' });
  }
});
scopeofworkRouter.get('/scopeofwork/:id', async (req, res) => {
  const id = req.params.id;
  const scopeofwork = await ScopeofWork.findOne({
    where: { id: id },
  });
  if (scopeofwork) {
    // Send the created employees as the response
    return res.status(200).send({ scopeofwork });
  } else {
    return res.status(400).send({ message: 'scope of work Not found' });
  }
});

scopeofworkRouter.post(
  '/scopeofwork',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const {
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
      installation_scope,
      purlin_extension_scope,
      submittedBy,
    } = req.body;
    const newScopeofWork = new ScopeofWork({
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
      installation_scope,
      purlin_extension_scope,
      submittedBy,
    });
    const scopeopfwork = await newScopeofWork.save();
    res.send({ message: 'scope of work Created', scopeopfwork });
  })
);

export default scopeofworkRouter;
