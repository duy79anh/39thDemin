import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Cart from './conponents/Cart';
import Product from './conponents/Product';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import CheckOut from './conponents/CheckOut';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Browserhis
} from "react-router-dom";
import StickyFooter from './conponents/Footer';
import { HomeOutlined } from '@material-ui/icons';
import { CircularProgress, Icon } from '@material-ui/core';
import SignIn from './conponents/Login';
import ProductManageMent from './conponents/ProductManageMent';
import OrderManagement from './conponents/OrderManagement';

function App() {
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [indexCart, setIndexCart] = useState(0);
  const [listUser, setListUser] = useState([]);
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 2,
    },
    bar: {
      backgroundColor: '#ffffff',
      color:'blue',
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 2,
      fontWeight: 800,
      color: '#43c8e6',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
        marginLeft: 20,
      },
    },
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const axios = require('axios');
    axios.get('https://600e76d03bb1d100179df304.mockapi.io/user/')
      .then((response) => {
        setListUser(response.data);
      })
  }, []);
  useEffect(() => {
    const axios = require('axios');
    axios.get('https://600e76d03bb1d100179df304.mockapi.io/products/')
      .then((response) => {
        // console.log(response);
        setProduct(response.data);
      })
  }, []);
  useEffect(() => {
    const axios = require('axios');
    axios.get('https://600e76d03bb1d100179df304.mockapi.io/orderDetails/')
      .then((response) => {
        // console.log(response);
        setOrder(response.data);
      })
  }, []);
  const [exist, setExist] = useState({});
  const logOut = () => {
    setSuccess(false);
  }
  const history = useHistory();
  const onLogin = (data) => {

    setExist(listUser.find((x) => x.mail === data.email && x.passWord === data.password));
    if (exist.mail) {
      // history.push('/');
      setSuccess(true);
      setAlert(true);
      // history.push('/');

    } else {
      setErr(true);
      return;
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
    
  };
  const listLogedOn = () => (
    <div >
      <div style={{ display: 'flex', padding: '10px 40px' }}>
        <Icon >
          <HomeOutlined />
        </Icon>
        <Typography style={{ margin: '0 20px', fontWeight: 700 }} variant='h5'>Dash Board</Typography>
      </div>
      <div style={{ textAlign: 'center', margin: '10px 20px' }}>
        <Icon>
          <PersonIcon />
          <Typography variant='subtitle1'> Xin chào : {exist.name} !</Typography>
          <IconButton size='small' onClick={logOut}>
            <ExitToAppIcon /> {`Logout`}
          </IconButton>
        </Icon>
      </div>
      <Divider />
      <List>
        <ListItem style={{ margin: '0 20px' }} button component={Link} to='/ProductManagement' onClick={handleClose} >
          <ListItemIcon><InboxIcon /> </ListItemIcon>
          <ListItemText primary='Product Management' />
        </ListItem>

      </List>

      <List>

        <ListItem style={{ margin: '0 20px' }} component={Link} to='/OrderManagement' button onClick={handleClose} >
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='Order Management' />
        </ListItem>
      </List>
    </div>
  );
  const listUnLogon = () => (
    <div >
      <div style={{ display: 'flex', padding: '10px 40px' }}>
        <Icon>
          <HomeOutlined />
        </Icon>
        <Typography style={{ margin: '0 20px', fontWeight: 700 }} variant='h5'>Dash Board</Typography>

      </div>
      <Divider />
      <List>
        <ListItem style={{ margin: '0 20px' }} button component={Link} to='/Login' onClick={handleClose} >
          <ListItemIcon><InboxIcon /> </ListItemIcon>
          <ListItemText primary='Đăng nhập' />
        </ListItem>

      </List>

      {/* <List>
       
          <ListItem style={{margin:'0 20px'}} button onClick={handleClose} >
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary='function' />
          </ListItem>
      </List> */}
    </div>
  );


  return (
    <div className={classes.root}>
      <Router >
        <AppBar className={classes.bar} position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>

            <React.Fragment >
              <SwipeableDrawer
                anchor='left'
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onOpen=''
              >
                {success === true ? listLogedOn() : listUnLogon()}
              </SwipeableDrawer>
            </React.Fragment>
            <Typography className={classes.title} variant="h5" noWrap >
              <Link to="/">Doged Store</Link>
            </Typography>
            <li>
              <Link to="/Cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={indexCart} color="secondary">
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
              </Link>
            </li>
          </Toolbar>
        </AppBar>

        <div>


          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
          <Route path='/OrderManagement'>
              <OrderManagement
               order={order}
                setOrder={setOrder}
              />
            </Route>
            <Route path='/ProductManagement'>
              <ProductManageMent
                product={product}
                setProduct={setProduct}
              />
            </Route>
            <Route path="/Login">

              <SignIn alert={alert} setAlert={setAlert} err={err} setErr={setErr} onLogin={onLogin} />
            </Route>
            <Route path="/Checkout">
              <CheckOut
                cart={cart}
                setCart={setCart}
                setIndexCart={setIndexCart}
              />
            </Route>


            <Route path="/Cart">
              <Cart cart={cart} setIndexCart={setIndexCart}
                indexCart={indexCart} setCart={setCart} />
            </Route>

            <Route path="/">
              <Product cart={cart}
                setIndexCart={setIndexCart}
                indexCart={indexCart}
                setCart={setCart}
                product={product}
                setProduct={setProduct}
              />

            </Route>

          </Switch>
        </div>
      </Router>
      <StickyFooter />
    </div>


  );
}

export default App;
