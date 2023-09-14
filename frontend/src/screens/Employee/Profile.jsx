import { useContext, useEffect, useReducer, useState } from 'react';
import { BiLinkAlt } from 'react-icons/bi';
import axios from 'axios';
import { Store } from '../../Store';
import { Link, useParams } from 'react-router-dom';
import LoadingBox5 from '../../components/LoadingBox/LoadingBox5';
import MsgBox from '../../components/MessageBox/MsgBox';
import LoadingBox4 from '../../components/LoadingBox/LoadingBox4';
import { MdVerified } from 'react-icons/md';
import LoadingBox1 from '../../components/LoadingBox1';
import { Helmet } from 'react-helmet';
import dummyimage from './images.jpg';
import PdfModal from './PdfModal';

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

    default:
      return state;
  }
};
const Profile = () => {
  const { id } = useParams();
  const [
    { loading, error, employees, loadingUpdate, loadingUpload },
    dispatch,
  ] = useReducer(reducer, {
    employees: {},
    loading: true,
    error: '',
  });
  const { dispatch: ctxDispatch } = useContext(Store);
  // const navigate = useNavigate();

  const [employee_id, setEmployee_id] = useState('');
  // const [name, setName] = useState('');
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
  const [pf_account_no, setPf_account_no] = useState('');
  const [bank_account_no, setBank_account_no] = useState('');
  const [uan_number, setUan_number] = useState('');
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
        setFirstName(result.data.employee.firstName);
        setLastName(result.data.employee.lastName);
        setImage(result.data.employee.image);
        setEmail(result.data.employee.email);
        setExperience(result.data.employee.experience);
        setJoiningDate(result.data.employee.joiningDate);
        setAddress(result.data.employee.address);
        setAge(result.data.employee.age);
        setDesignation(result.data.employee.designation);
        setGender(result.data.employee.gender);
        setState(result.data.employee.state);
        setBirth_date(result.data.employee.birth_date);
        setAdharno(result.data.employee.aadhar_no);
        setMobile_no(result.data.employee.mobile_no);
        setPf_account_no(result.data.employee.pf_account_no);
        setBank_account_no(result.data.employee.bank_account_no);
        setUan_number(result.data.employee.uan_number);
        setPan_number(result.data.employee.pan_number);
        setIsAdmin(result.data.employee.isAdmin);
        setIsSuperAdmin(result.data.employee.isSuperAdmin);
        setIsSales(result.data.employee.isSales);
        setIsScm(result.data.employee.isScm);
        setIsDesign(result.data.employee.isDesign);
        setIsProject(result.data.employee.isProject);
        setIsVisitor(result.data.employee.isVisitor);
        setIsProduction(result.data.employee.isProduction);
        setIsAccountant(result.data.employee.isAccountant);

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
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };

    // setLoading(true);
    fetchData();
  }, [id]);

  // const pdfUrl =
  //   'https://drive.google.com/uc?id=1sxdUCwjVu0J22k0qWc_uF7l39OvN248s';

  // function extractFileIdFromGoogleDriveLink1(link) {
  //   const match1 = link.match(/\/file\/d\/([^/]+)\//);
  //   return match1 ? match1[1] : null;
  // }
  // function extractFileIdFromGoogleDriveLink2(link) {
  //   const match2 = link.match(/\/file\/d\/([^/]+)\//);
  //   return match2 ? match2[1] : null;
  // }
  // function extractFileIdFromGoogleDriveLink3(link) {
  //   const match3 = link.match(/\/file\/d\/([^/]+)\//);
  //   return match3 ? match3[1] : null;
  // }
  // function extractFileIdFromGoogleDriveLink4(link) {
  //   const match4 = link.match(/\/file\/d\/([^/]+)\//);
  //   return match4 ? match4[1] : null;
  // }
  // const googleAdharDriveLink = employees.aadhar_card_file;
  // const googlePanDriveLink = employees.pan_card_file;
  // const googleBankDriveLink = employees.bank_account_file;
  // const googleExperienceDriveLink = employees.experience_letter;
  // const AdharfileId = extractFileIdFromGoogleDriveLink1(googleAdharDriveLink);
  // const PanfileId = extractFileIdFromGoogleDriveLink2(googlePanDriveLink);
  // const BankfileId = extractFileIdFromGoogleDriveLink3(googleBankDriveLink);
  // const ExperiencefileId = extractFileIdFromGoogleDriveLink4(
  //   googleExperienceDriveLink
  // );

  // console.log(ExperiencefileId);
  // const AdharFile = `https://drive.google.com/uc?id=${AdharfileId}`;
  // const PanFile = `https://drive.google.com/uc?id=${PanfileId}`;
  // const BankFile = `https://drive.google.com/uc?id=${BankfileId}`;
  // const ExperienceFile = `https://drive.google.com/uc?id=${ExperiencefileId}`;

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
  const AdharFile = AdharfileId
    ? `https://drive.google.com/uc?id=${AdharfileId}`
    : null;
  const PanFile = PanfileId
    ? `https://drive.google.com/uc?id=${PanfileId}`
    : null;
  const BankFile = BankfileId
    ? `https://drive.google.com/uc?id=${BankfileId}`
    : null;
  const ExperienceFile = ExperiencefileId
    ? `https://drive.google.com/uc?id=${ExperiencefileId}`
    : null;

  console.log('adhar', AdharFile);
  console.log('Pan', PanFile);
  console.log('bank', BankFile);
  console.log('experience', ExperienceFile);

  const [isAdharModalOpen, setIsAdharModalOpen] = useState(false);
  const [isPanModalOpen, setIsPanModalOpen] = useState(false);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);

  // Separate open and close functions for each modal
  const openAdharModal = () => {
    setIsAdharModalOpen(true);
  };

  const closeAdharModal = () => {
    setIsAdharModalOpen(false);
  };

  const openPanModal = () => {
    setIsPanModalOpen(true);
  };

  const closePanModal = () => {
    setIsPanModalOpen(false);
  };

  const openBankModal = () => {
    setIsBankModalOpen(true);
  };

  const closeBankModal = () => {
    setIsBankModalOpen(false);
  };

  const openExperienceModal = () => {
    setIsExperienceModalOpen(true);
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
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
    // input: {
    //   width: '100%',
    //   padding: '8px',
    //   fontSize: '1rem',
    //   border: '1px solid #ccc',
    //   borderRadius: '4px',
    //   margin: '1px',
    // },
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

    image: {
      height: '150px',
      width: '150px',
      borderRadius: '50%',
      objectFit: 'fill',
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
                <span className="text-success">{employees.name}</span>
              </li>
            </ol>
          </nav>{' '}
          <h1 style={styles.header}> Employee Details</h1>
          <div className="m-1 p-1 text-center ">
            <span className="fw-bolder">{employees.name}</span>-
            <span>{employees.employee_id}</span>
          </div>
          <Helmet>
            <title>{`${employees.name} - ${employees.employee_id}`}</title>
          </Helmet>
          <div style={styles.imageContainer}>
            <>
              <div className="m-2 p-1 text-center">
                {' '}
                {employees.activate === 'true' ? (
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
                      <MdVerified className="fa fa-ban fs-5 ms-1 text-success " />
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
                      <i className="fa fa-ban fs-5 ms-1 text-danger "></i>
                    )}
                  </>
                )}
              </div>

              {loadingUpload ? (
                <div style={styles.imageDiv}>
                  <LoadingBox1 />{' '}
                </div>
              ) : image ? (
                <img src={image} alt="profile" style={styles.image} />
              ) : (
                <img src={dummyimage} alt="dummy" style={styles.image} />
              )}
            </>
            {/* <p className="text-center"> Profile Image</p> */}
          </div>
          <h2 style={styles.sectionHeader}>Personal Details</h2>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>First Name:</td>
                <td>
                  <input
                    disabled
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
                    disabled
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
                    disabled
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
                  <input
                    disabled
                    type="text"
                    name=""
                    id=""
                    style={styles.input}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Date of Birth:</td>
                <td>
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    id="birth_date"
                    value={birth_date}
                    onChange={(e) => setBirth_date(e.target.value)}
                  />
                </td>

                <td style={styles.label}>Marital Status:</td>
                <td>
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    value={marital_status}
                    onChange={(e) => setMarital_status(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Father/Husband Name:</td>
                <td>
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    id="father_husband_name"
                    placeholder="Father/Husband Name"
                    value={father_husband_name}
                    onChange={(e) => setFather_husband_name(e.target.value)}
                  />
                </td>
                {/* <td style={styles.label}>Profile Image:</td>
                <td>
                  <input disabled
                    style={styles.file}
                    type="file"
                    id="profile"
                    placeholder="profile"
                    
                  />
                </td>  */}
              </tr>
            </tbody>
          </table>
          <h2 style={styles.sectionHeader}>Contact Information</h2>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>Personal Email:</td>
                <td>
                  <input
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>Pin Code:</td>
                <td>
                  <input
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    value={nominee_state}
                    onChange={(e) => setNominee_state(e.target.value)}
                  />
                </td>
                <td style={styles.label}>Nominee Pin Code:</td>
                <td>
                  <input
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                    style={styles.input}
                    type="text"
                    id="joiningDate"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                  />
                </td>

                <td style={styles.label}>Previous Company :</td>
                <td>
                  <input
                    disabled
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
          <h2 style={styles.sectionHeader}>Identification Documents</h2>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.label}>Aadhar No:</td>
                <td>
                  <input
                    disabled
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
                    disabled
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
                <td style={styles.label}>Bank Account No:</td>
                <td>
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    id="employee_id"
                    placeholder="Enter bank account no"
                    value={bank_account_no}
                    onChange={(e) => setBank_account_no(e.target.value)}
                  />
                </td>

                <td style={styles.label}>UAN No:</td>
                <td>
                  <input
                    disabled
                    style={styles.input}
                    type="text"
                    id="joiningDate"
                    placeholder="UAN Number"
                    value={uan_number}
                    onChange={(e) => setUan_number(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.label}>PF Account No:</td>
                <td>
                  <input
                    disabled
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
          {/* <h2 style={styles.sectionHeader}>Document Links</h2>
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Adhar</span>
              <span>
                {' '}
                <Link onClick={openAdharModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isAdharModalOpen}
                  closeModal={closeAdharModal}
                  pdfUrl={AdharFile}
                />
              </span>
            </div>

            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Pan</span>
              <span>
                {' '}
                <Link onClick={openPanModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isPanModalOpen}
                  closeModal={closePanModal}
                  pdfUrl={PanFile}
                />
              </span>
            </div>

            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Bank Account</span>
              <span>
                {' '}
                <Link onClick={openBankModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isBankModalOpen}
                  closeModal={closeBankModal}
                  pdfUrl={BankFile}
                />
              </span>
            </div>

            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Experience Letter</span>
              <span>
                {' '}
                <Link onClick={openExperienceModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isExperienceModalOpen}
                  closeModal={closeExperienceModal}
                  pdfUrl={ExperienceFile}
                />
              </span>
            </div>
          </div> */}
          <h2 style={styles.sectionHeader}>Document Links</h2>
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Adhar</span>
              <span>
                {' '}
                <Link onClick={openAdharModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isAdharModalOpen}
                  closeModal={closeAdharModal}
                  pdfUrl={AdharFile}
                />
              </span>
            </div>

            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Pan</span>
              <span>
                {' '}
                <Link onClick={openPanModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isPanModalOpen}
                  closeModal={closePanModal}
                  pdfUrl={PanFile}
                />
              </span>
            </div>

            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Bank Account</span>
              <span>
                {' '}
                <Link onClick={openBankModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isBankModalOpen}
                  closeModal={closeBankModal}
                  pdfUrl={BankFile}
                />
              </span>
            </div>

            <div className="d-flex m-1 badge bg-warning p-2">
              <span className="me-1 text-dark">Experience Letter</span>
              <span>
                {' '}
                <Link onClick={openExperienceModal}>
                  <BiLinkAlt className="text-info fw-bold" />
                </Link>
                <PdfModal
                  isOpen={isExperienceModalOpen}
                  closeModal={closeExperienceModal}
                  pdfUrl={ExperienceFile}
                />
              </span>
            </div>
          </div>
          <h2 style={styles.sectionHeader}></h2>
          <div className="employee-form-container">
            <div className="form-section">
              <h4>Assign Role</h4>
              <div className="role-row">
                <div className="role-item">
                  <input
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
          <h2 style={styles.sectionHeader}></h2>
          <h2
            style={styles.sectionHeader}
            className="d-flex justify-content-center"
          >
            Note:{' '}
            <span className="text-muted">
              If you want to update any details please contact to admin
            </span>
          </h2>
          {employees.payslips.length > 0 ? (
            <>
              {' '}
              <hr />
              <div className=" p-1 m-1 ">
                <h4>
                  <b>Available Pay-slips</b>
                </h4>
                <div className="table-responsive">
                  <table
                    className="table table-bordered "
                    style={{ overflowX: 'auto' }}
                  >
                    <thead>
                      <tr>
                        <th className="col-md-1 text-center">Month</th>
                        <th className="col-md-1 text-center">Salary</th>
                        <th className="col-md-1 text-center">Bonus</th>
                        <th className="col-md-1 text-center">Deduction</th>
                        <th className="col-md-1 text-center">
                          Deduction Reason
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.payslips
                        .slice() // Create a copy of the array to avoid mutating the original array
                        .reverse() // Reverse the array to show the latest payslips first
                        .map((item, index) => (
                          <tr key={index}>
                            <td className=" text-center">
                              <span className="badge bg-success">
                                {item.month.toUpperCase()}-{item.year}
                              </span>{' '}
                            </td>
                            <td className="text-center">{item.salary}</td>
                            <td className="text-center">
                              {item.bonuses === 0 ? `0` : `${item.bonuses}`}
                            </td>
                            <td className="text-center">{item.deductions}</td>
                            <td className="text-center">
                              {item.deductionReason}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
