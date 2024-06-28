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
  signInRedirectURL:"http://localhost:3000/landing",
  // signInRedirectURL:"https://5d9b1be5-a9ce-4153-8d11-2d58a3f5a555.e1-us-east-azure.choreoapps.dev/landing",
  signOutRedirectURL:"http://localhost:3000/login",
  // signOutRedirectURL:"https://5d9b1be5-a9ce-4153-8d11-2d58a3f5a555.e1-us-east-azure.choreoapps.dev/login",
  clientID:"Zgh86Vhx6_H6oHmh072aJ4V4Psga",
  baseUrl:"https://api.asgardeo.io/t/orgbi9hw",
  scope:["openid","profile","app_roles", "groups", "email", "view_engineering-params", "update_design", "select_pcb", "view_pcbs", "view_customers", "update_engineering-params", "update_customer", "view_design", "create_customer", "create_pcbs", "view_customer-details"],
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

