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
import PannelDetails from './screens/SiteSurvey/PannelDetails';
import AddNewSite from './screens/SiteSurvey/AddNewSite';
import AddNewSurvey from './screens/SiteSurvey/AddNewSurvey';

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

  return (
    <>
      {!isSigninPage && <Navbar />}
      {!isSigninPage && <Sidebar />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/employeedetails/:id" element={<EmployeeDetails />} />
        <Route path="/addemployee" element={<AddEmployee />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/leaves-history" element={<LeavesHistory />} />
        <Route path="/sitelist" element={<SiteList />} />
        <Route path="/sitedetails/:id" element={<SiteDetails />} />
        <Route
          path="/pannelDetails/:projectCode/:id"
          element={<PannelDetails />}
        />
        <Route path="/addNewSite" element={<AddNewSite />} />
        <Route path="/newSurvey/:projectCode" element={<AddNewSurvey />} />
      </Routes>
    </>
  );
}

export default App;
