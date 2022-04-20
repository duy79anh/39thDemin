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
      {'Copyright © malibu988383@gmail.com'}
      {new Date().getFullYear()}
      {'.'}
      <Link color="primary" href="https://www.facebook.com/tenladuyanh ">
        Liên hệ
      </Link>{' '}
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
          Về chúng tôi
        </Typography>
        <Typography variant="subtitle1" >
          {'39th Demin là trang thương mại điện tử phát triên bởi Duy Anh Trần'}
          </Typography>
          <Typography variant="subtitle1" >
          {'Chúng tôi cung cấp các loại mặt hàng may mặc cho giới trẻ'}
        </Typography>
        <Typography variant="body1">Mang lại chất lượng tốt nhất</Typography>
  
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