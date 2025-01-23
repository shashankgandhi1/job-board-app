import { useState } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { loginApi, signupApi } from "../api/apiCalls";

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    if (isLogin) return <Login switchLogin={setIsLogin}/>
    else return <Signup switchLogin={setIsLogin}/>
};

const Login = ({switchLogin}) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <div style={{display: "flex", flexDirection: "column", width: 300, height: 400}}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} required onChange={(e)=>setUsername(e.target.value)}/>
                <br/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                <br/>

                <button type="submit" onClick={()=>loginApi(dispatch, username, password)}>Login</button>
                <br/>

                <div>Not registered? <a href="#" onClick={(e)=>switchLogin(false)}>SignUp</a></div>
            </div>
        </div>
    )
};

const Signup = ( {switchLogin} ) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [category, setCategory] = useState("");

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <div style={{display: "flex", flexDirection: "column", width: 300, height: 400}}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} required onChange={(e)=>setUsername(e.target.value)}/>
                <br/>

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                <br/>

                <label htmlFor="emailid">EmailID: </label>
                <input type="email" id="emailid" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                <br/>

                <label htmlFor="phone">Phone No.: </label>
                <input type="text" id="phone" value={phone} required onChange={(e)=>setPhone(e.target.value)}/>
                <br/>

                <label htmlFor="category">Category: </label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">--Select--</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Job Seeker">Job Seeker</option>
                </select>
                <br/>

                <button type="submit" onClick={()=>signupApi(dispatch, username, password, email, Number(phone), category)}>SignUp</button>
                <br/>

                <div>Already have an account? <a href="#" onClick={(e)=>switchLogin(true)}>Login</a></div>
            </div>
        </div>
    )
};

export default LoginPage;