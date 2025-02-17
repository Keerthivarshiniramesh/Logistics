
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './css/index.css'
import Login from './components/Login';
import Home from './components/Home';
import Vehicle from './components/Vehicle';
import VehicleDetails from './components/VehicleDetails';
import EditVehicle from './components/EditVehicle';
import ViewVehicless from './components/ViewVehicless';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeRegister from './components/EmployeeRegister';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';
import TripDetails from './components/TripDetails';
import TripRegister from './components/TripRegister';
import EditTrip from './components/EditTrip';
import ViewTrips from './components/ViewTrips';


function App() {
  return (
    <>

      {/* {
        window.location.pathname !== '/login' && <Home />
      } */}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/vehicle' element={<Vehicle />} />
        <Route path='/vehicle-details' element={<VehicleDetails />} />
        <Route path='/edit_vehicle/:id' element={<EditVehicle />} />
        <Route path='/view_vehicle/:id' element={<ViewVehicless />} />
        <Route path='/employee_details' element={<EmployeeDetails />} />
        <Route path='/employee_register' element={<EmployeeRegister />} />
        <Route path='/employee_edit/:id' element={<EditEmployee />} />
        <Route path='/employee_view/:id' element={<ViewEmployee />} />
        <Route path='/trip_details' element={<TripDetails />} />
        <Route path='/trip_register' element={<TripRegister />} />
        <Route path='/edit_trip/:id' element={<EditTrip />} />
        <Route path='/view_trips/:id' element={<ViewTrips />} />
      </Routes>
    </>

  )
}

export default App;




// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import './App.css';
// import './css/index.css';
// import Login from './components/Login';
// import Home from './components/Home';
// import Vehicle from './components/Vehicle';
// import VehicleDetails from './components/VehicleDetails';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <Routes>
//         {/* If not authenticated, redirect to login */}
//         <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
//         <Route path="/vehicle" element={isAuthenticated ? <Vehicle /> : <Navigate to="/login" />} />
//         <Route path="/vehicle-details" element={isAuthenticated ? <VehicleDetails /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

