import { viewJobAction, showAlertAction } from "../redux/actions";


// API call to login
export const loginApi = async (dispatch, username, password) => {
    try {
        const apiResponse = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password}),
        });

        const apiResponseJson = await apiResponse.json();
        if (apiResponse.status !== 200) {
            dispatch(showAlertAction(apiResponseJson?.message));
            return;
        }
        
        sessionStorage.setItem("authToken", apiResponseJson?.data?.authToken);
        sessionStorage.setItem("userInfo", JSON.stringify(apiResponseJson?.data?.user));
        window.location.pathname = "/jobs";
    } catch (err) {
        dispatch(showAlertAction("INTERNAL SERVER ERROR"));
    }
}

// API call to signup
export const signupApi = async (dispatch, username, password, emailid, phone, category) => {
    try {
        const apiResponse = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password, "emailid": emailid, "phone": phone, "category": category}),
        });

        const apiResponseJson = await apiResponse.json();
        if (apiResponse.status !== 202) {
            dispatch(showAlertAction(apiResponseJson?.message));
            return;
        }
        dispatch(showAlertAction(apiResponseJson?.message));
        window.location.reload();
    } catch (err) {
        dispatch(showAlertAction("INTERNAL SERVER ERROR"));
    }
}


// API call to create Job
export const createJobApi = async (dispatch, title, client, desc, salary, deadline) => {
    try {
        const apiResponse = await fetch("http://localhost:8000/jobs/create", {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`},
            body: JSON.stringify({"title": title, "client": client, "desc": desc, "salary": salary, "deadline": deadline}),
        });

        const apiResponseJson = await apiResponse.json();
        if (apiResponse.status !== 202) {
            dispatch(showAlertAction(apiResponseJson?.message));
            return;
        }
        dispatch(showAlertAction(`${apiResponseJson?.message}. JobID: ${apiResponseJson?.data}`));
        window.location.reload();
    } catch (err) {
        console.log(err);
        dispatch(showAlertAction("INTERNAL SERVER ERROR"));
    }
};

// API call to get all jobs

export const getAllJobs = async (dispatch) => {
    try {
        const apiResponse = await fetch("http://localhost:8000/jobs/getAll", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`},
        });

        const apiResponseJson = await apiResponse.json();
        if (apiResponse.status !== 200) {
            dispatch(showAlertAction(apiResponseJson?.message));
            return;
        }
        dispatch(viewJobAction(apiResponseJson?.data));
    } catch (err) {
        console.log(err);
        dispatch(showAlertAction("INTERNAL SERVER ERROR"));
        return;
    }
}