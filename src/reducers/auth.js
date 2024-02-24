import { LOGIN } from "../constants/actionTypes";

const userDefaultState = {
    _id: null,
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    token: null,
}

const initialState = {
    user: userDefaultState,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            console.log('state -> ', state);
            return {
                ...state,
                isSuccess: true,
                user: action?.data,
            };

        default:
            return state;
    }
}