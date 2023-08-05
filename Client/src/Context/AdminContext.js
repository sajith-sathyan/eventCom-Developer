import React,{Children, createContext,useState} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({})=>{
    const [isAdminAuthenticated,setAdminAuthenticated] = useState(false)

    const AdminLogin = ()  =>{
        setAdminAuthenticated(true)
    }


    const AdminLogout = ()=>{
        setAdminAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAdminAuthenticated,AdminLogin,AdminLogout}} >
        {Children}
    </AuthContext.Provider>
    )

}