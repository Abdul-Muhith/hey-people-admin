// reducer actions
import {
    FETCH_ALL,
    FETCH_POST,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    START_LOADING,
    END_LOADING,
} from '../constants/actionTypes';

import * as api from '../api'
// api.fetchPosts

// Action Creators - return actions
// const getPosts = () => {
//     const action = {
//         type: 'FETCH_ALL',
//         payload: []
//     }
//     return action
// }


// const getPosts = () => async (dispatch) => {
//     const action = {
//         type: 'FETCH_ALL',
//         payload: []
//     }
//     dispatch(action)
// }


export const getPost = (id) => async (dispatch) => {
    console.log('action + id -> ', id);
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id)
        console.log('action + data -> ', data);
        dispatch({
            type: FETCH_POST,
            payload: { post: data }
        });

        dispatch({
            type: FETCH_POST,
            payload: { post: data }
        });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message)
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: {data, currentPage, numberOfPages} } = await api.fetchPosts(page)

        dispatch({
            type: FETCH_ALL,
            payload: { data, currentPage, numberOfPages }
        });

        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        console.log('data', {data});
        dispatch({
            type: FETCH_BY_SEARCH,
            payload: { data }
        });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPost(post)

        dispatch({
            type: CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({
            type: DELETE,
            payload: id
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({
            type: LIKE,
            payload: data
        })
    } catch (error) {
        console.log(error.message);
    }
}