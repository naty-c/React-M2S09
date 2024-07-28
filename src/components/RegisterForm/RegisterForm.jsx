import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import styles from './RegisterForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email')
        .required('Email is required')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            'Email must be a valid format'
        ),
    password: yup.string()
        .required('Password is required')
        .min(4, "Password length should be at least 4 characters")
        .max(12, "Password cannot exceed more than 12 characters"),
    age: yup.number()
        .typeError('Please enter a valid number')
        .min(18, 'Minimum age is 18')
        .required('Age is required')
  });

function RegisterForm() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
      });

    async function onSubmit(data) {
        console.log(data); 
        setSuccessMessage('Successfully registered');
        setTimeout(() => {
            navigate('/login');
        }, 2000); // Redirect after 2 seconds
};

    return (
        <main className={styles.registerContainer}>
            <div className={styles.registerForm}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.registerFormContent}>
                    <h1>Register Form</h1>

                    {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

                        <div className={styles.registerGroup}>
                            <label htmlFor="name">Name:</label>
                            <input 
                            type="text"
                            id="name"
                            className={styles.registerInput} 
                            placeholder='Your name...'
                            {...register("name")} 
                            />
                        </div>
                        <div className={styles.errorContainer}>
                            <p className={styles.error}>{errors.name?.message}</p>
                        </div>

                        <div className={styles.registerGroup}>
                            <label htmlFor="email">Email:</label>
                            <input 
                            type="email"
                            id="email"
                            className={styles.registerInput} 
                            placeholder='Your email...'
                            {...register("email")} 
                             />
                        </div>
                        <div className={styles.errorContainer}>
                            <p className={styles.error}>{errors.email?.message}</p>
                        </div>
                        
                        <div className={styles.registerGroup}>
                            <label htmlFor="password">Password:</label>
                            <input 
                            type="password"
                            id="password"
                            className={styles.registerInput} 
                            placeholder='Your password...'
                            {...register("password")} 
                             />
                        </div>
                        <div className={styles.errorContainer}>
                            <p className={styles.error}>{errors.password?.message}</p>
                        </div>


                        <div className={styles.registerGroup}>
                            <label htmlFor="age">Age:</label>
                            <input 
                            type="number"
                            id="age"
                            className={styles.registerInput} 
                            placeholder='Your age...'
                            {...register("age")} 
                             />
                        </div>
                        <div className={styles.errorContainer}>
                        <p className={styles.error}>{errors.age?.message}</p>
                        </div>


                        <button type="submit" className={styles.registerButton}>Register</button>

                        <p>Already have an account? <Link to={-1}>Go to login</Link></p>
                </form>
            </div>
        </main>
    )

};

export default RegisterForm;