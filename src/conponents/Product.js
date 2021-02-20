import Image from '@material-ui/icons/Image';
import CardMedia from '@material-ui/core/CardMedia';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { AddShoppingCart } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
function Product({ cart, setCart, indexCart, setIndexCart }) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const listProductIntial = [];
  const [product, setProduct] = useState(listProductIntial);
  const [alert, setAlert] = useState(false);
  const [er, setEr] = useState(false);
  //    const axios=require('axios');
  //    axios.get('https://600e76d03bb1d100179df304.mockapi.io/products/9')
  //         .then(  (response)=>{
  //             console.log(response);           
  //             setImage(response.data);
  //         },[])

  useEffect(() => {
    const axios = require('axios');
    axios.get('https://600e76d03bb1d100179df304.mockapi.io/products/')
      .then((response) => {
        // console.log(response);
        setProduct(response.data);
      })
  }, []);
  const handleClose = () => {
    setAlert(false);
  };
  const handleCloseEr = () => {
    setEr(false);
  };
  const onClickedCart = (value) => {
    const exist = cart.find((x) => x.id === value.id);
    if (exist) {
      setCart(cart.map(x => x.id === value.id ? { ...exist, qty: exist.qty + 1 } : x));
      setAlert(true);
    } else {
      setCart([...cart, { ...value, qty: 1 }]);
      setIndexCart(indexCart + 1);
      setAlert(true);
    }
    // setCart([...cart,{...value,qty:1}]);
    // console.log(cart);
    // setAlert(true);
    
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      width: 200,
      height: 400,
      padding: 10,
      margin: 30,

    },
    media: {
      height: 70,
      width: 200,
      paddingTop: '56.25%', // 16:9

    },

    avatar: {
      backgroundColor: red[400],
    },
  }));
  const classes = useStyles();
  function FormRow() {
    return (
      <React.Fragment >

        {
          product.map((value) => {
            return (
              <Card key={value.id} className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.rounded}>
                      <LocalOfferIcon color='secondary' />
                    </Avatar>
                  }
                  style={{ color: 'red', fontWeight: 'bold' }}
                  title={value.price + ' $'}
                />
                <CardMedia
                  className={classes.media}
                  image={value.image}
                  title="Paella dish"
                >

                </CardMedia>
                <CardContent>
                  <Typography style={{ maxWidth: 188, height: 20, textAlign: 'center', fontStyle: 'oblique' }}>{value.name}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton onClick={() => { onClickedCart(value) }} style={{ margin: 10 }} aria-label="add to cart">
                    <AddShoppingCart color="primary" fontSize="large" />
                  </IconButton>

                </CardActions>

              </Card>
            );
          })
        }
        <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Added to Cart!
  </Alert>

        </Snackbar>
        <Snackbar open={er} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleCloseEr} severity='error'>
            {`This product is already in Cart! \n Please choose another product!`}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }

  return (
    <div style={{ marginTop: 50, marginLeft: 60 }}>


      <Grid maxWidth='sm' container spacing={2}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>

    </div>


  );
}
export default Product;