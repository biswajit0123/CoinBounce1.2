import { Link } from "react-router-dom";
//2
import styles from "./Error.module.css"
function Error() {
  return (
    <>
        <div className={styles.ErrorContainer}>
        <div className={styles.header}>ERROR 404- page not found</div>
        <div className={styles.errorbody}>
          Go back to
          <Link to="/" className={styles.homelink}>home</Link>
        </div>
        </div>
      
    </>
  );
}

export default Error;
