

import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Signup.module.css"
import { setUser } from "../../store/userSlice";
import signupSchema from "../../schemas/signupSchema"
import TextInput from "../../Components/Textinput/Textinput"
import { signup } from "../../api/internal";

function Signup(){

    const navigate = useNavigate();
    const dispatch =useDispatch();
    const [error, setError] = useState('');

    const handleSignup = async () => {   //equal with authcontroller not sure
        const data = {
            name:values.name,
            username: values.username,
            email:values.email,
            password: values.password,
            confirmPassword:values.confirmPassword,
          };

          const response = await signup(data);

          if(response.status === 201){
//setUser
const user = {
    _id: response.data.user._id,
    email: response.data.user.email,
    username: response.data.user.username,
    auth: response.data.auth,
  };

  dispatch(setUser(user));
//redirect to home page
navigate("/");

          } else if (response.code === "ERR_BAD_REQUEST") {
            // display error message
            setError(response.response.data.message);
          }
    };

    //use formik to validate our data

    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues : {
            name: "",
            username:"",
            email:"",
            password:"",
            confirmPassword:"",
        },
        validationSchema:signupSchema
    });

return(
    <>
<div className={styles.signupWrapper}>
    <div className={styles.signupHeader}> Create a New accounr
<TextInput 
type="text"
name="name"
value={values.name}
onBlur ={handleBlur}
onChange = {handleChange}
placeholder="enter your name"
error = {errors.username && touched.username ? 1 : undefined}
errormessage= {errors.name}
/>

<TextInput  
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

<TextInput  
//using useFormik propert in our textinput
type="text"
value = {values.email}
name = 'email'
onBlur ={handleBlur}
onChange = {handleChange}
placeholder="enter your email"
error = {errors.email && touched.email ? 1 : undefined}
errormessage= {errors.email}
/>

<TextInput 
type="password"
value = {values.password}
name = 'password'
onBlur ={handleBlur}
onChange = {handleChange}
placeholder="enter your password"
error = {errors.password && touched.password ? 1 : undefined}
errormessage= {errors.password}
/>

<TextInput 
type="password"
value = {values.confirmPassword}
name = 'confirmPassword'
onBlur ={handleBlur}
onChange = {handleChange}
placeholder="Retype password"
error = {errors.confirmPassword && touched.confirmPassword ? 1 : undefined}
errormessage= {errors.confirmPassword}
/>

<button className={styles.registerbtn}   onClick={handleSignup}
disabled={
    !values.username || !values.password || !values.email || !values.confirmPassword || !values.name
    || errors.username || errors.password   || errors.name || errors.email  || errors.confirmPassword
  
}
>Sign up</button> 
{error != '' ? <p className={styles.errormessage}>{error}</p> : ""}
<div className={styles.lastblock}>
<span>Already have an account? <button className={styles.loginbtn} onClick={() => navigate('/login')}>Log in</button></span>
</div>

    </div>
</div>
    </>
);
}

export default Signup;