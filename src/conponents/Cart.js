import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import React, { useEffect, useState, useReducer } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import { Card, IconButton, Typography } from '@material-ui/core';
import { DeleteForeverOutlined } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
function Cart({ cart, setCart, indexCart, setIndexCart }) {
    const [alert, setAlert] = useState(false);
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const totalPrice=cart.reduce((a,c)=>a+c.price*c.qty,0);
    const listData = [];
    let [data, setData] = useState(listData);
    const removeItem = (value) => {
        let oldItems = [...cart];
        oldItems = oldItems.filter(cart => cart.id !== value.id);
        setCart(oldItems);
        setAlert(true);
        setIndexCart(indexCart - 1);


        
    }
    // const CartReducer = (value,state, action) => {
    //     switch (action.type) {
    //         case "INCREASE":
    //           for(let i=0;i<cart.length;i++){
    //               if(cart[i].id==value.id){
    //                 return {
    //                     ...state,
    //                     count: state.count + 1
    //                 }
    //               }
    //           }

    // case "DECREASE":
    //     return {
    //         ...state,
    //         count: state.count + 1
    //     }
    //     }
    // }
    // const [state, dispatch] = useReducer(CartReducer, { count: 1 })
    const handleClose = () => {
        setAlert(false);
    };
    const emptyCart = () => {
        setCart([]);
        setIndexCart(0);
    }
    const onReduce=(value)=>{
        const exist= cart.find((x) => x.id===value.id);
        if(exist.qty===1){
            setCart(cart.filter((x)=>x.id!==value.id));
            setIndexCart(indexCart-1);
            setAlert(true);
        }else{
            setCart(
                cart.map((x)=>x.id===value.id ?{...exist,qty:exist.qty-1}:x)
            );
        }
    }
 const onIncrease=(value)=>{
    const exist = cart.find((x) => x.id === value.id);
    if (exist) {
      setCart(cart.map(x => x.id === value.id ? { ...exist, qty: exist.qty + 1 } : x));
      
    } else {
      setCart([...cart, { ...value, qty: 1 }]);
      
    }
 }
    return (
        <div style={{ padding: 50 }} >
            <Table>
                < TableHead>
                    <TableRow >
                        <TableCell>Id </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Quanity</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        cart.map((value) => {
                            return (
                                <TableRow key={value.id} >
                                    <TableCell>{value.id} </TableCell>
                                    <TableCell>{value.name}
                                        <Typography display='inline' style={{ marginLeft: 40 }}> X {value.qty}</Typography>
                                    </TableCell>
                                    <TableCell>{value.price * value.qty} $</TableCell>
                                    <TableCell><div><img style={{ width: 100, height: 50 }} src={value.image} /></div></TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Button
                                                aria-label="reduce"
                                            onClick={() => {
                                                onReduce(value)
                                            }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button key={value.id}
                                                aria-label="increase"
                                                onClick={() => onIncrease(value)

                                                }
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>

                                        </ButtonGroup>

                                    </TableCell>
                                    <TableCell> Remove
                                    <IconButton onClick={() => { removeItem(value) }}>
                                            <DeleteForeverOutlined />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }


                </TableBody>

            </Table>
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Removed from Cart!
  </Alert>
            </Snackbar>
            <div marginTop='50'>
                <Typography style={{ textAlign: 'center', marginTop: 50 }} variant='h5' color='secondary' >Total money: {totalPrice} $</Typography>
                <div style={{ textAlign: 'right' }}>
                    <Button style={{ marginRight: 20 }} onClick={() => { emptyCart() }} size='large' typpe='button' variant='contained' color='secondary'>Empty Cart</Button>
                    <Button size='large' typpe='button' variant='contained' color='primary'>Check Out</Button>
                </div>
            </div>

        </div>

    );
}
export default Cart