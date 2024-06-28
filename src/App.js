import './App.css';
import api from './api/axiosconfig'
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Home from './components/home/Home';
import { Typography } from '@mui/material';
import LoginForm from './components/loginform/LoginForm';
import Landingpage from './pages/Landingpage';
import DesignerPage from './pages/DesignerPage';
import EngineerPage from './pages/EngineerPage';
import LogisticPage from './pages/LogisticPage';
import PrivateRoute from './components/PrivateRoutes';
import {useAuthContext } from '@asgardeo/auth-react';

// import { MuiTypography } from './components/MuiTypography';
// import { MuiButton } from './components/MuiButton';

// const PrivateRoute = ({ component: Component, roles, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={
//         user && roles.includes(user.roles[0]) ? (
//           <Component />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };

function App() {

  const {state, getBasicUserInfo } = useAuthContext();
  const [userBasicInfo, setUserBasicInfo] = useState(null);

  // const [pcbs, setpcbs] = useState();

  // const getpcbs = async () => {

  //   try{
  //     const response = await api.get("http://localhost:8081/api/designers/pcbs");
  //     console.log(response.data); 
  //     setpcbs(response.data);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // useEffect(() => {
  //   getpcbs();
  // },[])

  const FallbackComponent = () => {
    return (
        <div>Sign in to access this content</div>
    )
}

useEffect(() => {
  if (state.isAuthenticated) {
    const fetchUserInfo = async () => {
      const info = await getBasicUserInfo();
      setUserBasicInfo(info);
    };
    fetchUserInfo();
  }
}, [state.isAuthenticated, getBasicUserInfo]);

const roleBasedComponent = (Component, requiredRole) => {
  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (userBasicInfo && userBasicInfo?.groups[0].includes(requiredRole)) {
    return <Component />;
  }
  return <Navigate to="/landing" />;
};

  return (
    <div className="App">
    

      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/landing" element={<Landingpage/>}/>

        <Route path="/designer" element={roleBasedComponent(DesignerPage, 'Designers')} /> 
        <Route path="/engineer" element={roleBasedComponent(EngineerPage, 'Engineers')} />
        <Route path="/logistics" element={roleBasedComponent(LogisticPage, 'Logistic')} /> 
        {/* <Route
          path="/designer"
          element={
            <PrivateRoute roles={['designer']} element={DesignerPage} />
          }
        />
        <Route
          path="/engineer"
          element={
            <PrivateRoute roles={['engineer']} element={EngineerPage} />
          }
        />
        <Route
          path="/logistics"
          element={
            <PrivateRoute roles={['logistics']} element={LogisticPage} />
          }
        /> */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>

    </div>
  );
}

export default App;
