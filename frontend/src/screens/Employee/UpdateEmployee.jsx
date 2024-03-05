import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';
import './Employee.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getError } from '../../utils';
import { Store } from '../../Store';
import { MdDeleteOutline, MdVerified } from 'react-icons/md';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import { Helmet } from 'react-helmet';
import LoadingBox1 from '../../components/LoadingBox1';
import dummyimage from './images.jpg';
import PdfModal from './PdfModal';
import { BiLinkAlt, BiSolidEdit } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PiLinkThin } from 'react-icons/pi';
import MyModal from './MyModal';
import { IoEyeOutline } from 'react-icons/io5';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_ADDRESS':
      return {
        ...state,
        employees: action.payload,
      };

    case 'FETCH_REQUEST':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return { ...state, employees: action.payload, loading: false };

    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'FETCH_SALARY_REQUEST':
      return { ...state, loadingSalary: true };

    case 'FETCH_SALARY_SUCCESS':
      return { ...state, payslip: action.payload, loadingSalary: false };

    case 'FETCH_SALARY_FAIL':
      return { ...state, loadingSalary: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };

    case 'UPDATE_SUCCESS':
      return { ...state, employees: action.payload, loadingUpdate: false };

    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, error: action.payload };

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

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

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
const UpdateEmployee = () => {
  let salaryRef = useRef();

  const { id } = useParams();
  const [
    {
      loading,
      error,
      employees,
      payslip,
      loadingSalary,
      loadingUpdate,
      loadingUpload,
      loadingDelete,
      loadingDocumentUpload,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    payslip: [],
    employees: {},
    loading: true,
    error: '',
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  // const navigate = useNavigate();
  const [isPanModalLoading, setIsPanModalLoading] = useState(false);

  const [employee_id, setEmployee_id] = useState('');
  const [UID, setUID] = useState('');
  // const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [address, setAddress] = useState('');
  const [addressProof, setAddressProof] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [State, setState] = useState('');
  const [birth_date, setBirth_date] = useState('');
  const [aadhar_no, setAdharno] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [pf_account_no, setPf_account_no] = useState('');
  const [bank_account_no, setBank_account_no] = useState('');
  const [ifsc_code, setIfsc_code] = useState('');
  const [pan_number, setPan_number] = useState('');
  const [isAdmin, setIsAdmin] = useState();
  const [isSuperAdmin, setIsSuperAdmin] = useState();
  const [isSales, setIsSales] = useState();
  const [isScm, setIsScm] = useState();
  const [isDesign, setIsDesign] = useState();
  const [isProject, setIsProject] = useState();
  const [isVisitor, setIsVisitor] = useState();
  const [isProduction, setIsProduction] = useState();
  const [isAccountant, setIsAccountant] = useState();
  const [isHr, setIsHr] = useState();
  // ifsc_code isSoftwareDevlopment isHardwareDevlopment
  const [isSoftwareDevlopment, setIsSoftwareDevlopment] = useState();
  const [isHardwareDevlopment, setIsHardwareDevlopment] = useState();
  const [isDirector, setIsDirector] = useState();
  const [ctc, setCtc] = useState();
  const [salarygroup, setSalarygroup] = useState();
  const [netsalary, setNetsalary] = useState();

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

  const [tenth_grade, setTenth_grade] = useState('');
  const [tenth_marksheet, setTenth_marksheet] = useState('');
  const [tenth_schoolName, setTenth_schoolName] = useState('');

  const [twelth_or_diploma_grade, setTwelth_or_diploma_grade] = useState('');
  const [twelth_or_diploma_marksheet, setTwelth_or_diploma_marksheet] =
    useState('');
  const [twelth_or_diploma_collegeName, setTwelth_or_diploma_collegeName] =
    useState('');

  const [
    under_geaduate_or_post_graduate_grade,
    setUnder_geaduate_or_post_graduate_grade,
  ] = useState('');
  const [
    under_geaduate_or_post_graduate_marksheet,
    setUnder_geaduate_or_post_graduate_marksheet,
  ] = useState('');
  const [
    under_geaduate_or_post_graduate_collegeName,
    setUnder_geaduate_or_post_graduate_collegeName,
  ] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  // Function to handle modal opening
  const openModal = () => {
    setShowModal(true);
  };

  const [salaryMonth, setSalaryMonth] = useState('');
  const [salaryyear, setSalaryYear] = useState('');
  const [basic, setBasic] = useState('');
  const [hra, setHRA] = useState('');
  const [conveyance, setConveyance] = useState('');
  const [special, setSpecial] = useState('');
  const [medical, setMedical] = useState('');
  const [pt, setPT] = useState('');
  const [pf, setPF] = useState('');
  const [esi, setESI] = useState('');
  const [total_deduction, setTotalDeduction] = useState('');
  const [gross, setGross] = useState('');
  const [employer_pf, setEmployerPF] = useState('');
  const [employer_esi, setEmployer_esi] = useState('');
  const [bonus, setBonus] = useState('');
  // employer_esi, bonus

  const [showImageModal, setShowImageModal] = useState(false);

  const handleShowImage = () => {
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  useEffect(() => {
    // Simulate API call or data fetching

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const result = await axios.get(`/api/employees/details/${id}`);
        console.log(result.data);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data.employee });
        // console.log(result.data.employee.address);
        setEmployee_id(result.data.employee.employee_id);
        setUID(result.data.employee.UID);
        setFirstName(result.data.employee.firstName);
        setLastName(result.data.employee.lastName);
        setImage(result.data.employee.image);
        setEmail(result.data.employee.email);
        setExperience(result.data.employee.experience);
        setJoiningDate(result.data.employee.joiningDate);
        setAddress(result.data.employee.address);
        setAddressProof(result.data.employee.addressProof);
        setAge(result.data.employee.age);
        setDesignation(result.data.employee.designation);
        setGender(result.data.employee.gender);
        setState(result.data.employee.state);
        setBirth_date(result.data.employee.birth_date);

        setIsAdmin(result.data.employee.isAdmin);
        setIsSuperAdmin(result.data.employee.isSuperAdmin);
        setIsSales(result.data.employee.isSales);
        setIsScm(result.data.employee.isScm);
        setIsDesign(result.data.employee.isDesign);
        setIsProject(result.data.employee.isProject);
        setIsVisitor(result.data.employee.isVisitor);
        setIsProduction(result.data.employee.isProduction);
        setIsAccountant(result.data.employee.isAccountant);
        setIsHr(result.data.employee.isHr);
        // ifsc_code isSoftwareDevlopment isHardwareDevlopment

        setIfsc_code(result.data.employee.ifsc_code);
        setIsSoftwareDevlopment(result.data.employee.isSoftwareDevlopment);
        setIsHardwareDevlopment(result.data.employee.isHardwareDevlopment);
        setIsDirector(result.data.employee.isDirector);

        setTenth_grade(result.data.employee.tenth_grade);
        setTenth_marksheet(result.data.employee.tenth_marksheet);
        setTenth_schoolName(result.data.employee.tenth_schoolName);

        setTwelth_or_diploma_marksheet(
          result.data.employee.twelth_or_diploma_marksheet
        );
        setTwelth_or_diploma_collegeName(
          result.data.employee.twelth_or_diploma_collegeName
        );
        setTwelth_or_diploma_grade(
          result.data.employee.twelth_or_diploma_grade
        );

        setUnder_geaduate_or_post_graduate_marksheet(
          result.data.employee.under_geaduate_or_post_graduate_marksheet
        );
        setUnder_geaduate_or_post_graduate_collegeName(
          result.data.employee.under_geaduate_or_post_graduate_collegeName
        );
        setUnder_geaduate_or_post_graduate_grade(
          result.data.employee.under_geaduate_or_post_graduate_grade
        );

        setFather_husband_name(result.data.employee.father_husband_name);
        setMarital_status(result.data.employee.marital_status);
        setSub_locality(result.data.employee.sub_locality);
        setDistrict(result.data.employee.district);
        setPinCode(result.data.employee.pinCode);
        setNominee_name(result.data.employee.nominee_name);
        setNominee_relationship(result.data.employee.nominee_relationship);
        setNominee_address(result.data.employee.nominee_address);
        setNominee_sub_locality(result.data.employee.nominee_sub_locality);
        setNominee_district(result.data.employee.nominee_district);
        setNominee_state(result.data.employee.nominee_state);
        setNominee_mobile_no(result.data.employee.nominee_mobile_no);
        setNominee_pinCode(result.data.employee.nominee_pinCode);
        setNominee_email(result.data.employee.nominee_email);
        setNo_of_family_members(result.data.employee.no_of_family_members);
        setAlternate_mobile_no(result.data.employee.alternate_mobile_no);
        setPersonal_email(result.data.employee.personal_email);
        setAadhar_card_file(result.data.employee.aadhar_card_file);
        setPan_card_file(result.data.employee.pan_card_file);
        setBank_account_file(result.data.employee.bank_account_file);
        setPrevious_company_name(result.data.employee.previous_company_name);
        setExperience_letter(result.data.employee.experience_letter);
        setAdharno(result.data.employee.aadhar_no);
        setMobile_no(result.data.employee.mobile_no);
        setPf_account_no(result.data.employee.pf_account_no);
        setBank_account_no(result.data.employee.bank_account_no);
        setPan_number(result.data.employee.pan_number);

        // /api/payslip
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    const SalaryData = async () => {
      dispatch({ type: 'FETCH_SALARY_REQUEST' });
      try {
        const salaryResult = await axios.get(`/api/payslip/${id}`);
        console.log(salaryResult.data);
        dispatch({
          type: 'FETCH_SALARY_SUCCESS',
          payload: salaryResult.data.payslip,
        });

        setCtc(salaryResult.data.payslip.ctc);
        setSalarygroup(salaryResult.data.payslip.salarygroup);
        setNetsalary(salaryResult.data.payslip.netsalary);

        setSalaryMonth(salaryResult.data.payslip.month);
        setSalaryYear(salaryResult.data.payslip.year);
        setBasic(salaryResult.data.payslip.basic);
        setHRA(salaryResult.data.payslip.hra);
      } catch (err) {
        dispatch({ type: 'FETCH_SALARY_FAIL', payload: err.message });
      }
    };

    // fetchData();

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
    SalaryData();
  }, [id, successDelete]);

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

  const SubmitHandler = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_REQUEST',
    });
    try {
      const { data } = await axios.put(
        `/api/employees/updateemployee/${id}`,
        {
          employee_id,
          UID,
          email,
          NAME: `${firstName} ${lastName}`,
          firstName,
          lastName,
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
          ifsc_code,
          isSoftwareDevlopment,
          isHardwareDevlopment,
          isDirector,
          tenth_marksheet,
          tenth_schoolName,
          twelth_or_diploma_marksheet,
          twelth_or_diploma_collegeName,
          under_geaduate_or_post_graduate_marksheet,
          under_geaduate_or_post_graduate_collegeName,
          tenth_grade,
          twelth_or_diploma_grade,
          under_geaduate_or_post_graduate_grade,
          state: State,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);

      // dispatch({ type: 'REFRESH_ADDRESS', payload: employees });
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data.employee,
      });
      setAddress(false);
      const custommessage = data.message;

      toast.success(custommessage, {
        position: 'top-right',
      });
      // navigate(`/employees`);
    } catch (err) {
      toast.error(getError(err), {
        position: 'top-right',
      });
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const DeactivateHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(
        `/api/employees/activate/${id}`,
        {
          activate: 0,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.employee });

      const customMessage = data.message;

      toast.success(customMessage, {
        position: 'top-right',
      });

      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const ActivateHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: 'UPDATE_REQUEST' });

    try {
      const { data } = await axios.put(
        `/api/employees/activate/${id}`,
        {
          activate: 1,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: 'UPDATE_SUCCESS', payload: data.employee });
      const customMessage = data.message;

      toast.success(customMessage, {
        position: 'top-right',
      });

      // toast.success('Employee Deactivated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    padding: '5px 15px',
    backgroundColor: isHovered ? '#fc129f' : '#ff20ec', // Change the background color on hover
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    marginTop: '15px',
    display: 'block',
    marginLeft: 'auto',
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

    input2: {
      width: '120px',
      padding: '8px',
      fontSize: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      margin: '1px',
      transition: 'border-color 0.3s ease-in-out',
      disabled: true,
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

    image: {
      height: '150px',
      width: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    imageContainer: {
      display: 'flex',

      justifyContent: 'space-between',
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

    link: {
      fontWeight: '900',
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

  function extractFileIdFromGoogleDriveLink(link) {
    // Check if link is defined and not null before using match
    if (link && link.match) {
      const match = link.match(/\/file\/d\/([^/]+)\//);
      return match ? match[1] : null;
    }
    return null; // Return null if link is not defined
  }

  // Check if employees properties are defined before extracting file IDs
  const googleAdharDriveLink = employees.aadhar_card_file;
  const googlePanDriveLink = employees.pan_card_file;
  const googleBankDriveLink = employees.bank_account_file;
  const googleExperienceDriveLink = employees.experience_letter;

  const AdharfileId = extractFileIdFromGoogleDriveLink(googleAdharDriveLink);
  const PanfileId = extractFileIdFromGoogleDriveLink(googlePanDriveLink);
  const BankfileId = extractFileIdFromGoogleDriveLink(googleBankDriveLink);
  const ExperiencefileId = extractFileIdFromGoogleDriveLink(
    googleExperienceDriveLink
  );

  // Create the file URLs with file IDs
  // const AdharFile = AdharfileId
  //   ? `https://drive.google.com/uc?id=${AdharfileId}`
  //   : null;
  // const PanFile = PanfileId
  //   ? `https://drive.google.com/uc?id=${PanfileId}`
  //   : null;
  // const BankFile = BankfileId
  //   ? `https://drive.google.com/uc?id=${BankfileId}`
  //   : null;
  // const ExperienceFile = ExperiencefileId
  //   ? `https://drive.google.com/uc?id=${ExperiencefileId}`
  //   : null;

  const AdharFile = AdharfileId
    ? `https://drive.google.com/viewerng/viewer?embedded=true&url=https://drive.google.com/uc?id=${AdharfileId}`
    : null;
  const PanFile = PanfileId
    ? `https://drive.google.com/viewerng/viewer?embedded=true&url=https://drive.google.com/uc?id=${PanfileId}`
    : null;
  const BankFile = BankfileId
    ? `https://drive.google.com/viewerng/viewer?embedded=true&url=https://drive.google.com/uc?id=${BankfileId}`
    : null;
  const ExperienceFile = ExperiencefileId
    ? `https://drive.google.com/viewerng/viewer?embedded=true&url=https://drive.google.com/uc?id=${ExperiencefileId}`
    : null;

  console.log('adhar', AdharFile);
  console.log('Pan', PanFile);
  console.log('bank', BankFile);
  console.log('experience', ExperienceFile);

  const [isAdharModalOpen, setIsAdharModalOpen] = useState(false);
  const [isPanModalOpen, setIsPanModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = payslip.filter(
    (item) =>
      item.NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee_id.includes(searchTerm) ||
      item.joiningDate.includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const sortedItems = currentItems.slice().sort((a, b) => {
    // Sort by year in descending order
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    // If years are the same, sort by ID in descending order
    return b.id - a.id;
  });
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = async (e, slipid) => {
    try {
      await axios.delete(`/api/payslip/${slipid}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      toast.success('Payslip deleted successfully');
      dispatch({
        type: 'DELETE_SUCCESS',
      });
      window.location.reload();
    } catch (err) {
      toast.error(getError(err));
      dispatch({
        type: 'DELETE_FAIL',
      });
    } finally {
      setShowModal(false);
    }
  };

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
        setAddressProof([...addressProof, data.secure_url]);
      } else {
        setAddressProof(data.secure_url);
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
      {loading ? (
        <LoadingBox5 />
      ) : error ? (
        <MsgBox className="alert alert-danger">{error}</MsgBox>
      ) : (
        <>
          <nav
            style={{ '--bs-breadcrumb-divider': "'>'" }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/employees" className="text-decoration-none">
                  Employees
                </Link>{' '}
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Employees Details
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <span className="text-success">{employees.NAME}</span>
              </li>
            </ol>
          </nav>{' '}
          <h1 style={styles.header}>Update Employee Details</h1>
          <div className="m-1 p-1 text-center ">
            <span className="fw-bolder">{employees.NAME}</span>-
            <span>{employees.employee_id}</span>
          </div>
          <Helmet>
            <title>{`${employees.NAME} - ${employees.employee_id}`}</title>
          </Helmet>
          <div style={styles.imageContainer}>
            <>
              <div className="m-2 p-1 text-center">
                {' '}
                {employees.activate === 1 ? (
                  <>
                    <span
                      className={`badge bg-success `}
                      style={{ fontSize: '15px' }}
                    >
                      activated
                    </span>

                    {loadingUpdate ? (
                      <LoadingBox4 />
                    ) : (
                      <MdVerified
                        className="fa fa-ban fs-5 ms-1 text-success "
                        style={{ cursor: 'pointer' }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="click here to deactivate"
                        onClick={DeactivateHandler}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <span
                      className={`badge bg-danger`}
                      style={{ fontSize: '15px' }}
                    >
                      deactivated
                    </span>
                    {loadingUpdate ? (
                      <LoadingBox4 />
                    ) : (
                      <i
                        className="fa fa-ban fs-5 ms-1 text-danger "
                        style={{ cursor: 'pointer' }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="click here to Activate"
                        onClick={ActivateHandler}
                      ></i>
                    )}
                  </>
                )}
              </div>

              {loadingUpload ? (
                <div style={styles.imageDiv}>
                  <LoadingBox1 />{' '}
                </div>
              ) : image ? (
                <span className="d-flex flex-column">
                  <img src={image} alt="profile" style={styles.image} />
                </span>
              ) : (
                <span className="d-flex flex-column">
                  <img src={dummyimage} alt="dummy" style={styles.image} />
                </span>
              )}
            </>
          </div>
          <form onSubmit={SubmitHandler}>
            <h2 style={styles.sectionHeader}>
              Personal Details [{' '}
              <Link
                className="text-center   text-decoration-none "
                to={`/leave-application/${employee_id}`}
              >
                Leaves
              </Link>{' '}
              ]
            </h2>
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
                      type="text"
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
                  <td style={styles.label}>
                    Profile Image
                    {image ? (
                      <Link
                        target="blank"
                        to={`${image}`}
                        className="fs-4"
                        style={styles.link}
                      >
                        <PiLinkThin />
                      </Link>
                    ) : (
                      ''
                    )}
                    :
                  </td>
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
                  <td style={styles.label}>Tenth Grade:</td>
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
                      placeholder="Enter 10 the School Nam"
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
                      onChange={(e) =>
                        setTwelth_or_diploma_marksheet(e.target.value)
                      }
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
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
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
                <tr>
                  {' '}
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
                      <option value="Arunachal Pradesh">
                        Arunachal Pradesh
                      </option>
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
                  <td style={styles.label}>Employee UID:</td>
                  <td>
                    <input
                      style={styles.input}
                      type="text"
                      id="UID"
                      placeholder="Employee UID"
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
                      type="text"
                      id="joiningDate"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                    />
                  </td>
                </tr>
                {experience === '0' ||
                experience === 'fresher' ||
                experience === 'Fresher' ? (
                  ''
                ) : (
                  <tr>
                    <td style={styles.label}>Experience Letter </td>
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
                        onChange={(e) =>
                          setPrevious_company_name(e.target.value)
                        }
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <h2 style={styles.sectionHeader}>Identification Documents</h2>
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
                  <td style={styles.label}>Upload Aadhar File</td>
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

                  <td style={styles.label}>Upload PAN File </td>
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
                      placeholder="Enter ifsc code"
                      value={ifsc_code}
                      onChange={(e) => setIfsc_code(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td style={styles.label}>Upload Bank File</td>
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
                      id="hr"
                      className="input3"
                      checked={isHr}
                      onChange={(e) => setIsHr(e.target.checked)}
                    />
                    <label htmlFor="isAdmin"> HR</label>
                  </div>
                  {/* // ifsc_code isSoftwareDevlopment isHardwareDevlopment */}

                  <div className="role-item">
                    <input
                      type="checkbox"
                      id="isSoftwareDevlopment"
                      className="input3"
                      checked={isSoftwareDevlopment}
                      onChange={(e) =>
                        setIsSoftwareDevlopment(e.target.checked)
                      }
                    />
                    <label htmlFor="softwaredev"> Software Dev.</label>
                  </div>

                  <div className="role-item">
                    <input
                      type="checkbox"
                      id="isHardwareDevlopment"
                      className="input3"
                      checked={isHardwareDevlopment}
                      onChange={(e) =>
                        setIsHardwareDevlopment(e.target.checked)
                      }
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
                    <label htmlFor="softwaredev"> Director</label>
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
            {/* 
            <button
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              type="submit"
            >
              {loadingUpdate ? (
                <>
                  updating
                  <LoadingBox4 />
                </>
              ) : (
                'Update'
              )}
            </button> */}

            <button
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              type="submit"
            >
              {loadingUpdate ? (
                <>
                  updating..
                  <LoadingBox4 />
                </>
              ) : (
                'Update'
              )}{' '}
            </button>
          </form>
          <h2 style={styles.sectionHeader} ref={salaryRef}>
            Salary Details
          </h2>
          <div className="d-flex justify-content-end">
            <Link
              to={`/addnewSalary/${employee_id}`}
              className="btn btn-sm btn-success m-1"
            >
              ADD
            </Link>
          </div>
          <div style={{ overflowX: 'scroll' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center">month</th>
                  <th className="text-center">year</th>
                  <th className="text-center">CTC</th>
                  <th className="text-center">Net Salary</th>
                  <th className="text-center">Salary Group</th>

                  <th className="text-center">Details</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{item.month}</td>
                    <td className="text-center">{item.year}</td>
                    <td className="text-center">{item.ctc}</td>
                    <td className="text-center">{item.netsalary}</td>
                    <td className="text-center">{item.salarygroup}</td>
                    <td className="text-center d-flex justify-content-center">
                      <Link
                        className="btn btn-sm btn-warning mx-1"
                        to={`/updateSalary/${item.employee_id}/${item.id}`}
                      >
                        <BiSolidEdit />
                      </Link>

                      <button
                        className="btn btn-sm btn-success mx-1"
                        data-bs-toggle="modal"
                        data-bs-target={`#viewSalary${item.id}`}
                        type="button"
                      >
                        <AiOutlineEye />
                      </button>

                      {/* ------------------------------view salary breakup-------------------------- */}
                      <div
                        class="modal fade"
                        id={`viewSalary${item.id}`}
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">
                                <b className="text-success"> {item.NAME}</b>{' '}
                                Salary Structure
                              </h5>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div style={{ overflowX: 'scroll' }}>
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th className="text-center">month</th>
                                      <th className="text-center">year</th>
                                      <th className="text-center">CTC</th>
                                      <th className="text-center">
                                        Net Salary
                                      </th>
                                      <th className="text-center">
                                        Salary group
                                      </th>
                                      <th className="text-center">BASIC</th>
                                      <th className="text-center">HRA</th>
                                      <th className="text-center">
                                        Conveyance
                                      </th>
                                      <th className="text-center">Medical</th>
                                      <th className="text-center">Special</th>
                                      <th className="text-center">PT</th>
                                      <th className="text-center">PF</th>
                                      <th className="text-center">ESI</th>
                                      <th className="text-center">
                                        Total Deduction
                                      </th>

                                      <th className="text-center">Gross</th>
                                      <th className="text-center">
                                        Employer PF
                                      </th>
                                      <th className="text-center">
                                        Employer ESI
                                      </th>
                                      <th className="text-center">Bonus</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className=" text-center">
                                        {' '}
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="month"
                                          value={item.month}
                                          onChange={(e) =>
                                            setSalaryMonth(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        {' '}
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="year"
                                          value={item.year}
                                          onChange={(e) =>
                                            setSalaryYear(e.target.value)
                                          }
                                        />
                                      </td>
                                      <td className=" text-center">
                                        {' '}
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="ctc"
                                          value={item.ctc}
                                          onChange={(e) =>
                                            setCtc(e.target.value)
                                          }
                                        />
                                      </td>
                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="netsalary"
                                          value={item.netsalary}
                                          onChange={(e) =>
                                            setNetsalary(e.target.value)
                                          }
                                        />
                                      </td>
                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="salarygroup"
                                          value={item.salarygroup}
                                          onChange={(e) =>
                                            setSalarygroup(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="basic"
                                          value={item.basic}
                                          onChange={(e) =>
                                            setBasic(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="hra"
                                          value={item.hra}
                                          onChange={(e) =>
                                            setHRA(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="conveyance"
                                          value={item.conveyance}
                                          onChange={(e) =>
                                            setConveyance(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="medical"
                                          value={item.medical}
                                          onChange={(e) =>
                                            setMedical(e.target.value)
                                          }
                                        />
                                      </td>
                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="special"
                                          value={item.special}
                                          onChange={(e) =>
                                            setSpecial(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="pt"
                                          value={item.pt}
                                          onChange={(e) =>
                                            setPT(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="pf"
                                          value={item.pf}
                                          onChange={(e) =>
                                            setPF(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="pf"
                                          value={item.esi}
                                          onChange={(e) =>
                                            setESI(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="total_deduction"
                                          value={item.total_deduction}
                                          onChange={(e) =>
                                            setTotalDeduction(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="gross"
                                          value={item.gross}
                                          onChange={(e) =>
                                            setGross(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="employer_pf"
                                          value={item.employer_pf}
                                          onChange={(e) =>
                                            setEmployerPF(e.target.value)
                                          }
                                        />
                                      </td>
                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="employer_esi"
                                          value={item.employer_esi}
                                          onChange={(e) =>
                                            setEmployer_esi(e.target.value)
                                          }
                                        />
                                      </td>

                                      <td className=" text-center">
                                        <input
                                          style={styles.input2}
                                          disabled
                                          type="text"
                                          id="bonus"
                                          value={item.bonus}
                                          onChange={(e) =>
                                            setBonus(e.target.value)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ------------------------------view salary breakup-------------------------- */}

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-bs-toggle="modal"
                        data-bs-backdrop="false"
                        onClick={openModal}
                        data-bs-target={`#exampleModal_${item.id}`}
                      >
                        <MdDeleteOutline />
                      </button>

                      <div
                        className={`modal fade${showModal ? ' show' : ''}`}
                        id={`exampleModal_${item.id}`}
                        tabIndex="-1"
                        aria-labelledby={`exampleModalLabel_${item.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered modal-sm">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`exampleModalLabel_${item.id}`}
                              >
                                Confirmation
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              Are you sure to delete Salary Structure for month{' '}
                              {item.month}?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={(e) => deleteHandler(e, item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <button
              style={buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              type="submit"
            >
              {loadingUpdate ? (
                <>
                  updating Salary Detials
                  <LoadingBox4 />
                </>
              ) : (
                'Update Salary Details'
              )}
            </button> */}
        </>
      )}

      {/* <iframe title={image} src={image} width={700} height={600} /> */}
    </div>
  );
};

export default UpdateEmployee;
