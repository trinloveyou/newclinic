import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({ fullName: '', phoneNumber: '' });

  useEffect(() => {
    // get token from local storage
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:8000/api/usertoken', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setFullName(response.data.users[0].name);
        setEmail(response.data.users[0].email);
        setPhoneNumber(response.data.users[0].numphone);
      });
  }, []);

  const handleFullNameChange = (e) => {
    const { value } = e.target;
    const nameRegex = /^[^\d]*$/; // Regular expression to disallow numbers
    if (nameRegex.test(value)) {
      setFullName(value);
      setErrors((prev) => ({ ...prev, fullName: '' }));
    } else {
      setErrors((prev) => ({ ...prev, fullName: 'ชื่อไม่ควรมีตัวเลข' }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const phoneRegex = /^[0-9]*$/; // Regular expression to allow only numbers
    if (phoneRegex.test(value)) {
      setPhoneNumber(value);
      setErrors((prev) => ({ ...prev, phoneNumber: '' }));
    } else {
      setErrors((prev) => ({ ...prev, phoneNumber: 'หมายเลขโทรศัพท์ควรมีเฉพาะตัวเลข' }));
    }
  };

  const editprofilesave = async () => {
    console.log('editprofilesave');
    const token = localStorage.getItem('token');
    axios
      .put(
        'http://localhost:8000/api/editprofile',
        {
          name: fullName,
          email: email,
          numphone: phoneNumber
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4
      }}
    >
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={fullName}
        onChange={handleFullNameChange}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName}
      />

      <TextField label="Email" variant="outlined" margin="normal" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextField
        label="Phone Number"
        variant="outlined"
        margin="normal"
        fullWidth
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        error={Boolean(errors.phoneNumber)}
        helperText={errors.phoneNumber}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={editprofilesave}>
        Save Changes
      </Button>
    </Box>
  );
};

export default EditProfile;
