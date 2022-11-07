import React, {useContext} from "react"
import {Context} from "../store/appContext"
import { Link} from "react-router-dom"
import { useNavigate   } from "react-router-dom";

function Login(){

    const {store,actions} = useContext(Context)
    const navigate = useNavigate()

    const test = async() =>{
        let response = await actions.genericFetchProtected("protected") 
        let responseJson = await response.json()
        console.log(responseJson)
        if (responseJson.logged_in_as){
            return navigate("userProfile")
        }else{
            return console.log(responseJson.msg) 
        }
        }

    
    const login = async (e) =>{ //This login is to get data from form
        e.preventDefault()
        console.log("We are in login function")

        const data =  new FormData(e.target)
        let email = data.get("email")
        let password = data.get("password")
        console.log(email,password)

        let objBody ={
            "email": email,
            "password": password
        }
        
        let response = await actions.login("login","POST",objBody) //response is a promise
        if (response){ //Redirect to user page if response is true
            test()
        }
        
        /*
        if (response.ok){
            
            console.log(response)
            alert(response.access_token)
            
        }else{
            //response = await response.json() //response is an JS object due to .json
            console.log(response.msg)
            alert(response.msg)
        }*/




    }

    return(
        <div className="signup-container">
            <h1>Login</h1>
            <form onSubmit={(e)=> login(e)} action="" method="post">
                <div className="mb-3">
                    <label  for="email" className="form-label">Email address</label>
                    <input name="email" type="email" className="form-control" id="email" placeholder="name@example.com"/>
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input name="password" type="text" className="form-control" id="password"/>
                </div>

                <div className="button">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <Link to="/">Back to home</Link>
            {store.token? <button onClick={() => test()}>Secured endpoint</button>:null}
        </div>
    )
}

export {Login}