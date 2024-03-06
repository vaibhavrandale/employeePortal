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
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import MyModal from './MyModal'; // Adjust the path accordingly
import { IoEyeOutline } from 'react-icons/io5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, createloadingg: true };

    case 'CREATE_SUCCESS':
      return { ...state, employees: action.payload, createloadingg: false };

    case 'CREATE_FAIL':
      return { ...state, createloadingg: false, error: action.payload };

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

    case 'UPLOAD_DOCUMENT_REQUEST':
      return { ...state, loadingDocumentUpload: true, errorDocumentUpload: '' };
    case 'UPLOAD_DOCUMENT_SUCCESS':
      return {
        ...state,
        loadingDocumentUpload: false,
        errorDocumentUpload: '',
      };
    case 'UPLOAD_DOCUMENT_FAIL':
      return {
        ...state,
        loadingDocumentUpload: false,
        errorDocumentUpload: action.payload,
      };

    default:
      return state;
  }
};

function AddEmployee() {
  const [
    { loadingUpload, loadingDocumentUpload, loading, createloadingg },
    dispatch,
  ] = useReducer(reducer, {
    employees: [],
    loading: true,
    error: '',
  });
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [address, setAddress] = useState('NA');
  const [addressProof, setAddresProof] = useState('/images/address_proof.png');
  const [State, setState] = useState('Maharashtra');
  const [mobile_no, setMobile_no] = useState('0');
  const [father_husband_name, setFather_husband_name] = useState('NA');
  const [marital_status, setMarital_status] = useState('single');
  const [sub_locality, setSub_locality] = useState('NA');
  const [district, setDistrict] = useState('NA');
  const [pinCode, setPinCode] = useState('0');
  const [nominee_name, setNominee_name] = useState('NA');
  const [nominee_relationship, setNominee_relationship] = useState('NA');
  const [nominee_address, setNominee_address] = useState('NA');
  const [nominee_sub_locality, setNominee_sub_locality] = useState('NA');
  const [nominee_district, setNominee_district] = useState('NA');
  const [nominee_state, setNominee_state] = useState('Maharashtra');
  const [nominee_mobile_no, setNominee_mobile_no] = useState('0');
  const [nominee_pinCode, setNominee_pinCode] = useState('0');
  const [nominee_email, setNominee_email] = useState('na@gmail.com');
  const [no_of_family_members, setNo_of_family_members] = useState('0');
  const [alternate_mobile_no, setAlternate_mobile_no] = useState('0');
  const [personal_email, setPersonal_email] = useState('');
  const [tenth_grade, setTenth_grade] = useState('0');
  const [tenth_marksheet, setTenth_marksheet] = useState(
    '/images/tenth_marksheet.png'
  );
  const [tenth_schoolName, setTenth_schoolName] = useState('NA');
  const [twelth_or_diploma_grade, setTwelth_or_diploma_grade] = useState('0');
  const [twelth_or_diploma_marksheet, setTwelth_or_diploma_marksheet] =
    useState('/images/twelth_marksheet.png');
  const [twelth_or_diploma_collegeName, setTwelth_or_diploma_collegeName] =
    useState('NA');

  const [
    under_geaduate_or_post_graduate_grade,
    setUnder_geaduate_or_post_graduate_grade,
  ] = useState('0');
  const [
    under_geaduate_or_post_graduate_marksheet,
    setUnder_geaduate_or_post_graduate_marksheet,
  ] = useState('/images/ug_pg_marksheet.PNG');
  const [
    under_geaduate_or_post_graduate_collegeName,
    setUnder_geaduate_or_post_graduate_collegeName,
  ] = useState('NA');
  const [gender, setGender] = useState('male');

  const [experience, setExperience] = useState('');

  const [experience_letter, setExperience_letter] = useState(
    experience === 'NA' ||
      experience === 0 ||
      experience === 'fresher' ||
      experience === 'Fresher'
      ? 'fresher'
      : ''
  );

  const [employee_id, setEmployee_id] = useState('');
  const [UID, setUID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');

  const [joiningDate, setJoiningDate] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');

  const [birth_date, setBirth_date] = useState('');
  const [aadhar_no, setAdharno] = useState('');
  const [activate, setActivate] = useState(0);
  const [leaves, setLeaves] = useState(18);
  const [pf_account_no, setPf_account_no] = useState('');
  const [bank_account_no, setBank_account_no] = useState('');
  const [ifsc_code, setIfsc_code] = useState('');
  const [pan_number, setPan_number] = useState('');
  const [payslips, setPayslips] = useState([]);
  const [isAdmin, setIsAdmin] = useState(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(0);
  const [isSales, setIsSales] = useState(0);
  const [isScm, setIsScm] = useState(0);
  const [isDesign, setIsDesign] = useState(0);
  const [isProject, setIsProject] = useState(0);
  const [isVisitor, setIsVisitor] = useState(0);
  const [isProduction, setIsProduction] = useState(0);
  const [isAccountant, setIsAccountant] = useState(0);
  const [isHr, setIsHr] = useState(0);
  // ifsc_code isSoftwareDevlopment isHardwareDevlopment
  const [isSoftwareDevlopment, setIsSoftwareDevlopment] = useState(0);
  const [isHardwareDevlopment, setIsHardwareDevlopment] = useState(0);
  const [isDirector, setIsDirector] = useState(0);

  const [aadhar_card_file, setAadhar_card_file] = useState('');
  const [pan_card_file, setPan_card_file] = useState('');
  const [bank_account_file, setBank_account_file] = useState('');
  const [previous_company_name, setPrevious_company_name] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');

  const [ctc, setCtc] = useState('');
  const [salarygroup, setSalarygroup] = useState('');

  const [showImageModal, setShowImageModal] = useState(false);

  const handleShowImage = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!employee_id) {
      missingFields.push('Employee ID');
    }

    if (!UID) {
      missingFields.push('UID');
    }

    if (!email) {
      missingFields.push('Email');
    }

    if (!firstName) {
      missingFields.push('First Name');
    }

    if (!lastName) {
      missingFields.push('Last Name');
    }

    if (!State) {
      missingFields.push('State');
    }

    if (!father_husband_name) {
      missingFields.push('Father/Husband Name');
    }

    if (!gender) {
      missingFields.push('Gender');
    }

    if (!birth_date) {
      missingFields.push('Birth Date');
    }

    if (!marital_status) {
      missingFields.push('Marital Status');
    }

    if (!address) {
      missingFields.push('Address');
    }

    if (!addressProof) {
      missingFields.push('Address Proof');
    }

    if (!sub_locality) {
      missingFields.push('Sub Locality');
    }

    if (!district) {
      missingFields.push('District');
    }

    if (!pinCode) {
      missingFields.push('Pin Code');
    }

    if (!mobile_no) {
      missingFields.push('Mobile No');
    }

    if (!nominee_name) {
      missingFields.push('Nominee Name');
    }

    if (!nominee_relationship) {
      missingFields.push('Nominee Relationship');
    }

    if (!nominee_address) {
      missingFields.push('Nominee Address');
    }

    if (!nominee_sub_locality) {
      missingFields.push('Nominee Sub Locality');
    }

    if (!nominee_district) {
      missingFields.push('Nominee District');
    }

    if (!nominee_state) {
      missingFields.push('Nominee State');
    }

    if (!nominee_mobile_no) {
      missingFields.push('Nominee Mobile No');
    }

    if (!nominee_pinCode) {
      missingFields.push('Nominee Pin Code');
    }

    if (!nominee_email) {
      missingFields.push('Nominee Email');
    }

    if (!no_of_family_members) {
      missingFields.push('No. of Family Members');
    }

    if (!alternate_mobile_no) {
      missingFields.push('Alternate Mobile No');
    }

    if (!personal_email) {
      missingFields.push('Personal Email');
    }

    if (!aadhar_no) {
      missingFields.push('Aadhar No');
    }

    if (!pan_number) {
      missingFields.push('Pan Number');
    }

    if (!bank_account_no) {
      missingFields.push('Bank Account No');
    }

    if (!aadhar_card_file) {
      missingFields.push('Aadhar Card File');
    }

    if (!pan_card_file) {
      missingFields.push('Pan Card File');
    }

    if (!bank_account_file) {
      missingFields.push('Bank Account File');
    }

    if (!pf_account_no) {
      missingFields.push('PF Account No');
    }

    if (!image) {
      missingFields.push('Image');
    }

    if (!joiningDate) {
      missingFields.push('Joining Date');
    }

    if (!designation) {
      missingFields.push('Designation');
    }

    if (!age) {
      missingFields.push('Age');
    }

    if (!previous_company_name) {
      missingFields.push('Previous Company Name');
    }

    if (!experience) {
      missingFields.push('Experience');
    }

    // if (!experience_letter) {
    //   missingFields.push('Experience Letter');
    // }

    if (!tenth_marksheet) {
      missingFields.push('10th Marksheet');
    }

    if (!tenth_schoolName) {
      missingFields.push('10th School Name');
    }

    if (!tenth_grade) {
      missingFields.push('10th Grade');
    }

    if (!twelth_or_diploma_marksheet) {
      missingFields.push('12th/Diploma Marksheet');
    }

    if (!twelth_or_diploma_collegeName) {
      missingFields.push('12th/Diploma College Name');
    }

    if (!under_geaduate_or_post_graduate_marksheet) {
      missingFields.push('UG/PG Marksheet');
    }

    if (!under_geaduate_or_post_graduate_collegeName) {
      missingFields.push('UG/PG College Name');
    }

    if (!twelth_or_diploma_grade) {
      missingFields.push('12th/Diploma Grade');
    }

    if (!under_geaduate_or_post_graduate_grade) {
      missingFields.push('UG/PG Grade');
    }

    if (!ctc) {
      missingFields.push('CTC');
    }

    if (!salarygroup) {
      missingFields.push('Salary Group');
    }

    if (!ifsc_code) {
      missingFields.push('Ifsc Code ');
    }
    // ifsc_code isSoftwareDevlopment isHardwareDevlopment

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in the following fields: ${missingFields.join(', ')}`
      );
      return;
    }
    dispatch({
      type: 'CREATE_REQUEST',
    });
    try {
      const { data } = await axios.post(
        `api/employees`,
        {
          employee_id,
          UID,
          email,
          firstName,
          lastName,
          NAME: `${firstName} ${lastName}`,
          password: employee_id,
          state: State,
          father_husband_name,
          gender,
          birth_date,
          marital_status,
          address,
          addressProof,
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
          ifsc_code,
          aadhar_card_file,
          pan_card_file,
          bank_account_file,
          pf_account_no,
          image,
          joiningDate,
          designation,
          age,
          previous_company_name,
          experience,
          experience_letter,

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
          isHr,
          tenth_marksheet,
          tenth_schoolName,
          tenth_grade,
          twelth_or_diploma_marksheet,
          twelth_or_diploma_collegeName,
          under_geaduate_or_post_graduate_marksheet,
          under_geaduate_or_post_graduate_collegeName,
          twelth_or_diploma_grade,
          under_geaduate_or_post_graduate_grade,
          ctc,
          salarygroup,
          updatedBy: userInfo.NAME,
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
        position: 'top-right',
      });
      navigate('/employees');
    } catch (error) {
      toast.error(getError(error), {
        position: 'top-right',
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
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
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

  // --------------educational documents----------------
  const uploadtenththCertificate = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/educationaldocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setTenth_marksheet([...tenth_marksheet, data.secure_url]);
      } else {
        setTenth_marksheet(data.secure_url);
      }

      toast.success('10th marksheet uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  const uploadtwelthordiplomaCertificate = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/educationaldocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setTwelth_or_diploma_marksheet([
          ...twelth_or_diploma_marksheet,
          data.secure_url,
        ]);
      } else {
        setTwelth_or_diploma_marksheet(data.secure_url);
      }

      toast.success('12th/diploma marksheet uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  const uploaddegreeorPGCertificate = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/educationaldocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setUnder_geaduate_or_post_graduate_marksheet([
          ...under_geaduate_or_post_graduate_marksheet,
          data.secure_url,
        ]);
      } else {
        setUnder_geaduate_or_post_graduate_marksheet(data.secure_url);
      }

      toast.success('UG/PG certifate uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  // --------------educational documents----------------

  // ------------------------   identificationdocuments-----------------------

  const uploadAddressProof = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/identificationdocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setAddresProof([...addressProof, data.secure_url]);
      } else {
        setAddresProof(data.secure_url);
      }

      toast.success('Addres Proof uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  const uploadAdharCard = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/identificationdocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setAadhar_card_file([...aadhar_card_file, data.secure_url]);
      } else {
        setAadhar_card_file(data.secure_url);
      }

      toast.success('Adhar card uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  const uploadPanCard = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/identificationdocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setPan_card_file([...pan_card_file, data.secure_url]);
      } else {
        setPan_card_file(data.secure_url);
      }

      toast.success('Pan card uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  const uploadBankPassbook = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/identificationdocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setBank_account_file([...bank_account_file, data.secure_url]);
      } else {
        setBank_account_file(data.secure_url);
      }

      toast.success('Bank passbook uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };

  const uploadExperienceLetter = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_DOCUMENT_REQUEST' });
      const { data } = await axios.post(
        '/api/upload/identificationdocuments',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_DOCUMENT_SUCCESS' });

      if (forImages) {
        setExperience_letter([...experience_letter, data.secure_url]);
      } else {
        setExperience_letter(data.secure_url);
      }

      toast.success('Experience letter uploaded successfully.', {
        position: 'top-right',
      });
    } catch (err) {
      toast.success(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPLOAD_DOCUMENT_FAIL', payload: getError(err) });
    }
  };
  // ------------------------   identificationdocuments----------------------

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

        <h2 style={styles.sectionHeader}>Educational Details</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.label}>10th Grade:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="tenth_grade"
                  placeholder="tenth_grade"
                  value={tenth_grade}
                  onChange={(e) => setTenth_grade(e.target.value)}
                />
              </td>

              <td style={styles.label} className="ms-2">
                10th Marksheet:
              </td>
              <td className="d-flex">
                {tenth_marksheet ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target={`#myModal_10thCertificate`}
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadtenththCertificate}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="10th Marksheet"
                  modalName="myModal_10thCertificate"
                  img={tenth_marksheet}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>10th School Name:</td>
              <td colSpan="3">
                <textarea
                  style={styles.input}
                  type="text"
                  id="tenth_schoolname"
                  placeholder="Enter 10 the School Name"
                  value={tenth_schoolName}
                  onChange={(e) => setTenth_schoolName(e.target.value)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td style={styles.label}>12th/Diploma Grade:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="twelth_or_diploma_grade"
                  placeholder="12th/Diploma Grade"
                  value={twelth_or_diploma_grade}
                  onChange={(e) => setTwelth_or_diploma_grade(e.target.value)}
                />
              </td>
              <td style={styles.label}>12th/Diploma marksheet:</td>
              <td className="d-flex">
                {twelth_or_diploma_marksheet ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_12thCertificate"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadtwelthordiplomaCertificate}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="12th Marksheet"
                  modalName="myModal_12thCertificate"
                  img={twelth_or_diploma_marksheet}
                />
              </td>
            </tr>

            <tr>
              <td style={styles.label}>12th/Diploma College Name:</td>
              <td colSpan="3">
                <textarea
                  style={styles.input}
                  type="text"
                  id="twelth_or_diploma_marksheet_collegeName"
                  placeholder="Enter 12th/Diploma College Name"
                  value={twelth_or_diploma_collegeName}
                  onChange={(e) =>
                    setTwelth_or_diploma_collegeName(e.target.value)
                  }
                ></textarea>
              </td>
            </tr>

            <tr>
              <td style={styles.label}>UG/PG Grade:</td>
              <td>
                {' '}
                <input
                  style={styles.input}
                  type="text"
                  id="under_geaduate_or_post_graduate_grade"
                  placeholder="Enter Under Graduate/ Post Graduate Grade"
                  value={under_geaduate_or_post_graduate_grade}
                  onChange={(e) =>
                    setUnder_geaduate_or_post_graduate_grade(e.target.value)
                  }
                />
              </td>
              <td style={styles.label}>UG/PG Marksheet:</td>
              <td className="d-flex">
                {under_geaduate_or_post_graduate_marksheet ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_ugpgthCertificate"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploaddegreeorPGCertificate}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="UG/PG Marksheet"
                  modalName="myModal_ugpgthCertificate"
                  img={under_geaduate_or_post_graduate_marksheet}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>UG/PG College Name:</td>

              <td colSpan={3}>
                <textarea
                  style={styles.input}
                  type="text"
                  id="under_geaduate_or_post_graduate_collegeName"
                  placeholder="Enter Under Graduate/ Post Graduate College Name"
                  value={under_geaduate_or_post_graduate_collegeName}
                  onChange={(e) =>
                    setUnder_geaduate_or_post_graduate_collegeName(
                      e.target.value
                    )
                  }
                ></textarea>
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

              <td style={styles.label}>No of family members:</td>
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
              <td style={styles.label}>Address Proof:</td>
              <td className="d-flex">
                {addressProof ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_addressProof"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadAddressProof}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="Address Proof"
                  modalName="myModal_addressProof"
                  img={addressProof}
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
                  <option value="default">Select</option>
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
                  id="state"
                  style={styles.select}
                  value={salarygroup}
                  onChange={(e) => setSalarygroup(e.target.value)}
                >
                  <option value="default">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
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

              <td style={styles.label}> UID:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="uid"
                  placeholder="UID"
                  value={UID}
                  onChange={(e) => setUID(e.target.value)}
                />
              </td>
            </tr>
            <tr>
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
            </tr>
            <tr>
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
            </tr>
            <tr>
              <td style={styles.label}>Experience Letter:</td>
              <td className="d-flex">
                {experience_letter ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_experience_letter"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadExperienceLetter}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="Address Proof"
                  modalName="myModal_experience_letter"
                  img={experience_letter}
                />
              </td>
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

        <h2 style={styles.sectionHeader}>Identification Documents </h2>
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
              <td className="d-flex">
                {aadhar_card_file ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_aadhar_card_file"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadAdharCard}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="Aaadhar card"
                  modalName="myModal_aadhar_card_file"
                  img={aadhar_card_file}
                />
              </td>

              <td style={styles.label}>Upload PAN File:</td>
              <td className="d-flex">
                {pan_card_file ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_pan_card_file"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadPanCard}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="Pan card"
                  modalName="myModal_pan_card_file"
                  img={pan_card_file}
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
              <td style={styles.label}>IFSC code:</td>
              <td>
                <input
                  style={styles.input}
                  type="text"
                  id="ifsc_code"
                  placeholder="Enter bank ifsc code"
                  value={ifsc_code}
                  onChange={(e) => setIfsc_code(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td style={styles.label}>Upload Bank File:</td>
              <td className="d-flex">
                {bank_account_file ? (
                  <Link
                    type="button"
                    className="badge bg-success text-decoration-none d-flex justify-content-center align-items-center my-2 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal_bank_account_file"
                    onClick={handleShowImage}
                  >
                    <IoEyeOutline />
                  </Link>
                ) : (
                  ''
                )}

                <div>
                  <input
                    style={{ width: '50%' }}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    onChange={uploadBankPassbook}
                    className="my-2 mx-2"
                  />
                  {loadingDocumentUpload && <LoadingBox4 />}
                </div>

                <MyModal
                  showModal={showImageModal}
                  handleClose={handleCloseImageModal}
                  data="Bank Account"
                  modalName="myModal_bank_account_file"
                  img={bank_account_file}
                />
              </td>
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
                  id="isHr"
                  className="input3"
                  checked={isHr}
                  onChange={(e) => setIsHr(e.target.checked)}
                />
                <label htmlFor="isSuperAdmin">HR</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isSoftwareDevlopment"
                  className="input3"
                  checked={isSoftwareDevlopment}
                  onChange={(e) => setIsSoftwareDevlopment(e.target.checked)}
                />
                <label htmlFor="softwaredev"> Software Dev.</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isHardwareDevlopment"
                  className="input3"
                  checked={isHardwareDevlopment}
                  onChange={(e) => setIsHardwareDevlopment(e.target.checked)}
                />
                <label htmlFor="softwaredev"> Hardware Dev.</label>
              </div>
              <div className="role-item">
                <input
                  type="checkbox"
                  id="isDirector"
                  className="input3"
                  checked={isDirector}
                  onChange={(e) => setIsDirector(e.target.checked)}
                />
                <label htmlFor="softwaredev">Director</label>
              </div>

              <div className="role-item">
                <input
                  type="checkbox"
                  id="isSuperAdmin"
                  className="input3"
                  checked={isSuperAdmin}
                  onChange={(e) => setIsSuperAdmin(e.target.checked)}
                />
                <label htmlFor="isSuperAdmin">Manager</label>
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

        {createloadingg ? (
          <button style={styles.button} type="submit" disabled>
            submiting..
            <LoadingBox4 />
          </button>
        ) : (
          <button style={styles.button} type="submit">
            submit
          </button>
        )}
      </form>
    </div>
  );
}

export default AddEmployee;
