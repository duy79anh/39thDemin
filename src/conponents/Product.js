import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { AddShoppingCart } from '@material-ui/icons';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';

function Product({ product,setProduct, cart, setCart, indexCart, setIndexCart }) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [alert, setAlert] = useState(false);
  const [er, setEr] = useState(false);
  const [age, setAge] = useState('');

  const handleChangeCbo = (event) => {
      const sort=event.target.value;
    setAge(sort);
    if(sort==='lowest'){
      setProduct(product.sort((a,b)=>a.price-b.price));
    }else if(sort==='highest'){
      setProduct(product.sort((a,b)=>b.price-a.price));
    }
    
  };
 
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
           <FormControl variant="outlined" style={{position:'-webkit-sticky', margin: 10, minWidth: 120}} >
        <InputLabel id="demo-simple-select-outlined-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChangeCbo}
          label="Age"
        >
          <MenuItem value='lowest'>lowest</MenuItem>
          <MenuItem value='highest'>highest</MenuItem>
        </Select>
      </FormControl>

      <Grid maxWidth='sm' container spacing={2}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>

    </div>


  );
}
export default Product;