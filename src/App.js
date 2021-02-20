import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Cart from './conponents/Cart';
import Product from './conponents/Product';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade, makeStyles } from '@material-ui/core/styles';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  const cartIntialValue = [];
  const productIntial={
    id:'',
    name:'',
    price:'',
    count:''
  }
  const [cart, setCart] = useState(cartIntialValue);
  const [indexCart, setIndexCart] = useState(0);
  const [product,setProduct]=useState(productIntial);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 2,
      fontWeight: 'bold',
      color: 'white',
      [theme.breakpoints.up('sm')]: {
        display: 'block',

      },
     
    },



  }));
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="sticky">
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
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} >Profile</MenuItem>
              <MenuItem onClick={handleClose} >My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Typography className={classes.title} variant="h4" noWrap >
              <Link  to="/">Doged Store</Link>
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
            <Route path="/Cart">
              <Cart cart={cart} setIndexCart={setIndexCart}
                indexCart={indexCart} setCart={setCart} />
            </Route>

            <Route path="/">
              <Product cart={cart}
                setIndexCart={setIndexCart}
                indexCart={indexCart}
                setCart={setCart}
              />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>


  );
}

export default App;
