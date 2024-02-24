import { LOGIN } from "../constants/actionTypes";

import * as api from '../api/index.js';

export const login = (userData, navigate) => async (dispatch) => {
    try {
        // login the user...
        const response = await api.login(userData);
        // console.log('response data -> ', response.data);

        if (response?.data) {
                localStorage.setItem('user', JSON.stringify(response?.data));
        }

        // return response.data;

        const { data } = response;
        console.log('dispatch -> ', dispatch({ type: LOGIN, data }));
        dispatch({ type: LOGIN, data });
        // navigate('/');
    } catch (error) {
        console.log(error);
    }
}

// export const signup = (formData, navigate) => async (dispatch) => {
//     try {
//         // logup the user...
//         const { data } = await api.signUp(formData);

//         dispatch({ type: AUTH, data });
//         navigate('/');
//     } catch (error) {
//         console.log(error);
//     }
// }