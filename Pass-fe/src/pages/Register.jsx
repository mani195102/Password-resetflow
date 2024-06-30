import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Snackbar, Grid, Paper, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('https://password-resetflow-x3zl.onrender.com/api/register', values);
                setMessage('Registration successful');
                localStorage.setItem('user', JSON.stringify(response.data));
                setOpen(true);
                resetForm();
                setTimeout(() => {
                    navigate('/');
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
                    <h2>Register</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ marginBottom: '1em' }}
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
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
                            Register
                        </Button>
                    </form>
                    <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/')}
                        >
                            Already have an account? Login
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

export default Register;
