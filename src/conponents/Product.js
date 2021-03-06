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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import { fade,makeStyles } from '@material-ui/core/styles';
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
  const [searchItem, setSearchItem] = useState('');

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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: '#e8f9fa',
      '&:hover': {
        backgroundColor: '#bdddde',
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '300px',
       
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const classes = useStyles();
  const searchByName=()=>{
    return(
      <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase onChange={event=>{setSearchItem(event.target.value)}}
        placeholder="Search???"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
    );
  }
  function sortByPrice(){
    return(
      
      <FormControl variant="outlined" style={{position:'-webkit-sticky', margin: 17, minWidth: 100}} >
      <InputLabel id="demo-simple-select-outlined-label">Price</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={age}
        onChange={handleChangeCbo}
        label="Age"
      >
        <MenuItem value='lowest'>Th???p nh???t</MenuItem>
        <MenuItem value='highest'>Cao nh???t</MenuItem>
      </Select>
    </FormControl>
      
    );
  }
  function FormRow() {
    return (
      <React.Fragment >
        {
          product.filter((val)=>{
            if(searchItem==''){
              return val
            }else if(val.name.toLowerCase().includes(searchItem.toLowerCase())){
                return val
            }
          }).map((value) => {
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
            ???? th??m v??o gi??? h??ng!
  </Alert>

        </Snackbar>
        <Snackbar open={er} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleCloseEr} severity='error'>
            {`S???n ph???m n??y ???? c?? trong gi??? h??ng! \n Vui l??ng ch???n s???n ph???m kh??c!`}
          </Alert>
        </Snackbar>
      </React.Fragment>
    );
  }

  return (
    <div style={{  marginTop: 50, marginLeft: 60 }}>
     
           
          
           <div style={{display:'flex'}}>
           {sortByPrice()}
             <div style={{margin:'25px 0px'}}>
             {searchByName()}
             </div>
           </div>

      <Grid maxWidth='sm' container spacing={2}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>

    </div>


  );
}
export default Product;