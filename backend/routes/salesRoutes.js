import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Sequelize, Op } from 'sequelize';
import { isAuth, isAdmin } from '../utils.js';
import dotenv from 'dotenv';
import ScopeofWork from '../models/ScopeofWork.js';
import Employee from '../models/employeeModel.js';
import nodemailer from 'nodemailer';
import RaiseInvoice from '../models/RaiseInvoice.js';
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
      frame_for_bridges,
      purlin_extension_for_bridges,
      PO_value,
      committed_dispatch_date,
      expected_commisioning_date,
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
      frame_for_bridges,
      purlin_extension_for_bridges,
      PO_value,
      committed_dispatch_date,
      expected_commisioning_date,
      submittedBy,
    });
    const scopeopfwork = await newScopeofWork.save();
    res.send({ message: 'scope of work Created', scopeopfwork });
  })
);

scopeofworkRouter.put(
  '/scopeofwork/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const scopeofwork = await ScopeofWork.findByPk(id);

    if (!scopeofwork) {
      return res.status(404).send({ message: 'Scope of work not found' });
    }

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
      frame_for_bridges,
      purlin_extension_for_bridges,
      PO_value,
      committed_dispatch_date,
      expected_commisioning_date,
      submittedBy,
    } = req.body;

    scopeofwork.client_name = client_name;
    scopeofwork.plant_capacity = plant_capacity;
    scopeofwork.purchase_order_no = purchase_order_no;
    scopeofwork.purchase_order_date = purchase_order_date;
    scopeofwork.docking_station_frame = docking_station_frame;
    scopeofwork.solar_module_capacity = solar_module_capacity;
    scopeofwork.module_mounting_structure = module_mounting_structure;
    scopeofwork.docking_station_piling = docking_station_piling;
    scopeofwork.gateway_type = gateway_type;
    scopeofwork.internet_connectivity = internet_connectivity;
    scopeofwork.mounting_pole = mounting_pole;
    scopeofwork.power_supply_for_pole = power_supply_for_pole;
    scopeofwork.bridge_type = bridge_type;
    scopeofwork.bridge_installation = bridge_installation;
    scopeofwork.reversing_station_type = reversing_station_type;
    scopeofwork.is_docking_station_returnable = is_docking_station_returnable;
    scopeofwork.docking_station_layers = docking_station_layers;
    scopeofwork.transportation_scope = transportation_scope;
    scopeofwork.loading_unloading_atsite = loading_unloading_atsite;
    scopeofwork.movement_within_site = movement_within_site;
    scopeofwork.installation_scope = installation_scope;
    scopeofwork.purlin_extension_scope = purlin_extension_scope;
    scopeofwork.frame_for_bridges = frame_for_bridges;
    scopeofwork.purlin_extension_for_bridges = purlin_extension_for_bridges;
    scopeofwork.PO_value = PO_value;
    scopeofwork.committed_dispatch_date = committed_dispatch_date;
    scopeofwork.expected_commisioning_date = expected_commisioning_date;
    scopeofwork.submittedBy = submittedBy;

    const updatedScopeOfWork = await scopeofwork.save();

    res.send({ message: 'Scope of work updated', updatedScopeOfWork });
  })
);

