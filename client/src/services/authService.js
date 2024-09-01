import axios from 'axios';

const API_URL = 'http://localhost:5000/api/user'; 

const login = async (email, password) => {
    console.log("Making request.....")
    const response = await axios.post(`${API_URL}/auth`, { email, password }, {withCredentials:true});
    console.log(response.data);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const register = async (name, email, password) => {
    console.log("Making request.....")

    const response = await axios.post(`${API_URL}/`, { name, email, password }, {withCredentials:true});

    console.log(response.data);
    return response.data;
};

const getProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    });
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};


export {
    login,
    register,
    getProfile,
    logout
};
