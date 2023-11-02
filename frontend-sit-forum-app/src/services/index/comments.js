import axios from "axios";

export const createNewComment = async ({ token, desc, slug, parent, replyOnUser }) => {

    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/comments`,
            { desc, slug, parent, replyOnUser, }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//update comment
export const updateComment = async ({ token, desc, commentId }) => {

    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/comments/${commentId}`, 
        { desc }, config);

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//update comment
export const updateCommentCheck = async ({ token, check, commentId }) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/comments/${commentId}`, 
        { check }, config);

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//delete comment
export const deleteComment = async ({ token, commentId }) => {

    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/comments/${commentId}`, config);

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

export const readAllUncheckComment = async ({token}) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/comments/readAllUncheckComment`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};