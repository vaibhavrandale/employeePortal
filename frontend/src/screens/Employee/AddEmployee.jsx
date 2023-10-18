import React, { useContext, useReducer, useState } from 'react';
import '../../App.css';
// import data from '../Employee/data';
import { Link, useNavigate } from 'react-router-dom';
import { getError } from '../../utils';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Store } from '../../Store';
import LoadingBox1 from '../../components/LoadingBox1';
import dummyimage from './images.jpg';
const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };

    case 'CREATE_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

function AddEmployee() {
  const [{ loadingUpload }, dispatch] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [employee_id, setEmployee_id] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [State, setState] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [aadhar_no, setAdharno] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [activate, setActivate] = useState(false);
  const [leaves, setLeaves] = useState(18);
  const [pf_account_no, setPf_account_no] = useState('');
  const [bank_account_no, setBank_account_no] = useState('');
  const [uan_number, setUan_number] = useState('');
  const [pan_number, setPan_number] = useState('');
  const [payslips, setPayslips] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isSales, setIsSales] = useState(false);
  const [isScm, setIsScm] = useState(false);
  const [isDesign, setIsDesign] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isVisitor, setIsVisitor] = useState(false);
  const [isProduction, setIsProduction] = useState(false);
  const [isAccountant, setIsAccountant] = useState(false);

  const [father_husband_name, setFather_husband_name] = useState('');
  const [marital_status, setMarital_status] = useState('');
  const [sub_locality, setSub_locality] = useState('');
  const [district, setDistrict] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [nominee_name, setNominee_name] = useState('');
  const [nominee_relationship, setNominee_relationship] = useState('');
  const [nominee_address, setNominee_address] = useState('');
  const [nominee_sub_locality, setNominee_sub_locality] = useState('');
  const [nominee_district, setNominee_district] = useState('');
  const [nominee_state, setNominee_state] = useState('');
  const [nominee_mobile_no, setNominee_mobile_no] = useState('');
  const [nominee_pinCode, setNominee_pinCode] = useState('');
  const [nominee_email, setNominee_email] = useState('');
  const [no_of_family_members, setNo_of_family_members] = useState('');
  const [alternate_mobile_no, setAlternate_mobile_no] = useState('');
  const [personal_email, setPersonal_email] = useState('');
  const [aadhar_card_file, setAadhar_card_file] = useState('');
  const [pan_card_file, setPan_card_file] = useState('');
  const [bank_account_file, setBank_account_file] = useState('');
  const [previous_company_name, setPrevious_company_name] = useState('');
  const [experience_letter, setExperience_letter] = useState('');
  const [allLeaves, setAllLeaves] = useState([]);

  const [ctc, setCtc] = useState('');
  const [salarygroup, setSalarygroup] = useState('');
  const SubmitHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!employee_id) {
      missingFields.push('Employee Employee ID');
    }

    if (missingFields.length > 0) {
      toast.error(`Please fill : ${missingFields.join(', ')}`);
      return;
    }

    try {
      const { data } = await axios.post(
        `api/employees`,
        {
          employee_id,
          email,
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          password: employee_id,
          state: State,
          father_husband_name,
          gender,
          birth_date,
          marital_status,
          address,
          sub_locality,
          district,
          pinCode,
          mobile_no,
          nominee_name,
          nominee_relationship,
          nominee_address,
          nominee_sub_locality,
          nominee_district,
          nominee_state,
          nominee_mobile_no,
          nominee_pinCode,
          nominee_email,
          no_of_family_members,
          alternate_mobile_no,
          personal_email,
          aadhar_no,
          pan_number,
          bank_account_no,
          aadhar_card_file,
          pan_card_file,
          bank_account_file,
          pf_account_no,
          uan_number,
          image,
          joiningDate,
          designation,
          age,
          previous_company_name,
          experience,
          experience_letter,
          leaves,
          activate,
          isAdmin,
          isSuperAdmin,
          isSales,
          isScm,
          isDesign,
          isProject,
          isVisitor,
          isProduction,
          isAccountant,
          payslips,
          allLeaves,
          ctc,
          salarygroup,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Employee Added successfully', {
        position: 'bottom-right',
      });
      navigate('/employees');
    } catch (error) {
      toast.error(getError(error), {
        position: 'bottom-right',
      });
      dispatch({ type: 'CREATE_FAIL' });
    }
  };

  // profileImages

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/profileImages',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImage([...image, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }

      toast.success('Image uploaded successfully.', {
        position: 'bottom-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'bottom-right',
      });
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f4f4f4',
      padding: '20px',
      margin: '65px 0px 0px 72px',
      maxWidth: '90vmax',
      overflowX: 'auto',
      borderRadius: '8px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
    },
    header: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#333',
      textAlign: 'center',
    },
    sectionHeader: {
      borderBottom: '1px solid #ddd',
      fontSize: '1.2rem',
      margin: '10px 0',
      paddingBottom: '10px',
    },
    table: {
      width: '100%',
      margin: '10px',
    },
    label: {
      marginBottom: '8px',
      paddingLeft: '10px',
      fontSize: '1rem',
      color: '#555',
    },

    input: {
      width: '100%',
      padding: '8px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      margin: '1px',
      transition: 'border-color 0.3s ease-in-out',
    },
    inputFocus: {
      borderColor: '#007BFF',
    },
    file: {
      width: '100%',
      height: '40px',
      padding: '2px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      margin: '1px',
    },
    select: {
      width: '100%',
      padding: '8px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      margin: '1px',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
      marginTop: '15px',
      display: 'block',
      marginLeft: 'auto',
    },
    image: {
      height: '150px',
      width: '150px',
      borderRadius: '50%',
      objectFit: 'fill',
    },
    imageContainer: {
      display: 'flex',

      justifyContent: 'end',
      flexDirection: 'column',
      alignItems: 'end',
    },
    imageDiv: {
      height: '150px',
      width: '150px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      border: '1px solid black',
      alignItems: 'center',
    },
    responsiveContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    responsiveItem: {
      flex: '0 0 calc(50% - 10px)', // This gives a tiny margin
      marginBottom: '20px',
    },

    '@media (max-width: 768px)': {
      responsiveItem: {
        flex: '0 0 100%',
      },
    },
  };

  // Add hover & focus effects
  document.querySelectorAll('input').forEach((inputElem) => {
    inputElem.addEventListener('focus', () => {
      Object.assign(inputElem.style, styles.inputFocus);
    });
    inputElem.addEventListener('blur', () => {
      Object.assign(inputElem.style, styles.input);
    });
  });

  document.querySelectorAll('button').forEach((buttonElem) => {
    buttonElem.addEventListener('mouseover', () => {
      Object.assign(buttonElem.style, styles.buttonHover);
    });
    buttonElem.addEventListener('mouseout', () => {
      Object.assign(buttonElem.style, styles.button);
    });
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>New Employee Registration</h1>
      <div style={styles.imageContainer}>
        {loadingUpload ? (
          <div style={styles.imageDiv}>
            <LoadingBox1 />{' '}
          </div>
        ) : image ? (
          <img src={image} alt="profile" style={styles.image} />
        ) : (
          <img src={dummyimage} alt="dummy" style={styles.image} />
        )}

        {/* <p className="text-center"> Profile Image</p> */}
      </div>
      <form onSubmit={SubmitHandler}>
        <h2 style={styles.sectionHeader}>Personal Details</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>First Name:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </td>

              <td style={styles.label} className="ms-2">
                Last Name:
              </td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Age:</td>
              <td>
                <input
                  style={styles.input}
                  type="number"
                  id="age"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </td>

              <td style={styles.label}>Gender:</td>
              <td>
                <select
                  name=""
                  id=""
                  style={styles.select}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Date of Birth:</td>
              <td>
                <input
                  style={styles.input}
                  type="date"
                  id="birth_date"
                  value={birth_date}
                  onChange={(e) => setBirth_date(e.target.value)}
                />
              </td>

              <td style={styles.label}>Marital Status:</td>
              <td>
                <select
                  name=""
                  id=""
                  style={styles.select}
                  value={marital_status}
                  onChange={(e) => setMarital_status(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Father/Husband Name:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="father_husband_name"
                  placeholder="Father/Husband Name"
                  value={father_husband_name}
                  onChange={(e) => setFather_husband_name(e.target.value)}
                />
              </td>
              <td style={styles.label}>Profile Image:</td>
              <td>
                <input
                  style={styles.file}
                  type="file"
                  id="profile"
                  placeholder="profile"
                  onChange={uploadFileHandler}
                />
              </td>
            </tr>
            {/* ... Add more fields as needed ... */}
          </tbody>
        </table>

        <h2 style={styles.sectionHeader}>Contact Information</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>Personal Email:</td>
              <td>
                <input
                  style={styles.input}
                  type="email"
                  id="email"
                  placeholder="Enter personal email"
                  value={personal_email}
                  onChange={(e) => setPersonal_email(e.target.value)}
                />
              </td>
              <td style={styles.label}>Phone Number:</td>
              <td>
                <input
                  style={styles.input}
                  type="tel"
                  id="mobile_no"
                  placeholder="Enter mobile number"
                  value={mobile_no}
                  onChange={(e) => setMobile_no(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Alternate Phone No:</td>
              <td>
                <input
                  style={styles.input}
                  type="tel"
                  id="alternate_mobile_no"
                  placeholder="Enter alternate mobile number"
                  value={alternate_mobile_no}
                  onChange={(e) => setAlternate_mobile_no(e.target.value)}
                />
              </td>
              <td style={styles.label}>Sub Locality:</td>
              <td>
                <input
                  style={styles.input}
                  type="tel"
                  id="alternate_mobile_no"
                  placeholder="Enter Sub Locality"
                  value={sub_locality}
                  onChange={(e) => setSub_locality(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>District:</td>
              <td>
                <input
                  style={styles.input}
                  type="tel"
                  id="alternate_mobile_no"
                  placeholder="Enter district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </td>
              <td style={styles.label}>State:</td>
              <td>
                <select
                  name="state"
                  id="state"
                  style={styles.select}
                  value={State}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Pin Code:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter Pin code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </td>
              <td style={styles.label}>No Of family members:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Enter Number of family Members"
                  value={no_of_family_members}
                  onChange={(e) => setNo_of_family_members(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Address:</td>
              <td colSpan="3">
                <textarea
                  style={styles.input}
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
            {/* ... Add more fields as needed ... */}
          </tbody>
        </table>

        <h2 style={styles.sectionHeader}>Emergency/Nominee Details</h2>

        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>Nominee Name:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter nominee name"
                  value={nominee_name}
                  onChange={(e) => setNominee_name(e.target.value)}
                />
              </td>

              <td style={styles.label}>Nominee Relationship:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Nominee Relationship"
                  value={nominee_relationship}
                  onChange={(e) => setNominee_relationship(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Nominee Mobile No:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter nominee Mobile no"
                  value={nominee_mobile_no}
                  onChange={(e) => setNominee_mobile_no(e.target.value)}
                />
              </td>
              <td style={styles.label}>Nominee Email:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter nominee email"
                  value={nominee_email}
                  onChange={(e) => setNominee_email(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Nominee sub locality:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="experience"
                  placeholder="nominee sub locality"
                  value={nominee_sub_locality}
                  onChange={(e) => setNominee_sub_locality(e.target.value)}
                />
              </td>

              <td style={styles.label}>Nominee district:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="joiningDate"
                  placeholder="nominee district"
                  value={nominee_district}
                  onChange={(e) => setNominee_district(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Nominee State:</td>
              <td>
                <select
                  name="state"
                  id="state"
                  style={styles.select}
                  value={nominee_state}
                  onChange={(e) => setNominee_state(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli">
                    Dadra and Nagar Haveli
                  </option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </td>
              <td style={styles.label}>Nominee Pin Code:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter Nominee Pin code"
                  value={nominee_pinCode}
                  onChange={(e) => setNominee_pinCode(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Nominee Address:</td>
              <td colSpan="3">
                <textarea
                  style={styles.input}
                  id="address"
                  placeholder="Enter Nominee address"
                  value={nominee_address}
                  onChange={(e) => setNominee_address(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h2 style={styles.sectionHeader}>Work Details</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>CTC[Cost to Company]:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter CTC"
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
                />
              </td>

              <td style={styles.label}>Salary Salary Group:</td>
              <td>
                <select
                  name="state"
                  id="state"
                  style={styles.select}
                  value={salarygroup}
                  onChange={(e) => setSalarygroup(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">1</option>
                  <option value="Andhra Pradesh">2</option>
                  <option value="Andhra Pradesh">3</option>
                  <option value="Andhra Pradesh">4</option>
                  <option value="Andhra Pradesh">5</option>
                  <option value="Andhra Pradesh">6</option>
                  <option value="Andhra Pradesh">7</option>
                  <option value="Andhra Pradesh">8</option>
                  <option value="Andhra Pradesh">9</option>
                  <option value="Andhra Pradesh">10</option>
                  <option value="Andhra Pradesh">11</option>
                  <option value="Andhra Pradesh">12</option>
                  <option value="Andhra Pradesh">13</option>
                  <option value="Andhra Pradesh">14</option>
                  <option value="Andhra Pradesh">15</option>
                  <option value="Andhra Pradesh">16</option>
                  <option value="Andhra Pradesh">17</option>
                  <option value="Andhra Pradesh">18</option>
                  <option value="Andhra Pradesh">19</option>
                  <option value="Andhra Pradesh">20</option>
                </select>
              </td>
            </tr>

            <tr>
              <td style={styles.label}>Employee ID:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Employee ID"
                  value={employee_id}
                  onChange={(e) => setEmployee_id(e.target.value)}
                />
              </td>

              <td style={styles.label}>Designation:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Company mail:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Enter company mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td style={styles.label}>Experience:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="experience"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Joining Date:</td>
              <td>
                <input
                  style={styles.input}
                  type="date"
                  id="joiningDate"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                />
              </td>
              <td style={styles.label}>Experience Letter:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="joiningDate"
                  placeholder="Enter Experience Letter"
                  value={experience_letter}
                  onChange={(e) => setExperience_letter(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Previous Company :</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="joiningDate"
                  placeholder="Enter Previous Company "
                  value={previous_company_name}
                  onChange={(e) => setPrevious_company_name(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h2 style={styles.sectionHeader}>
          Identification Documents [
          <Link
            to="https://drive.google.com/drive/folders/1vJGTA8x9F0zHOK2BSFinTNUdVCEchJMR?usp=sharing"
            target="blank"
            className="m-1 text-decoration-none"
          >
            G-drive
          </Link>
          ]
        </h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>Aadhar No:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter Adhar No"
                  value={aadhar_no}
                  onChange={(e) => setAdharno(e.target.value)}
                />
              </td>

              <td style={styles.label}>Pan Number:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Enter Pan Number"
                  value={pan_number}
                  onChange={(e) => setPan_number(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Upload Aadhar File:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter  Aadhar File"
                  value={aadhar_card_file}
                  onChange={(e) => setAadhar_card_file(e.target.value)}
                />
              </td>

              <td style={styles.label}>Upload PAN File:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Enter Pan File"
                  value={pan_card_file}
                  onChange={(e) => setPan_card_file(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Bank Account No:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="employee_id"
                  placeholder="Enter bank account no"
                  value={bank_account_no}
                  onChange={(e) => setBank_account_no(e.target.value)}
                />
              </td>

              <td style={styles.label}>Upload Bank File:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="designation"
                  placeholder="Enter Bank File"
                  value={bank_account_file}
                  onChange={(e) => setBank_account_file(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>PF Account No:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="experience"
                  placeholder="PF Account Number"
                  value={pf_account_no}
                  onChange={(e) => setPf_account_no(e.target.value)}
                />
              </td>

              <td style={styles.label}>UAN No:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="joiningDate"
                  placeholder="UAN Number"
                  value={uan_number}
                  onChange={(e) => setUan_number(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="employee-form-container">
          <div className="form-section">
            <h4>Assign Role</h4>
            <div className="role-row">
              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="isAdmin">Admin</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isSuperAdmin"
                  className="input3"
                  checked={isSuperAdmin}
                  onChange={(e) => setIsSuperAdmin(e.target.checked)}
                />
                <label htmlFor="isSuperAdmin">Super</label>
              </div>
              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isAccountant}
                  onChange={(e) => setIsAccountant(e.target.checked)}
                />
                <label htmlFor="isAdmin"> Account</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isScm}
                  onChange={(e) => setIsScm(e.target.checked)}
                />
                <label htmlFor="isAdmin"> SCM</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isDesign}
                  onChange={(e) => setIsDesign(e.target.checked)}
                />
                <label htmlFor="isAdmin"> Design</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isProduction}
                  onChange={(e) => setIsProduction(e.target.checked)}
                />
                <label htmlFor="isAdmin"> Production</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isProject}
                  onChange={(e) => setIsProject(e.target.checked)}
                />
                <label htmlFor="isAdmin"> Project</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isSales}
                  onChange={(e) => setIsSales(e.target.checked)}
                />
                <label htmlFor="isAdmin"> Sales</label>
              </div>
              <div className="role-item">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="input3"
                  checked={isVisitor}
                  onChange={(e) => setIsVisitor(e.target.checked)}
                />
                <label htmlFor="isAdmin"> Visitor</label>
              </div>
            </div>
          </div>
        </div>

        <button style={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
