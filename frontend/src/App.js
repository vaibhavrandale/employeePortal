import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Employee from './screens/Employee/Employee';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
// import AdminRoute from './components/AdminRoute';
import Dashboard from './screens/Dashboard';
import AddEmployee from './screens/Employee/AddEmployee';
import Signin from './screens/Signin/Signin';
import { Toaster } from 'react-hot-toast';
import Leaves from './screens/Leaves/Leaves';
import LeavesHistory from './screens/Leaves/LeavesHistory';
import SiteList from './screens/SiteSurvey/SiteList';
import SiteDetails from './screens/SiteSurvey/SiteDetails';
import Survey from './screens/SiteSurvey/Survey';
import AddNewSite from './screens/SiteSurvey/AddNewSite';
import UpdateSurvey from './screens/SiteSurvey/UpdateSurvey';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFoundPage from './components/pageNotFound/NotFoundPage';
import SurveyGallery from './screens/SiteSurvey/SurveyGallery';
import Profile from './screens/Employee/Profile';
import ForgetPasswordScreen from './screens/Signin/ForgetPasswordScreen';
import ResetPasswoed from './screens/Signin/ResetPasswoed';
import Dummypages from './screens/Dummypages';
import PlantLayout from './screens/SiteSurvey/PlantLayout';
import SalaryEntry from './screens/salarySleep/SalaryEntry';
import Table from './screens/Table';
import CreateNewSyrvey from './screens/SiteSurvey/CreateNewSyrvey';
// import Calendar from './screens/Calendar/Calendar';
import MyCalendar from './screens/Calendar/MyCalendar';
import EditLeave from './screens/Leaves/EditLeave';
import LeaveApplication from './screens/Leaves/LeaveApplication';
import SuperAdminRoutes from './components/SuperAdminRoutes';
import NoticeHome from './screens/Notice/NoticeHome';
import ViewNotice from './screens/Notice/ViewNotice';
import NewNotice from './screens/Notice/NewNotice';
import ProgressBar from './ProgressBar';
import EditNotice from './screens/Notice/EditNotice';
import Upcoming from './components/Upcoming';
import Wishes from './screens/Employee/Wishes';
import UpdateEmployee from './screens/Employee/UpdateEmployee';
import SalarySleepNew from './screens/Attendance/SalarySleepNew';
import SalarySleepUpdated from './screens/salarySleep/SalarySleepUpdated';
import IndividualAttedance from './screens/Attendance/IndividualAttedance';
import Available from './screens/SiteInventory/Available';
import AllSites from './screens/SiteInventory/AllSites';
import AttendanceTableUpdated from './screens/Attendance/AttendanceTableUpdated';
import LeaveStatus from './screens/Leaves/LeaveStatus';
import SalarySlip from './screens/temp_salaryslip/SalarySlip';
import Generateslip from './screens/temp_salaryslip/Generateslip';
import UpdateSalary from './screens/Employee/UpdateSalary';
import AddNewSalary from './screens/Employee/AddNewSalary';
import NewAttendance from './screens/Attendance/NewAttendance';
// import PdfViewer from './screens/PdfViewer';
function App() {
  return (
    <>
      <Router>
        <AppRouter />
        <Toaster
          position="top-right"
          // ... other configurations
        />
      </Router>
    </>
  );
}

