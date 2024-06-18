import React, { useEffect } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from 'react-router-dom';



const Landingpage = () => {

    const { state, isAuthenticated, getBasicUserInfo, getDecodedIDPIDToken } = useAuthContext();
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
                const role = userInfo.applicationRoles;
                switch (role){
                    case 'designer':
                    navigate('/designer');
                    break;
                case 'engineer':
                    navigate('/engineer');
                    break;
                case 'logistics':
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
    <div>Landingpage</div>
  )
}

export default Landingpage