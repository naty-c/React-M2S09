import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';


function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
        await signIn(data);
        navigate('/dashboard');
    } catch (error) {
        alert(error.message || 'Login failed');
    }
}

  return (

      <main className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginFormContent}>
              <h1>Login</h1>

                <div className={styles.loginGroup}>
                  <label htmlFor="username">Username:</label>
                  <input 
                  type="text" 
                  className={styles.loginInput} 
                  placeholder='Username...'
                  {...register("username", { required: 'Username is required' })} />
                </div>
                {errors.username && <p className={styles.error}>{errors.username.message}</p>}

                <div className={styles.loginGroup}>
                  <label htmlFor="password">Password:</label>
                  <input 
                  type="password" 
                  className={styles.loginInput} 
                  placeholder='Password...'
                  {...register("password", { required: 'Password is required' })} />
                </div>
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}

              <button type="submit" className={styles.loginButton} disabled={isSubmitting}>{isSubmitting ? 'Loading...': 'Login'}</button>

              <p>Don't have an account? <Link to="/register">Register</Link></p>

            </form>
        </div>
    </main>
  );
}

export default Login;
