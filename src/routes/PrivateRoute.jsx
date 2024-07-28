import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import styles from './PrivateRoute.module.css';

function PrivateRoute() {
  const { user, signOut } = useAuth();

  return user ? (
      <div>
          <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link className={styles.navDash} to="/dashboard">DASHBOARD</Link>
            <div className={styles.navUserArea}>
                  <span className={styles.navUser}><User size={24} />{user.email}</span>
                  <button className={styles.navBtn} onClick={signOut}><LogOut size={24} /></button>
            </div>
            </div>
          </nav>

          <main className={styles.mainContainer}>
              <Outlet />
          </main>
      </div>
  ) : <Navigate to='/login' />
}

export default PrivateRoute;
