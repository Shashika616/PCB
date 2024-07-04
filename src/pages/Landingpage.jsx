import React, { useEffect, useState } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from 'react-router-dom';



const Landingpage = () => {

    const { state, isAuthenticated, getBasicUserInfo, getDecodedIDPIDToken, get } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {

        console.log(state);
        

        isAuthenticated().then((response) => {
            if (response) {
                console.log("User is authenticated", response);
                getBasicUserInfo().then((userInfo) => {
                    console.log("User infomation", userInfo);
                getDecodedIDPIDToken().then((token) => {
                    console.log("Decoded token", token);
                })
                 const role = userInfo.roles;
                // const groups = userInfo.groups || [];
                // const role = groups.length > 0 ? groups[0] : '';
                switch (role){
                    case 'Designers':
                    navigate('/designer');
                    break;
                case 'Engineers':
                    navigate('/engineer');
                    break;
                case 'Logistic':
                    navigate('/logistics');
                    break;
                default:
                    navigate('/login');
                }    
                }).catch((error) => {
                    console.error("Error fetching user info:", error);
                });
            } else {
                console.log("User is not authenticated");
            }
        }).catch((error) => {
            console.error("Error checking authentication:", error);
        });
    }, [state, isAuthenticated, getBasicUserInfo]);

    

  return (
    <div>Loading... </div>
  )
}

export default Landingpage