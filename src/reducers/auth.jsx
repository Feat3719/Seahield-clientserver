const initialState = {
    isLoggedIn: false,
    user: null,
    userType: null,
    expiration: null
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                userType: action.payload.userType, // userType 값을 액션에서 받아와 업데이트
                expiration: action.payload.expiration
            };
        case "LOGOUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                accessToken: null,
                userType: null,
                expiration: null
            };
        default:
            return state;
    }
}

export default authReducer;