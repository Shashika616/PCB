import React from 'react'
import './LoginForm.css'
import { Button } from '@mui/material'
import { GiCircuitry } from "react-icons/gi";
// import { useAuth } from '../../AuthContext';
import { useAuthContext } from "@asgardeo/auth-react";


const LoginForm = () => {

    const { state, signIn, signOut } = useAuthContext();


      //const signIn = useAuth();

     const handleSignIn = async () => {
         try{
             await signIn();
         }catch (error){
             console.error("Error signing in",error);
        }
     }


  return (
    <div className='wrapper'>
        <h1>LOGIN</h1>
        <h3>Get Started with your PCB handling application</h3>

        <div className='icon'>
        <GiCircuitry />
        </div>
        
        <div className='button'>

        <Button variant='contained' color='success' onClick={handleSignIn}>Get Started</Button>
        </div>
        

        {/* <div className='remember-forgot'>
            <label><input type='checkbox'/>Remember me</label>
            <Button variant='text' href='#'>Forgot Password</Button>
        </div> */}

        
    </div>
  )
}

export default LoginForm;