import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Snackbar, Grid, Paper } from '@mui/material';
import axios from 'axios';

const ForgetPassword = () => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://password-resetflow-x3zl.onrender.com/api/forget-password', values);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.message);
            }
            setOpen(true);
        },
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} md={12}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <h2>Forget Password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <Button color="primary" variant="contained" fullWidth type="submit" style={{ marginTop: 20 }}>
                            Submit
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

export default ForgetPassword;
