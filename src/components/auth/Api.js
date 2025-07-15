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

            if (errors.email && errors.username) {

                return `${errors.email} and ${errors.username} already in use`;

            } else if (errors.email || errors.username) {
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
    ForgotPass() {
        return axios.post(`${API}/forgotPass/`, {
        });
    }

}


export default HandleApiCalls;