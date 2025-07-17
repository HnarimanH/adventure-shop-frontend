import axios from 'axios';
const API = import.meta.env.VITE_API_URL;


class HandleApiCalls {

    Register(username, email, password, first_name, last_name) {
        return axios.post(`${API}/register/`, {
            username,
            email,
            password,
            first_name,
            last_name
        }).then((res) => {
            return "Verification Email sent!";
        }).catch((err) => {
            const errors = err.response?.data;

            if (errors?.email && errors?.username) {
                return `${errors.email} and ${errors.username} already in use`;
            } else if (errors?.email || errors?.username) {
                return `${errors.email ? errors.email : errors.username} already in use`;
            }
        });
    }


    Login(email, password) {

        return axios.post(`${API}/login/`, {

            email,
            password,

        }).then((res) => {


            if (res.data.message == 'invalid request') {
                return "invalid email or password";
            }
            const token = res.data.access;
            localStorage.setItem('token', token);
            window.location.reload()


        }).catch((err) => {
            console.error("Login error:", err.response?.data || err.message);

        });
    }
    VerifyEmail(uid, token) {
        return axios.post(`${API}/emailverification/`, {
            uid,
            token
        });
    }
    ResetPassword(uid, token, new_password) {
        return axios.post(`${API}/resetpassword/`, {
            uid,
            token,
            new_password
        });
    }
    ForgotPass(email, new_password) {
        return axios.post(`${API}/forgotPass/`, {
            email,
            password: new_password

        }).then((res) => {


            if (res.data.message == 'invalid request') {
                return "invalid email or password";
            }
            return "password reset email sent";



        }).catch((err) => {
            console.error("reset pass error:", err.response?.data || err.message);
            return 'invalid email';
        });
    }

}


export default HandleApiCalls;