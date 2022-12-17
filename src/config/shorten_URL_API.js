import axios from 'axios';
axios.defaults.withCredentials = false;
axios.defaults.headers.Authorization = localStorage.getItem('isAuthenticated') ? localStorage.getItem('access_token') : '';
const baseURL = 'http://localhost:3000'//'https://be-h.herokuapp.com';

export const login = async (username, password) => {
    let res;
    try {
        const URL = baseURL + '/login';
        res = await axios.post(URL, { username: username, email: username, password: password });
        axios.defaults.headers.Authorization = res.data.token;
        localStorage.setItem('access_token', res.data.token);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const logout = async () => {
    try {
        const URL = baseURL + '/logout';
        await axios.post(URL);
        return true;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const signup = async (username, email, password) => {
    let res;
    try {
        const URL = baseURL + '/register';
        res = await axios.post(URL, { username, email, password });
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const shorten_url = async (url, title, category) => {
    let res;
    const data = {
        originalURL: url,
        title: title,
        category: category
    }
    try {
        const URL = baseURL + '/link/shorten';
        res = await axios.post(URL, data);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const import_url = async (originalURL, shortURL, ownerID, img, title, category) => {
    let res;
    const data = {
        originalURL,
        shortURL,
        ownerID,
        img,
        title,
        category
    }
    try {
        const URL = baseURL + '/link/import';
        res = await axios.post(URL, data);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const search = async (query) => {
    let res;
    try {
        const URL = baseURL + `/link/search?query=${query}`;
        res = await axios.get(URL);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const update_url_info = async (urlID, title, category) => {
    let res;
    const data = {
        linkID: urlID,
        title,
        category
    }
    try {
        const URL = baseURL + '/link/update';
        res = await axios.post(URL, data);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const delete_url = async (urlID) => {
    let res;
    const data = {
        linkID: urlID,
    }
    try {
        const URL = baseURL + '/link/delete';
        res = await axios.post(URL, data);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const get_url_info = async (urlID) => {
    let res;
    try {
        const URL = baseURL + `/my/link/${urlID}`;
        res = await axios.get(URL);
        return res.data;
    } catch (error) {
        throw Error(error.response.data);
    }
}

export const get_my_urls = async (pageNo, category) => {
    let res;
    try {
        const URL = baseURL + `/my/link?page=${pageNo}&category=${category}`;
        res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.log(error)
        throw Error(error.response.data);
    }
}

export const get_urls_count = async (category) => {
    let res;
    try {
        const URL = baseURL + `/link/count?category=${category}`;
        res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.log(error)
        throw Error(error.response.data);
    }
}

export const redirect_to_originalURL = async (URL_ID) => {
    try {
        const URL = baseURL + `/link/redirect/${URL_ID}`;
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.log(error.message)
        throw Error(error.response.data);
    }
}