scopeofworkRouter.delete(
  '/scopeofwork/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const scopeofwork = await ScopeofWork.findByPk(id);

    if (!scopeofwork) {
      return res.status(404).send({ message: 'Scope of work not found' });
    }

    try {
      // Delete the scope of work
      await scopeofwork.destroy();

      // Send response indicating successful deletion
      res.status(200).send({
        message: 'Scope of Work Deleted',
        deletedScopeOfWork: scopeofwork,
      });

      // // Retrieve email addresses of super sales admins
      // const superAdmins = await Employee.findAll({ where: { isSales: '1' } });
      // const superSalesAdminEmails = superAdmins.map((admin) => admin.email);

      // // Check if there are super sales admins with email addresses
      // if (superSalesAdminEmails.length > 0) {
      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      // Send email notification to super sales admins
      const info = await transporter.sendMail({
        from: `TAYPRO INTERNAL SALES <${process.env.MAIL_USER}>`,
        to: 'sales@taypro.in',
        subject: `Scope of Work deleted PO -${scopeofwork.purchase_order_no}`,
        html: `
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Taypro</title>
    <style>
      /* Add your global styles here */
    </style>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f8f8f8; font-family: Arial, sans-serif;">
    <table
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="600"
      style="border-radius: 10px; margin: 10px auto; background-color: #f8f8f8; max-width: 100%;"
    >
      <tr>
        <td  bgcolor="#ffffff" style="padding: 20px;">
          <div style="display: flex; justify-content: flex-end;margin:0px 10px 0px 400px"">
            <img
              src="https://res.cloudinary.com/di0iwc8ql/image/upload/v1709110699/gsqahyovjyqommmfi10z.png"
              alt="Company Logo"
              height-"120" width="120"
              style=" object-fit: contain; margin: 1px 0px;"
            />
          </div>
<p style='color:crimson'>Scope of Work deleted - PO - ${scopeofwork.purchase_order_no} </p>
         
          <p style="padding: 10px 20px;">
            Here are some details about deleted Scope of work
          </p>

          <table style="border-collapse: collapse; width: 80%; margin: auto;">
          <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>client name</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
          ${scopeofwork.client_name}
          </td>
        </tr>

        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Plant capacity</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
          ${scopeofwork.plant_capacity}
          </td>
        </tr>
     

                
        <tr>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
            <strong>Purchase order No</strong>
          </td>
          <td
            style="border: 1px solid #dddddd; text-align: left; padding: 8px"
          >
          ${scopeofwork.purchase_order_no}
          </td>
        </tr>
     

        <tr>
        <td
          style="border: 1px solid #dddddd; text-align: left; padding: 8px"
        >
          <strong>Purchase order date</strong>
        </td>
        <td
          style="border: 1px solid #dddddd; text-align: left; padding: 8px"
        >
        ${scopeofwork.purchase_order_date}
        </td>
      </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>docking station frame</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.docking_station_frame}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>solar module capacity</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.solar_module_capacity}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>module mounting structure</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.module_mounting_structure}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>docking station piling</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.docking_station_piling}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Gateway type</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.gateway_type}
      </td>
    </tr>
    
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Internet connectivity</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.internet_connectivity}
      </td>
    </tr>
    
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Mounting pole</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.mounting_pole}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Power supply for pole</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.power_supply_for_pole}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Bridge Type</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.bridge_type}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Bridge Installation</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.bridge_installation}
      </td>
    </tr>
    

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Reversing station type</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.reversing_station_type}
      </td>
    </tr>
    

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Docking station returnable </strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.is_docking_station_returnable}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Docking station Layers</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.docking_station_layers}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Docking station Layers</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.docking_station_layers}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Transportation Scope</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.transportation_scope}
      </td>
    </tr>
    

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>loading unloading atsite</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.loading_unloading_atsite}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Movement Within Site</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.movement_within_site}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Purlin extension scope</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.purlin_extension_scope}
      </td>
    </tr>
    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Installation scope</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.installation_scope}
      </td>
    </tr>


    
      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>Frame for Bidges</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.frame_for_bridges}
      </td>
    </tr>

      <tr>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
        <strong>purlin Extension For Bridges</strong>
      </td>
      <td
        style="border: 1px solid #dddddd; text-align: left; padding: 8px"
      >
      ${scopeofwork.purlin_extension_for_bridges}
      </td>
    </tr>



    <tr>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
      <strong>PO Value</strong>
    </td>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
    ${scopeofwork.PO_value}
    </td>
  </tr>

    <tr>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
      <strong>committed Dispatch Date</strong>
    </td>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
    ${scopeofwork.committed_dispatch_date}
    </td>
  </tr>

    <tr>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
      <strong>Expected Commisioning Date</strong>
    </td>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
    ${scopeofwork.expected_commisioning_date}
    </td>
  </tr>

    <tr>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
      <strong>Last Update</strong>
    </td>
    <td
      style="border: 1px solid #dddddd; text-align: left; padding: 8px"
    >
    ${scopeofwork.submittedBy}
    </td>
  </tr>
    

      <tr bgcolor="#ffffff">
        <td style="padding: 10px 20px;">
          <br />
          <span style="color: black; font-weight: 600">Best Regards,</span><br />
          <span style="color: crimson; font-weight: 600">Sales TAYPRO,</span><br />
          <span style="color: rgb(0, 0, 0); font-weight: 600">TAYPRO PRIVATE LIMITED</span><br />
          <span style="color: green; font-weight: 600"><b>We make green energy greener!!</b></span><br />
        </td>
      </tr>
    </table>
  </body>
</html>

`,
      });

      // Log successful email delivery
      console.log(`Email successfully sent to: sales@taypro.in`);
      // } else {
      //   console.log('No super sales admins found with valid email addresses.');
      // }
    } catch (error) {
      // Handle errors during deletion or email sending process
      console.error('Error deleting scope of work or sending email:', error);
      res
        .status(500)
        .send({ message: 'Error deleting scope of work or sending email' });
    }
  })
);

