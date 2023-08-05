import React, { useEffect } from 'react'
import Register from '../../component/User/Register/Register'
import {useUpdateDataOnRender} from '../../Helper/Helper'
function RegisterPage() {
  useEffect(()=>{
    useUpdateDataOnRender("Register")
  },[])
  return (
    <Register/>
  )
}

export default RegisterPage