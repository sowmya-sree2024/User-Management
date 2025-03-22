import React, { useState } from 'react';
import { Container, TextField, Button, Card, CardContent, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const App = () => {
    const [user, setUser] = useState({
        fullName: '',
        email: '',
        mobile: '',
        dob: ''
    });
    const [users, setUsers] = useState([]);
    const [showCard, setShowCard] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            console.log("New User", users);
            const response = await axios.post('http://localhost:3000/user/', user);
            console.log(response.data);
            alert('User registered successfully');
            setUser({ fullName: '', email: '', mobile: '', dob: '' });
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
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" color='brown' textAlign="center" gutterBottom>
                User Registration
            </Typography>
            <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={user.mobile}
                onChange={handleChange}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={user.dob}
                onChange={handleChange}
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

            {/* Popup */}
            {showCard && (
    <Box
        sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '900px', 
            backgroundColor: 'white',
            boxShadow: '0px 6px 15px rgba(0,0,0,0.4)',
            borderRadius: '12px',
            zIndex: 10,
            p: 3
        }}
    >
        <Card sx={{ width: '100%', overflow: 'hidden' }}> 
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" color='green'>Registered Users</Typography>
                    <IconButton onClick={() => setShowCard(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Table */}
                {users.length === 0 ? (
                    <Typography>No users found</Typography>
                ) : (
                    <TableContainer component={Paper} sx={{ width: '100%' }}> {/* Full width */}
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: "brown", color: 'white' }}><b>Name</b></TableCell>
                                    <TableCell sx={{ backgroundColor: "brown", color: 'white' }}><b>Email</b></TableCell>
                                    <TableCell sx={{ backgroundColor: "brown", color: 'white' }}><b>Mobile</b></TableCell>
                                    <TableCell sx={{ backgroundColor: "brown", color: 'white' }}><b>DOB</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.mobile}</TableCell>
                                        <TableCell>{user.dob}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    </Box>
)}
        </Container>
    );
};

export default App;
