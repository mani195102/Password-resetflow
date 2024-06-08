import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Snackbar, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`http://localhost:3000/api/reset_password/${token}`, values);
                setMessage(response.data.message);
                setOpen(true);
                resetForm();
                setTimeout(() => {
                    navigate('/');
                }, 3000); // Navigate after 3 seconds
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
            <Grid item xs={12} sm={8} md={6}>
                <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
                    <h2>Reset Password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            style={{ marginTop: '1em' }}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            style={{ marginTop: '1em' }}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: 20 }}>
                            Reset Password
                        </Button>
                    </form>
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

export default ResetPassword;
