import React, {useContext} from "react"
import {Context} from "../store/appContext"
import { useNavigate, Link   } from "react-router-dom";

export default function UserProfile(){
    console.log("UserProfile")
    const {actions, store} = useContext(Context)
    const navigate = useNavigate()
    return(
        <div>
            <h1>Welcome user!</h1>
            <button onClick={()=> {
                actions.logout()
                return navigate("/")
                }}>Log out</button>
            <div>
                <Link to="/usersList">users List</Link>
            </div>
            
        </div>

    )
}