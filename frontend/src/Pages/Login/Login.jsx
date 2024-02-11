import Textinput from '../../Components/Textinput/Textinput';
import styles from './Login.module.css'

//3
import loginSchema from '../../schemas/loginSchema';
//4 for form validation
import { useFormik } from 'formik';
//5 
import {login} from '../../api/internal'
// 6 
import {setUser } from "../../store/userSlice"
//7 
import { useDispatch } from "react-redux";// to write in global redux
//8 
import { useNavigate } from "react-router-dom";
//9 
import { useState } from 'react';
// import { date } from 'yup';

    function Login(){
        const navigate = useNavigate();

        const dispatch = useDispatch();
      
        const [error, setError] = useState("");
                     //(paret of internal) handleLogin define when login bottn clicked


    const handleLogin = async () => {
        const data = {
          username: values.username,
          password: values.password,
        };
    const response = await login(data);

if (response.status === 200) {
    // 1. setUser
    const user = {
      _id: response.data.user._id,
      email: response.data.user.email,
      username: response.data.user.username,
      auth: response.data.auth,
    };

    dispatch(setUser(user));
    // 2. redirect -> homepage
    navigate("/");
  } else if (response.code === "ERR_BAD_REQUEST") {
    // display error message
    setError(response.response.data.message);
 
  }
};
        //1 formik gives some properties
            //1 value is our feild value  //2touched user is interacting with one feild or not //3 to handel touched event  //4 formik will update our value  //5 validation errors
        const {values, touched, handleBlur, handleChange, errors} = useFormik({
            initialValues : {
                username:"",
                password:"",
            },
            validationSchema:loginSchema
        });
     
        
return(
<>
<div className={styles.loginwrapper}>
    <div className={styles.loginheader}>Login to your account
<Textinput  
//using useFormik propert in our textinput
type="text"
value = {values.username}
name = 'username'
onBlur ={handleBlur}
onChange = {handleChange}
placeholder="enter your username"
error = {errors.username && touched.username ? 1 : undefined}
errormessage= {errors.username}
/>
<Textinput 
type="password"
value = {values.password}
name = 'password'
onBlur ={handleBlur}
onChange = {handleChange}
placeholder="enter your password"
error = {errors.password && touched.password ? 1 : undefined}
errormessage= {errors.password}
/>
<button className={styles.loginbtn}   onClick={handleLogin}
disabled={
    !values.username || !values.password || errors.username || errors.password
}
>Log in</button> 
{error != '' ? <p className={styles.errormessage}>{error}</p> : ""}

<div className={styles.lastblock}>
<span>Don't have an account? <button className={styles.registerbtn} onClick={()=> navigate('/signup')}>Register</button></span>
</div>
    </div>
</div>
</>

);
    }

    export default Login;