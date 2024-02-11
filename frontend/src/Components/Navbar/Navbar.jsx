//1
import { NavLink } from "react-router-dom";
//2
import styles from "./Navbar.module.css";
//3 
import { useSelector } from "react-redux";
//4
import { signOut } from "../../api/internal";
//6
import { resetUser } from "../../store/userSlice";
//7
import { useDispatch } from "react-redux";

function Navbar() {
    const isAuthenticated = useSelector((state) => state.user.auth);//if user logedin then so only signout button
const dispatch = useDispatch();
    const handleSignout = async () => {
      await signOut();
      dispatch(resetUser())
    }

  return (
    <>
      <nav className={styles.navbar}>
      <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>
          CoinBounce
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Home
        </NavLink>


        <NavLink
          to="crypto"
          className={({ isActive }) =>
          isActive ? styles.activeStyle : styles.inActiveStyle
        }
        >
          crypto
        </NavLink>

        <NavLink
          to="blogs"
          className={({ isActive }) =>
          isActive ? styles.activeStyle : styles.inActiveStyle
        }
        >
          blogs
        </NavLink>

        <NavLink
          to="submit"
          className={({ isActive }) =>
          isActive ? styles.activeStyle : styles.inActiveStyle
        }
        >
          submit a blog
        </NavLink>

        { isAuthenticated ? <div> <NavLink><button className={styles.signoutButton} onClick={handleSignout}>Sign out</button></NavLink> </div> :
        <div>
        <NavLink
          to="login"
          className={({ isActive }) =>
          isActive ? styles.activeStyle : styles.inActiveStyle
        }
        >
                   <button className={styles.loginButton}>Log in</button>

        </NavLink>

        <NavLink
          to="signup"
          className={({ isActive }) =>
          isActive ? styles.activeStyle : styles.inActiveStyle
        }
        >
          <button className={styles.signupButton}>Sign up</button>
        </NavLink>
        </div>
}
      </nav>
      <div className={styles.separator}></div>
    </>
  );
}

export default Navbar;
