const initialState = {
    userInfo: null,
    viewJob: null,
};

const appReducer = (state=initialState, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return {...state, userInfo: action.payload};
        case "ALL_JOBS":
            return {...state, viewJob: action.payload};
        case "SHOW_ALERT":
            alert(action.payload);
            return state;
        default:
            return state;
    }
};

export default appReducer;