
import React, {useContext, useState, useEffect} from "react"
import {Context} from "../store/appContext"


function UsersList(){
    
    const {store,actions} = useContext(Context)
    const [usersList, setUsersList] = useState([])

    useEffect(()=>{
        async function fetchData (){
            let response = await actions.genericFetchProtected("usersList")
            let users = response.json()
            setUsersList(await users)
    
        }

        fetchData()
    },[])

    console.log(usersList)

    return(
        <div>
            <h1>List of users</h1>
            {usersList.length> 0 && usersList ?usersList.map((item,index) =>{
                return <li key={item.id}>User email: {item.email}</li>
            }): <p>No users</p>}
      
        </div>
    )
}

export {UsersList}