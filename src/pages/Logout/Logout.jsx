import { Link } from 'react-router-dom';
import styles from './Logout.module.css';

function Logout() {
  return (
    <main className={styles.logoutContainer}>
      <h1>Logout Successful</h1>
      <p>You have successfully logged out.</p>
      <Link to="/login">Login Again</Link>
    </main>
  );
}

export default Logout;
