import { useState } from 'react';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
      const newErrors = {};

      // 1. name: required, max: 255
      if (!name.trim()) {
        newErrors.name = '✖ Name is required';
      } else if (name.length > 255) {
        newErrors.name = '✖ Name must be at most 255 characters';
      }

      // 2. email: required, valid format
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!email.trim()) {
        newErrors.email = '✖ Email is required';
      } else if (!isEmailValid) {
        newErrors.email = '✖ Email must be in a valid format (e.g. name@example.com)';
      }

      // 3. password: required, min 8
      if (!password) {
        newErrors.password = '✖ Password is required';
      } else if (password.length < 8) {
        newErrors.password = '✖ Password must be at least 8 characters';
      }

      // 4. password confirmation: match
      if (password !== confirmPassword) {
        newErrors.confirmPassword = '✖ Passwords do not match';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };


  /*
  const validateForm = () => {
    const newErrors = {};

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordStrong = password.length >= 6;
    const isPasswordMatch = password === confirmPassword;

    if (!isEmailValid) {
      newErrors.email = '✖ Email must be in a valid format (e.g. name@example.com)';
    }

    if (!isPasswordStrong) {
      newErrors.password = '✖ Password must be at least 6 characters';
    }

    if (!isPasswordMatch) {
      newErrors.confirmPassword = '✖ Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */

  


  const handleSubmit = async (e) => {
     e.preventDefault();
    if (!validateForm()) return;
    setErrors({});
 
    //   if (email === 'test@example.com') {
    //     setErrors({
    //     email: '✖ The email has already been taken.',
    //   });
    // } else {
    //   setSuccess('✅ [DEV] Registered successfully!');
    //   }


  
  try {
    const res = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('✅ Registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      // Laravel validation error format
      if (data.errors) {
        // Example: { email: ["The email has already been taken."] }
        const fieldErrors = {};
        for (const key in data.errors) {
          fieldErrors[key] = data.errors[key][0]; // Take first message
        }
        setErrors(fieldErrors);
      } else {
        setErrors({ general: data.message || '❌ Registration failed' });
      }
    }
  } catch (err) {
    console.error(err);
    setErrors({ general: '❌ An error occurred. Please try again.' });
  }
    
};




  return (
   <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleSubmit} noValidate> 

          <input
            className="auth-input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}


        
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        
          
           
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}


          
          <input
            className="auth-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          
         
          <button className="auth-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