// ---------------raise invoice section------------------------
scopeofworkRouter.get('/raise-invoice', async (req, res) => {
  const raiseinvoice = await RaiseInvoice.findAll();
  if (raiseinvoice) {
    // Send the created employees as the response
    return res.status(200).send({ raiseinvoice });
  } else {
    return res.status(400).send({ message: 'invoices Not found' });
  }
});

scopeofworkRouter.get(
  '/raise-invoice-all/:purchase_order_no',
  async (req, res) => {
    const purchase_order_no = req.params.purchase_order_no; // Get purchase_order_no from params

    try {
      const raisinvoice = await RaiseInvoice.findAll({
        where: { purchase_order_no: purchase_order_no },
      });

      if (raisinvoice.length > 0) {
        // Send the found invoices as the response
        return res.status(200).send({ raisinvoice });
      } else {
        // Send a 404 response if no invoices were found
        return res.status(404).send({
          message: `No invoices associated with this PO - ${purchase_order_no}`,
        });
      }
    } catch (error) {
      // Handle internal server error
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
);

scopeofworkRouter.post(
  '/raise-invoice/:purchase_order_no', // Include PO number as a parameter
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { purchase_order_no } = req.params; // Retrieve PO number from request parameters

    // Find the corresponding PO data from scope of work
    const poData = await ScopeofWork.findOne({
      where: { purchase_order_no: purchase_order_no },
    });

    if (!poData) {
      // If PO data is not found, return an error response
      return res
        .status(404)
        .send({ message: `PO ${purchase_order_no} not found` });
    }

    // Extract required data from the scope of work
    const { client_name, purchase_order_date, PO_value } = poData;

    // Extract other fields from the request body
    const {
      invoice_number,
      invoice_value,
      invoice_date,
      committed_dispatch_date,
      expected_commisioning_date,
      submittedBy,
    } = req.body;

    // Create a new raise invoice object with extracted data
    const newRaiseInvoice = new RaiseInvoice({
      client_name,
      purchase_order_no,
      purchase_order_date,
      PO_value,
      invoice_number,
      invoice_value,
      invoice_date,
      committed_dispatch_date,
      expected_commisioning_date,
      submittedBy,
    });

    // Save the new raise invoice object
    const raiseinvoice = await newRaiseInvoice.save();

    // Send success response with the raised invoice data
    res.send({
      message: `Invoice raised successfully for PO ${purchase_order_no}!`,
      raiseinvoice,
    });
  })
);

scopeofworkRouter.get('/raise-invoice/:invoice_number', async (req, res) => {
  // const purchase_order_no = req.params.purchase_order_no; // Get purchase_order_no from params
  const invoicenumber = req.params.invoice_number; // Get purchase_order_no from params

  try {
    const raisinvoice = await RaiseInvoice.findOne({
      where: {
        invoice_number: invoicenumber,
      },
    });

    if (raisinvoice) {
      // Send the found invoices as the response
      return res.status(200).send({ raisinvoice });
    } else {
      // Send a 404 response if no invoices were found
      return res.status(404).send({
        message: `No invoices associated with this PO - ${purchase_order_no} and invoice number ${invoicenumber}`,
      });
    }
  } catch (error) {
    // Handle internal server error
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

scopeofworkRouter.put(
  '/raise-invoice/:invoicenumber',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // const purchase_order_no = req.params.purchase_order_no; // Get purchase_order_no from params
    const invoicenumber = req.params.invoicenumber; // Get purchase_order_no from params

    const {
      invoice_number,
      invoice_value,
      invoice_date,
      committed_dispatch_date,
      expected_commisioning_date,
      submittedBy,
    } = req.body;

    try {
      // Find the existing invoice with the provided purchase_order_no
      const existingInvoice = await RaiseInvoice.findOne({
        where: {
          invoice_number: invoicenumber,
        },
      });

      // If no invoice found, return an error
      if (!existingInvoice) {
        return res.status(404).send({
          message: `Invoice not found - ${invoice_number}`,
        });
      }

      existingInvoice.invoice_number = invoice_number;
      existingInvoice.invoice_value = invoice_value;
      existingInvoice.invoice_date = invoice_date;
      existingInvoice.committed_dispatch_date = committed_dispatch_date;
      existingInvoice.expected_commisioning_date = expected_commisioning_date;
      existingInvoice.submittedBy = submittedBy;

      // Save the updated invoice
      const raiseinvoice = await existingInvoice.save();

      // Send response
      res.send({
        message: `Invoice updated successfully for PO- ${existingInvoice.purchase_order_no}!`,
        raiseinvoice,
      });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  })
);

// ---------------raise invoice section------------------------

export default scopeofworkRouter;
