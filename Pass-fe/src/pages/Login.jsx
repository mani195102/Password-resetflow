import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Snackbar, Grid, Paper, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://password-resetflow-x3zl.onrender.com/api/login', values);
                setMessage('Login successful');
                localStorage.setItem('user', JSON.stringify(response.data)); // Example: Storing user data
                setOpen(true);
                setTimeout(() => {
                    navigate('/forget-password'); // Navigate to Forgot Password page after login
                }, 2000); // Navigate after 2 seconds
            } catch (error) {
                setMessage(error.response.data.message);
                setOpen(true);
            }
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={6}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <h2>Login</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ marginBottom: '1em' }}
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            style={{ marginBottom: '1em' }}
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: 20 }}>
                            Login
                        </Button>
                    </form>
                    <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Link>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/forget-password')}
                        >
                            Forgot Password?
                        </Link>
                    </Grid>
                </Paper>
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            />
        </Grid>
    );
};

export default Login;
