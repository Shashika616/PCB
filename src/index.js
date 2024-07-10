import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, SecureApp } from '@asgardeo/auth-react';
import LoginForm from './components/loginform/LoginForm';
import Loader from './components/Loader';


// import { AuthContextProvider } from './AuthContext';

const config = {
  // signInRedirectURL:"http://localhost:3000/landing",
  signInRedirectURL:"https://fe1b9d98-4f90-40c6-a52e-8e2d1396f647.e1-us-east-azure.choreoapps.dev/landing",
  // signOutRedirectURL:"http://localhost:3000/login",
  signOutRedirectURL:"https://fe1b9d98-4f90-40c6-a52e-8e2d1396f647.e1-us-east-azure.choreoapps.dev/login",
  clientID:"EJ1IpymiHraCoKfCl3OPcZtynJoa",
  baseUrl:"https://api.asgardeo.io/t/orgbi9hw",
  scope:["openid","profile","app_roles", "groups", "view_engineering-params", "update_design", "select_pcb", "view_pcbs", "view_customers", "update_engineering-params", "update_customer", "view_design", "create_customer", "create_pcbs", "view_customer-details"],
  // endpoints: {
  //   authorizationEndpoint: "https://api.asgardeo.io/t/orgbi9hw/oauth2/authorize",
  //   tokenEndpoint: "https://api.asgardeo.io/t/orgbi9hw/oauth2/token",
  //   userInfoEndpoint: "https://api.asgardeo.io/t/orgbi9hw/oauth2/userinfo",
  //   endSessionEndpoint: "https://api.asgardeo.io/t/orgbi9hw/oidc/logout"
  //}
  storage:"sessionStorage",
  cookieSettings: {
    sameSite: 'none',
    secure: true
  }
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider config={ config }>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

