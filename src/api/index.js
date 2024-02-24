import axios from 'axios'

import { base_url } from '../utils/base_url';

const API = axios.create({ baseURL: base_url });

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('user')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
//     }

//     return req;
// })

export const login = (userData) => API.post('/v1/user/admin-login', userData);

// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags} `)
// export const createPost = (newPost) => API.post('/posts', newPost)
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
// export const deletePost = (id) => API.delete(`/posts/${id}`)
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);