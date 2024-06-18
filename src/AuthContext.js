import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthContext as useAsgardeoAuthContext } from '@asgardeo/auth-react';
import { config } from './config'; 

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const { state, signIn, signOut, getDecodedIDToken } = useAsgardeoAuthContext(config);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (state.isAuthenticated) {
            getDecodedIDToken().then((token) => {
                const user = {
                    username: token.username,
                    roles: token.roles || []// Ensure roles are being fetched correctly
                };
                setUser(user);
            });
        } else {
            setUser(null);
        }
    }, [state.isAuthenticated]);

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
