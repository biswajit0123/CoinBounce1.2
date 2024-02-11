import { Navigate } from "react-router-dom";

function Protected({isAuth, children}){
if (isAuth) {
    return children;
}else{
return <Navigate to='/login' />;
}
// on which protected compenent wrapped up is a children
}

export default Protected;