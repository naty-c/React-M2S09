import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <header className={styles.header}>
                <h1>Dashboard</h1>
            </header>
            <nav className={styles.sidebar}>
                <ul>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
            <main className={styles.mainContent}>
                <h2>Welcome to your dashboard</h2>
                <p>This is where your main content will be displayed.</p>
            </main>
        </div>
    );
}

export default Dashboard;
