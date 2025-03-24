import React, { useState } from 'react';
import {
  Container, TextField, Button, Card, Typography, Box, IconButton, Grid, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!user.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }

    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Valid email is required';
      isValid = false;
    }

    if (!user.mobile || !/^\d{10}$/.test(user.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (!user.dob) {
      newErrors.dob = 'Date of Birth is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post('http://localhost:3000/user/', user);
      alert('User registered successfully');
      setUser({ fullName: '', email: '', mobile: '', dob: '' });
      setErrors({});
    } catch (error) {
      alert('Error registering user');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/');
      setUsers(response.data);
      setShowCard(true);
    } catch (error) {
      alert('Error fetching users');
      console.log('Error in Getting USers')
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ p: 3, backgroundColor: '#f0f9f6', borderRadius: '12px', boxShadow: 5 }}>
          <Typography variant="h4" color="black" textAlign="center" gutterBottom>
            Registration
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            error={!!errors.fullName}
            helperText={errors.fullName}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={user.mobile}
            onChange={handleChange}
            error={!!errors.mobile}
            helperText={errors.mobile}
            margin="normal"
            inputProps={{ maxLength: 10 }}
          />

          <TextField
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={user.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
            margin="normal"
          />

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={fetchUsers}>
              Show User Details
            </Button>
          </Box>
        </Card>
      </Container>

      {showCard && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: 'white',
            boxShadow: '0px 6px 15px rgba(0,0,0,0.4)',
            borderRadius: '12px',
            zIndex: 10,
            p: 3
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" color="#7a0785">Registered Users</Typography>
            <IconButton onClick={() => setShowCard(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {users.length === 0 ? (
            <Typography>No users found</Typography>
          ) : (
            <Box>
              {/* Headers */}
              <Box
                sx={{
                  backgroundColor: '#7a0785',
                  color: 'white',
                  display: 'flex',
                  p: 2,
                  borderRadius: 1,
                  fontWeight: 'bold'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={3}>Name</Grid>
                  <Grid item xs={3}>Email</Grid>
                  <Grid item xs={3}>Mobile</Grid>
                  <Grid item xs={3}>DOB</Grid>
                </Grid>
              </Box>

              {/* Divider */}
              <Divider sx={{ my: 1 }} />

              {/* Rows */}
              {users.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f1f8e9' : '#e8f5e9',
                    p: 2,
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>{user.fullName}</Grid>
                    <Grid item xs={3}>{user.email}</Grid>
                    <Grid item xs={3}>{user.mobile}</Grid>
                    <Grid item xs={3}>{user.dob}</Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="#7a0785" onClick={() => setShowCard(false)}>
              Back to Registration
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default App;
