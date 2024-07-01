import React, { useEffect, useState } from 'react'
import { useAuthContext } from "@asgardeo/auth-react";
import { useNavigate } from 'react-router-dom';



const Landingpage = () => {

    const { state, isAuthenticated, getBasicUserInfo, getDecodedIDPIDToken, getAccessToken } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log(state); // Log the state for debugging

        isAuthenticated()
            .then((response) => {
                if (response) {
                    console.log("User is authenticated", response);
                    getBasicUserInfo()
                        .then((userInfo) => {
                            console.log("User information", userInfo);
                            getAccessToken()
                                .then((accessToken) => {
                                    console.log("Access Token", accessToken);

                                    getDecodedIDPIDToken()
                                        .then((idpToken) => {
                                            console.log("IDP Token", idpToken);

                                            const role = userInfo.roles;
                                            switch (role) {
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
                                        })
                                        .catch((error) => {
                                            console.error("Error fetching IDP token:", error);
                                        });
                                })
                                .catch((error) => {
                                    console.error("Error fetching access token:", error);
                                });
                        })
                        .catch((error) => {
                            console.error("Error fetching user info:", error);
                        });
                } else {
                    console.log("User is not authenticated");
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error("Error checking authentication:", error);
            });
    }, [state, isAuthenticated, getBasicUserInfo, getAccessToken, getDecodedIDPIDToken, navigate]);

  return (
    <div>Loading... </div>
  )
}

export default Landingpage