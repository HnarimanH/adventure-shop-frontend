import SignPage from './components/pages/signPage'
import { use, useEffect, useState } from "react";
import HandleApiCalls from './components/auth/Api';
import Dashboard from './components/pages/dashboard';
import Loading from './components/miniComponents/Loading';
import { useApi } from "./components/auth/ApiProvider";
function App() {
  
  const { api, isLoading, isLogedIn, setIsLogedIn } = useApi();
  


  setTimeout(() => {
                
                setIsLogedIn(() => {
                  if (localStorage.getItem("token")){ return true; }
                  return false;
            }); 
            }, 0);

  



  
  useEffect(() => {
  const verifyAndLogin = async () => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get("uid");
    const token = params.get("token");
    const newpassword = params.get("newpassword");
    const email = params.get("email");
    if (uid && token && email) {
      try {
        const res = await api.ResetPassword(uid, token, newpassword);
        console.log("password reset succesfull");
        

        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error(
          "password reset faild failed:",
          err.response?.data || err.message
        );
      }

    }
    else if (uid && token) {
      try {
        const res = await api.VerifyEmail(uid, token);
        console.log("Email verified");
        const accessToken = res.data.access;
        const refreshToken = res.data.refresh;
        localStorage.setItem('is_superuser', String(res.data.is_superuser));
        localStorage.setItem('first_name', String(res.data.first_name));
        localStorage.setItem('last_name', String(res.data.last_name));
        localStorage.setItem('email', String(res.data.email));
        localStorage.setItem('username', String(res.data.username));
        localStorage.setItem('profilePic', String(res.data.profilePic));
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        window.history.replaceState({}, document.title, "/");
        setTimeout(() => {
                setIsLogedIn(true);
            }, 0);
        
      } catch (err) {
        console.error(
          "Verification or login failed:",
          err.response?.data || err.message
        );
      }

    }
  };

  verifyAndLogin();
}, []);


  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
          {isLoading && <Loading />}
          
          {isLogedIn ? <Dashboard /> : <SignPage  />}
      </div>
    </>
  )
}

export default App
