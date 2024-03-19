import axios from 'axios';

const API = axios.create({baseURL: 'https://flashback-server-xacz.onrender.com/app' }); 

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile') && !localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    } else if (localStorage.getItem('user') && localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user'))}`
    }
    return req;
});


export const fetchPosts = (page) => API.get(`/post?page=${page}`);
export const fetchPost = (id) => API.get(`/post/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPosts = (newPost) => API.post('/post', newPost);
export const updatedPost = (id, postData) => API.patch(`/post/${id}`, postData);
export const deletedPost = (id) => API.delete(`/post/${id}`);
export const likePost = (id) => API.patch(`/post/${id}/likepost`);
export const comment = (value, id) => API.post(`/post/${id}/commentpost`, {value});

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);