import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormPassword from '../CustomLogin';
import FormEmail from './CustomLogin1';
import { Link } from 'react-router-dom';
import Product from './Product';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn({ onLogin,setErr,setAlert,err,alert }) {
    const methods = useForm();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const handleClose = () => {
        setAlert(false);
        setErr(false);
    };

    
    const classes = useStyles();
   
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Doged Store
        </Typography>
                <Typography style={{ fontWeight: 900 }} variant="h7">
                    Log In
        </Typography>
                <FormProvider {...methods}>
                    <form className={classes.form} onSubmit={methods.handleSubmit((data) => { onLogin({ ...data }) })}>
                        <FormEmail required label='Email*' name='email' />
                        <FormPassword required label='Password*' name='password' />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log In
          </Button>
                    </form>
                </FormProvider>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Login Success!
  </Alert>
                </Snackbar>
                <Snackbar open={err} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Email or Password invalid ! Please try again!
  </Alert>
                </Snackbar>
            </div>
        </Container>
    );
}