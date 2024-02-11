import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 4
import styles from "./App.module.css";
//5
import Protected from "./Components/Protected/Protected";
//6
import Error from "./Pages/Error/Error";
//7 
import Login from "./Pages/Login/Login";
//8 
import { useSelector } from "react-redux";
//10
import Signup from "./Pages/Signup/Signup";
//11
import Crypto from "./Pages/Crypto/Crypto";
//12
import Blog from "./Pages/Blog/Blog1";
//13
import  SubmitBlog from './Pages/Submitblog/Submitbog'
//14
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
//15
import UpdateBlog from "./Pages/UpdateBlog/UpdateBlog";
function App() {
  const isAuth = useSelector((state) => state.user.auth);
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          
          <Navbar  />
          <Routes>
            {/* index or homepage */}
            <Route
              path="/"
              exact
              element={
                <div className={styles.main}>
                  <Home />
                </div>
              }
            />
            {/* crypto page */}
            <Route
              path="crypto"
              exact
              element={<div className={styles.main}><Crypto /></div>}
            />
            {/* blogs page */}
            <Route
              path="blogs"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}><Blog /></div>
                </Protected>
              }
            />

<Route
              path="blogs/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}><BlogDetails /></div>
                </Protected>
              }
            />

<Route
              path="/blog-update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}><UpdateBlog /></div>
                </Protected>
              }
            />
            {/*  */}

            <Route
              path="submit"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}><SubmitBlog /></div>
                </Protected>
              }
            />
            <Route
              path="login"
              exact
              element={<div className={styles.main}><Login /> </div>}
            />
            <Route
              path="signup"
              exact
              element={<div className={styles.main}><Signup /> </div>}
            />
              <Route
              path="*"
              exact
              element={<div className={styles.main}><Error/> </div>}
            />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
