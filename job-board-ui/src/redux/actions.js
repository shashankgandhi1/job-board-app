
export const loginUserAction = (userInfo) => {
    return {type: "LOGIN_USER", payload: userInfo};
}

export const viewJobAction = (jobDetails) => {
    return {type: "ALL_JOBS", payload: jobDetails};
}

export const showAlertAction = (errorMessage) => {
    return {type: "SHOW_ALERT", payload: errorMessage};
}
