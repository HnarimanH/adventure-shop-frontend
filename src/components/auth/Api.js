import axios from 'axios';
const API = import.meta.env.VITE_API_URL;


class HandleApiCalls {
    constructor(setIsLoading, isLoading, setIsLogedIn) {
        this.setIsLoading = setIsLoading;
        this.isLoading = isLoading;
        this.setIsLogedIn = setIsLogedIn;

    }

    Register(username, email, password, first_name, last_name) {
        this.setIsLoading(true)
        return axios.post(`${API}api/register/`, {
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
        }).finally(() => this.setIsLoading(false))
    }


    Login(email, password) {
        this.setIsLoading(true)
        return axios.post(`${API}api/login/`, {

            email,
            password,

        }).then((res) => {


            if (res.data.message == 'invalid request') {
                console.log(res.data)
                return "invalid email or password";

            }
            const token = res.data.access;
            const refreshToken = res.data.refresh;
            localStorage.setItem('is_superuser', String(res.data.is_superuser));
            localStorage.setItem('first_name', String(res.data.first_name));
            localStorage.setItem('last_name', String(res.data.last_name));
            localStorage.setItem('email', String(res.data.email));
            localStorage.setItem('username', String(res.data.username));
            localStorage.setItem('profilePic', String(res.data.profilePic));
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            return (true)
        }).catch((err) => {
            console.error("Login error:", err.response?.data || err.message);

        }).finally(() => this.setIsLoading(false))
    }
    VerifyEmail(uid, token) {
        this.setIsLoading(true)
        return axios.post(`${API}api/emailverification/`, {
            uid,
            token
        }).then((res) => {


            if (res.data.message == 'invalid request') {
                return "invalid request";
            }
            return res;
        }).catch((err) => {
            console.error("verify email error:", err.response?.data || err.message);

        }).finally(() => this.setIsLoading(false))
    }
    ResetPassword(uid, token, new_password) {
        this.setIsLoading(true)
        return axios.post(`${API}api/resetpassword/`, {
            uid,
            token,
            new_password
        }).finally(() => this.setIsLoading(false))
    }
    ForgotPass(email, new_password) {
        this.setIsLoading(true)
        return axios.post(`${API}api/forgotPass/`, {
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
        }).finally(() => this.setIsLoading(false))
    }
    GetData() {
        this.setIsLoading(true)
        return axios.get(`${API}adminDashboard/showproduct/`, {}).then((res) => {


            if (res.data.message == 'invalid request') {
                return "invalid request";
            }
            return res;



        }).catch((err) => {
            console.error("got invalid request:", err.response?.data || err.message);
            return 'failed to fetch data';
        }).finally(() => this.setIsLoading(false))


    }
    DeleteUser() {
        this.setIsLoading(true);

        const performDelete = () => {
            return axios.delete(`${API}api/DeleteUser/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
        };

        return performDelete()
            .catch(async (err) => {
                if (err.response?.status === 401) {
                    const refreshed = await this.TokenRefresh();
                    console.log(refreshed)
                    if (refreshed) {
                        return axios.delete(`${API}api/DeleteUser/`, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                    }
                }
                console.error("Delete user error:", err.response?.data || err.message);
                return "failed to delete User";
            })
            .finally(() => this.setIsLoading(false));
    }

    TokenRefresh(refreshToken) {
        return axios.post(`${API}api/token/refresh/`, {
            refresh: refreshToken ? refreshToken : String(localStorage.getItem("refreshToken"))
        })
            .then(res => {
                const newAccessToken = res.data.access;
                localStorage.setItem("token", newAccessToken);
                return true;
            })
            .catch(err => {

                console.error("Token refresh error:", err.response?.data || err.message);
                return false;
            });
    }
    Cart(type = 'get', product_id = null) {
        this.setIsLoading(true);
        return axios.post(
            `${API}api/Cart/`,
            {
                type: type,
                product_id: product_id,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then(res => res)
            .catch(async (err) => {
                if (err.response?.status === 401) {
                    const refreshed = await this.TokenRefresh();
                    console.log(refreshed)
                }
            }).finally(
                this.setIsLoading(false)
            );
    }
    CreateProduct(price, url, category, name, description) {
        this.setIsLoading(true);
        return axios.post(
            `${API}adminDashboard/createproduct/`,
            {
                name: name,
                description: description,
                price: price,
                category: category,
                image_url: url,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => {
                if (res.status === 201 || res.status === 200) {
                    return "Product created successfully";
                }
                return res.data;
            })
            .catch((e) => {
                const Error = e.response?.data || {};

                if (Array.isArray(Error.name) && Error.name[0] === "a product by this name exists!") {
                    return Error.name[0];
                } else if (Array.isArray(Error.image_url) && Error.image_url[0]) {
                    return Error.image_url[0];
                }

                console.log(Error);
            })
            .finally(() => this.setIsLoading(false));
    }
    DeleteProduct(name) {
        this.setIsLoading(true);
        return axios.delete(`${API}adminDashboard/deleteproduct/`, {
            data: { name: name },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).finally(() => { this.setIsLoading(false) });
    }
    UpdateProduct(id, name, price, category, description, image_url) {
        this.setIsLoading(true);
        return axios.post(
            `${API}adminDashboard/updateproduct/`,
            {
                id: id,
                name: name,
                price: price,
                description: description,
                image_url: image_url,
                category: category
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    return 'Product updated';
                }
                return res.data?.message || 'Unknown response';
            })
            .catch((e) => {
                if (e.response?.status === 400) {
                    return "Error: ID required";
                } else if (e.response?.status === 404) {
                    return "No product found with that ID";
                }
                console.error("error", e);
            })
            .finally(() => {
                this.setIsLoading(false);
            });
    }
    Checkout(setClientSecret) {
        this.setIsLoading(true);

        return axios.get(`${API}api/checkout/`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(res => {
                setClientSecret(res.data.client_secret);
            })
            .catch(err => {
                console.error("Error fetching client secret:", err.response?.data || err.message);
            })
            .finally(() => this.setIsLoading(false));
    }
}



export default HandleApiCalls;