function AppRouter() {
  const location = useLocation();
  // const isSigninPage = location.pathname === '/signin';
  // const forgetPassword = location.pathname === '/forget-password';
  // const resetetPassword = location.pathname === '/reset-password/:token';

  // const showSidebar = !(isSigninPage || forgetPassword || resetetPassword);
  const shouldHideNavAndSidebar = () => {
    const pathsToExclude = ['/signin', '/forget-password'];
    return (
      pathsToExclude.includes(location.pathname) ||
      location.pathname.startsWith('/reset-password/')
    );
  };

  const showNavAndSidebar = !shouldHideNavAndSidebar();

  return (
    <>
      {/* {!isSigninPage && <Navbar />}
      {!isSigninPage && <Sidebar />} */}

      {/* {!isSigninPage && !forgetPassword && !resetetPassword && <Navbar />} */}
      {/* {showSidebar && <Sidebar />} */}
      {showNavAndSidebar && <Navbar />}
      {showNavAndSidebar && <Sidebar />}
      <ProgressBar />
      <Routes>
        <Route path="/forget-password" element={<ForgetPasswordScreen />} />

        <Route path="/reset-password/:token" element={<ResetPasswoed />} />

        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <NotFoundPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/upcoming"
          element={
            <ProtectedRoutes>
              <Upcoming />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/dummypages"
          element={
            <ProtectedRoutes>
              <Dummypages />
            </ProtectedRoutes>
          }
        />
        {/* <Route
          path="/pdf/:name"
          element={
            <ProtectedRoutes>
              <PdfViewer />
            </ProtectedRoutes>
          }
        /> */}
        <Route
          path="/table"
          element={
            <ProtectedRoutes>
              <Table />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />{' '}
            </ProtectedRoutes>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoutes>
              <Employee />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/employeedetails/:id"
          element={
            <ProtectedRoutes>
              <UpdateEmployee />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/updateSalary/:employeeid/:id"
          element={
            <ProtectedRoutes>
              <UpdateSalary />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/addnewSalary/:employeeid"
          element={
            <ProtectedRoutes>
              <AddNewSalary />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/addemployee"
          element={
            <ProtectedRoutes>
              <AddEmployee />
            </ProtectedRoutes>
          }
        />
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/leave"
          element={
            <ProtectedRoutes>
              <Leaves />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/leaves-history"
          element={
            <ProtectedRoutes>
              <LeavesHistory />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-leave/:id"
          element={
            <ProtectedRoutes>
              <EditLeave />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/leave-application/:id"
          element={
            <SuperAdminRoutes>
              <LeaveApplication />
            </SuperAdminRoutes>
          }
        />

        <Route
          path="/leave-status/:employeeId/:leaveId"
          element={
            <SuperAdminRoutes>
              <LeaveStatus />
            </SuperAdminRoutes>
          }
        />
        <Route
          path="/wishes/:id"
          element={
            <ProtectedRoutes>
              <Wishes />
            </ProtectedRoutes>
          }
        />

        {/* -----------------------Notice----------------------------- */}
        <Route
          path="/notice-home-page"
          element={
            <ProtectedRoutes>
              <NoticeHome />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/notice/:id"
          element={
            <ProtectedRoutes>
              <ViewNotice />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new-notice"
          element={
            <ProtectedRoutes>
              <NewNotice />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/edit-notice/:id"
          element={
            <ProtectedRoutes>
              <EditNotice />
            </ProtectedRoutes>
          }
        />
        {/* -----------------------Notice----------------------------- */}

        {/* -------------------------------Attendance--------------------------------- */}

        {/*
        // new
        <Route
          path="/attendance-home-page"
          element={
            <SuperAdminRoutes>
              <AttendanceTableNew />
            </SuperAdminRoutes>
          }
        /> */}

        <Route
          path="/new-attendancde"
          element={
            <SuperAdminRoutes>
              <NewAttendance />
            </SuperAdminRoutes>
          }
        />

        <Route
          path="/attendance-home-page"
          element={
            <SuperAdminRoutes>
              {/* <AttedanceTable /> */}
              <AttendanceTableUpdated />
            </SuperAdminRoutes>
          }
        />

        <Route
          path="/myattendance/:id"
          element={
            <ProtectedRoutes>
              <IndividualAttedance />
            </ProtectedRoutes>
          }
        />

        {/* <Route
          path="/attendenceDetails/:id"
          element={
            <SuperAdminRoutes>
              <AttendanceDetails />
            </SuperAdminRoutes>
          }
        /> */}
        {/* -------------------------------Attendance--------------------------------- */}

        <Route
          path="/sitelist"
          element={
            <ProtectedRoutes>
              <SiteList />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/pay-sleep"
          element={
            <ProtectedRoutes>
              <SalarySleepUpdated />
            </ProtectedRoutes>
          }
        />

        {/* old */}
        <Route
          path="/pay-slip/:id/:year/:month/:totaldays"
          element={
            <ProtectedRoutes>
              <SalarySleepNew />
            </ProtectedRoutes>
          }
        />

        {/* <Route
          path="/pay-slip/:id/:year/:month/:totaldays"
          element={
            <ProtectedRoutes>
              <SalarySlip />
            </ProtectedRoutes>
          }
        /> */}

        <Route
          path="/salary-Entry"
          element={
            <ProtectedRoutes>
              <SalaryEntry />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoutes>
              <MyCalendar />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/sitedetails/:projectCode"
          element={
            <ProtectedRoutes>
              <SiteDetails />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/survey/:id"
          element={
            <ProtectedRoutes>
              <Survey />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/surveyImages/:id"
          element={
            <ProtectedRoutes>
              <SurveyGallery />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/editSite/:id"
          element={
            <ProtectedRoutes>
              <AddNewSite />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/newsurvey"
          element={
            <ProtectedRoutes>
              <CreateNewSyrvey />
            </ProtectedRoutes>
          }
        />

        {/* <Route
          path="/editSurvey/:projectCode/:id"
          element={
            <ProtectedRoutes>
              <UpdateSurvey />
            </ProtectedRoutes>
          }
        /> */}
        <Route
          path="/newsurvey/:id"
          element={
            <ProtectedRoutes>
              <CreateNewSyrvey />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/editSurvey/:id"
          element={
            <ProtectedRoutes>
              <UpdateSurvey />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/newSurvey/:projectCode"
          element={
            <ProtectedRoutes>
              <UpdateSurvey />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/plantlayout/:id"
          element={
            <ProtectedRoutes>
              <PlantLayout />
            </ProtectedRoutes>
          }
        />

        {/* site Inventory */}

        <Route
          path="/available-inventory"
          element={
            <ProtectedRoutes>
              <Available />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/all-site-inventory"
          element={
            <ProtectedRoutes>
              <AllSites />
            </ProtectedRoutes>
          }
        />
        {/* site Inventory */}

        <Route
          path="/temp-salaryslip"
          element={
            <SuperAdminRoutes>
              {/* <AttedanceTable /> */}
              <Generateslip />
            </SuperAdminRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
