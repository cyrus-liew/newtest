import axios from "axios";

export const getAllPost = async (searchKeyword = "", page = 1, limit = 5) => {
    try {
        const { data, headers } = await axios.get(`${process.env.REACT_APP_API}/api/posts?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
        );

        console.log('Response Headers:', headers['x-totalpagecount']);
        console.log('Response Headers:', headers['x-totalcount']);
        console.log('Response Headers:', headers['x-page']);
        return { data, headers };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

//single post
export const getSinglePost = async ({ slug }) => {
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/posts/${slug}`);

        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

export const createPost = async ({ token, title, caption, tags, content }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/posts/createPost`, {
            title,
            caption,
            tags,
            content,
        }, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};

//single post
export const deletePost = async ({ slug, token }) => {
    try {
        //create obj and save it in config variable
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/posts/${slug}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message);
        }
    }
};
