import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RoleSelector = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        let email, password;
        if (role === 'admin') {
            email = 'admin@example.com';
            password = '123';
        } else if (role === 'hr') {
            email = 'hr@example.com';
            password = '123';
        } else if (role === 'employee') {
            email = 'employee1@example.com';
            password = '123';
        }

        const result = login(email, password);
        if (result.success) {
            if (role === 'admin') navigate('/admin-dashboard');
            else if (role === 'hr') navigate('/hr-dashboard');
            else if (role === 'employee') navigate('/employee-dashboard');
        } else {
            alert("Login Failed");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Select Role to Login</h1>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button onClick={() => handleLogin('admin')} style={styles.button}>Admin</button>
                <button onClick={() => handleLogin('hr')} style={styles.button}>HR</button>
                <button onClick={() => handleLogin('employee')} style={styles.button}>Employee</button>
            </div>
        </div>
    );
};

const styles = {
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    }
}

export default RoleSelector;
