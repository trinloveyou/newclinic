import React, { useState } from 'react';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom'; // นำเข้า Link จาก React Router
import { Container, Typography, TextField, Button, Snackbar, CircularProgress, Alert, Link } from '@mui/material';

const AuthForgotpass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/reset-password', { email });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage('');
    setError('');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Forgot Password
      </Typography>
      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleResetPassword}
        disabled={!email || loading}
        style={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
      </Button>
      <Snackbar open={!!message || !!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? 'error' : 'success'}>
          {error || message}
        </Alert>
      </Snackbar>
      {/* เพิ่ม Link ไปยังหน้า Forgot Password */}
      <Container maxWidth="sm" style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" gutterBottom align="center"></Typography>
        <div>
          <Link variant="h1" component={RouterLink} to="/Login" color="text.primary" style={{ fontSize: 15 }}>
            Login
          </Link>
        </div>
      </Container>
    </Container>
  );
};

export default AuthForgotpass;
