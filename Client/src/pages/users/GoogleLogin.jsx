import React, { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import App from '../../App'
import { app } from '../../config/firebase.config'
import axios from 'axios'

function GoogleLogin() {

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()
    
    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")

    const [user,setUser] = useState(null)

    const loginWithGoogle = async () => {

        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true)
                window.localStorage.getItem("auth" , "true") 
            }
        })

    }
    const baseUrl = 'http://localhost:4000/'
    const validateUser  = async (token)=>{
        const res = await axios.get(`${baseUrl}google`,{
            headers :{
                Authorization :'Bearer '+token
            }
        })
        return res.data

    }

    useEffect(()=>{
        firebaseAuth.onAuthStateChanged((userCred)=>{
            if(userCred){
                userCred.getIdToken().then(token => {
                    window.localStorage.getItem("auth" , "true") 
                    console.log(token)
                    validateUser(token).then((data)=> {
                        console.log("-----------------  user side      -------------------")
                        console.log(data)
                        setUser(data)
                    })
                })
            }else{
                setAuth(false)
                window.localStorage.getItem("auth" , "false")
                setUser(null) 
            }
        })
    },[])
   if(user){
    console.log("----------------------",user.user.name)
   }
    return (
        <div>{
            auth ? <h1>home page {user? user.user.name : ""}</h1> : <button onClick={loginWithGoogle} style={{ backgroundColor: "red" }}>login</button>
        }
        </div>
    )
}

export default GoogleLogin