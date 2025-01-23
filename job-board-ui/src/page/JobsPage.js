import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobApi, getAllJobs } from "../api/apiCalls";

const JobsPage = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    if (userInfo?.category === "Recruiter") {
        return (
            <>
                <Header userInfo={userInfo}/>
                <RecruiterView/>
            </>
        );
    } else if (userInfo?.category === "Job Seeker") {
        return (
            <>
                <Header userInfo={userInfo}/>
                <JobSeekerView/>
            </>
        )
    } else {
        return <>Please login again</>;
    }
};

const Header = ({ userInfo }) => {
    return (
        <div style={{display: "flex", height: 20, justifyContent: "space-between", padding: 10, backgroundColor: "#ababab"}}>
            <div></div>
            <div style={{display: "flex", justifyContent: "space-between", gap: 10}}>
                <div>Hello, {userInfo?.username}</div>
                <button onClick={(e)=>{
                    sessionStorage.clear();
                    window.location.pathname = "/login";
                    }}>Logout</button>
            </div>
        </div>
    )
}

const RecruiterView = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [client, setClient] = useState("");
    const [desc, setDesc] = useState("");
    const [salary, setSalary] = useState(null);
    const [deadline, setDeadline] = useState(null);

    return (
        <div style={{ padding: 20}}>
            <h4>Post a Job</h4>
            <div style={{display: "flex", flexDirection: "column", width: 300}}>
                
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={title} required onChange={(e)=>setTitle(e.target.value)}/>
                <br/>

                <label htmlFor="client">Client:</label>
                <input type="text" id="client" value={client} required onChange={(e)=>setClient(e.target.value)}/>
                <br/>

                <label htmlFor="desc">Job Description:</label>
                <input type="text" id="desc" value={desc} required onChange={(e)=>setDesc(e.target.value)}/>
                <br/>

                <label htmlFor="salary">Salary:</label>
                <input type="number" id="salary" value={salary} required onChange={(e)=>setSalary(parseInt(e.target.value))}/>
                <br/>

                <label htmlFor="deadline">Job Application Deadline:</label>
                <input type="date" id="deadline" value={deadline} required onChange={(e)=>setDeadline(e.target.value)}/>
                <br/>

                <button type="submit" onClick={()=>createJobApi(dispatch, title, client, desc, salary, deadline)}>Post Job</button>
                
            </div>
        </div>
        
    )
};

const JobSeekerView = () => {

    const dispatch = useDispatch();
    const allJobs = useSelector((state)=> state.viewJob);

    useEffect(()=>{
        getAllJobs(dispatch);
        console.log(allJobs);
    }, [])


    return (
        <div style={{ padding: 20}}>
            <h4>All Jobs posted</h4>
            <br/>

            {allJobs ? (<>
                {allJobs.map((item, index) => (
                    <div style={{margin: 20, backgroundColor: "#cdcdcd", padding: 20}} key={index}>
                        <div>
                            <b>Job Title:</b> {item?.title}
                            <br/>
                            <b>Client:</b> {item?.client}
                            <br/>
                            <b>Job Description</b> {item?.desc}
                            <br/>
                            <b>Salary:</b> {item?.salary}
                            <br/>
                            <b>Application Deadline</b> {item?.deadline}
                            <br/>
                        </div>
                    </div>
                ))}
            </>) : (<>No Jobs found</>)}
        </div>
    )
};

export default JobsPage;