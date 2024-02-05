const initialState = {
    isLoggedIn: false,
    user: null,
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                userType: "default"
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                accessToken: null,
                userType: null
            };
        default:
            return state;
    }
}

export default authReducer;