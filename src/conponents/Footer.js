import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { emphasize, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright ©  ngabinh239@gmail.com  '}
      <Link color="primary" href="https://fb.com/Ngafko.lacaf">
        Contact me
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'50px',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
    flexWrap:'wrap',
    textAlign:'center',
    backgroundColor: '#c3dee8',
  },
  main: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display:'flex',
    flexDirection: 'column',
    flexWrap:'wrap',
  },
  content:{
    display:'flex',
    flexDirection: 'column',
    flexWrap:'wrap',
  },
  footer: {
    textAlign:'center',
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[900],
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth='sm'>

       <Typography variant="h4" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="subtitle1" >
          {'Pin a footer to the bottom of the viewport.'}
          {'The footer will move as the main element of the page grows.'}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
  
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth='sm'>
          {/* <Typography variant="body1">My sticky footer can be found here.</Typography> */}
          <Copyright />      
        </Container>
      </footer>
    </div>
  );
}