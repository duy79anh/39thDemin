import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import FormPassword from '../customComponent/CustomLogin';
import FormEmail from '../customComponent/CustomLogin1';

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

export default function SignIn({ onLogin,setErr,setAlert,err,alert,setHistory }) {
    const methods = useForm();
        setHistory(useHistory());
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
                    <form className={classes.form} onSubmit={methods.handleSubmit((data,history) => { onLogin({ ...data }) })}>
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