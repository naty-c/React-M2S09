import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../components/Profile/Profile';
import Settings from '../components/Settings/Settings';
import Logout from '../pages/Logout/Logout';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<RegisterForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    )
} 

export default AppRoutes;