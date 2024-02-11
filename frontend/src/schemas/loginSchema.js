

import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errormessage = "lowercase, uppercase and digit";

const loginSchema = yup.object().shape({
    username:yup.string().min(5).max(30).required('username is required'),
    password:yup.string().min(8).max(25).matches(passwordPattern,{message:errormessage}).required(),
});

export default loginSchema;