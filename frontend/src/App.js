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
import EmployeeDetails from './screens/Employee/EmployeeDetails';
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
import SurveyFirstPage from './screens/SiteSurvey/SurveyFirstPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFoundPage from './components/pageNotFound/NotFoundPage';
import SurveyGallery from './screens/SiteSurvey/SurveyGallery';
import Profile from './screens/Employee/Profile';
import ForgetPasswordScreen from './screens/Signin/ForgetPasswordScreen';
import ResetPasswoed from './screens/Signin/ResetPasswoed';
import Dummypages from './screens/Dummypages';
import PlantLayout from './screens/SiteSurvey/PlantLayout';
import SalarySleep from './screens/salarySleep/SalarySleep';
import SalaryEntry from './screens/salarySleep/SalaryEntry';
// import AddNewSurvey from './screens/SiteSurvey/AddNewSurvey';
// import AddNewSurvey from './screens/SiteSurvey/AddNewSurvey';

function App() {
  return (
    <>
      <Router>
        <AppRouter />
        <Toaster />
      </Router>
    </>
  );
}

function AppRouter() {
  const location = useLocation();
  const isSigninPage = location.pathname === '/signin';
  const forgetPassword = location.pathname === '/forget-password';
  const resetetPassword = location.pathname === '/reset-password';

  const showSidebar = !(isSigninPage || forgetPassword || resetetPassword);

  return (
    <>
      {/* {!isSigninPage && <Navbar />}
      {!isSigninPage && <Sidebar />} */}

      {!isSigninPage && !forgetPassword && !resetetPassword && <Navbar />}
      {showSidebar && <Sidebar />}

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
          path="/dummypages"
          element={
            <ProtectedRoutes>
              <Dummypages />
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
              <EmployeeDetails />
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
              <SalarySleep />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/salary-Entry"
          element={
            <ProtectedRoutes>
              <SalaryEntry />
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

        {/* <Route
          path="/editSurvey/:projectCode/:id"
          element={
            <ProtectedRoutes>
              <SurveyFirstPage />
            </ProtectedRoutes>
          }
        /> */}

        <Route
          path="/editSurvey/:id"
          element={
            <ProtectedRoutes>
              <SurveyFirstPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/newSurvey/:projectCode"
          element={
            <ProtectedRoutes>
              <SurveyFirstPage />
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
      </Routes>
    </>
  );
}

export default App;
