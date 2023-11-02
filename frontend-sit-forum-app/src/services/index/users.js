import axios from "axios";

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/users/register`, {

            name,
            email,
            password,
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//login function
export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/users/login`, {
            email,
            password,
        });
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};


//retrieve user data for user profile
export const getUserProfile = async ({ token }) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/users/profile`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};


//update user proile 
export const updateProfile = async ({ token, userData }) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/users/updateProfile`, userData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};


//update user proile picture
export const updateProfilePicture = async ({ token, formData }) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/users/updateProfilePicture`, formData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//update user admin status
export const updateUser = async ({ token, email, admin }) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/users/updateUser`, {email,admin}, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//getAllUser
export const getAllUser = async ({token}) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/users/adminDashboard`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};
