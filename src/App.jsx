import SignPage from './components/pages/signPage'
import { use, useEffect, useState } from "react";
import HandleApiCalls from './components/auth/Api';
import Dashboard from './components/pages/dashboard';

const api = new HandleApiCalls();
function App() {

  const [isLogedIn, setIsLogedIn] = useState(() => {

    
  if (localStorage.getItem("token")){ return true; }
  return false;
});
  



  
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
        console.log("password reset succesfull", res);
        

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
        console.log("Email verified", res);
        const token = res.data.access;
        console.log(token)

        // localStorage.setItem('is_superuser', String(res.data.is_superuser));
        // localStorage.setItem('token', token);
        // window.history.replaceState({}, document.title, "/");
        // window.location.reload()
        
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
          
          {isLogedIn ? <Dashboard/> : <SignPage/>}
      </div>
    </>
  )
}

export default App
