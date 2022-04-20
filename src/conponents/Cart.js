import { IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Snackbar from '@material-ui/core/Snackbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DeleteForeverOutlined } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmptyCart from './EmptyCart';
function Cart({ cart, setCart, indexCart, setIndexCart }) {
    const [alert, setAlert] = useState(false);
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
    const listData = [];
    let [data, setData] = useState(listData);
    const removeItem = (value) => {
        let oldItems = [...cart];
        oldItems = oldItems.filter(cart => cart.id !== value.id);
        setCart(oldItems);
        setAlert(true);
        setIndexCart(indexCart - 1);



    }
    const handleClose = () => {
        setAlert(false);
    };
    const emptyCart = () => {
        const conf = window.confirm('Bạn có chắc không?');
        if(conf===true){
            setCart([]);
            setIndexCart(0);
        }else{
            return;
        }
       
    }
    const onReduce = (value) => {
        const exist = cart.find((x) => x.id === value.id);
        if (exist.qty === 1) {
            setCart(cart.filter((x) => x.id !== value.id));
            setIndexCart(indexCart - 1);
            setAlert(true);
        } else {
            setCart(
                cart.map((x) => x.id === value.id ? { ...exist, qty: exist.qty - 1 } : x)
            );
        }
    }
    const onIncrease = (value) => {
        const exist = cart.find((x) => x.id === value.id);
        if (exist) {
            setCart(cart.map(x => x.id === value.id ? { ...exist, qty: exist.qty + 1 } : x));

        } else {
            setCart([...cart, { ...value, qty: 1 }]);

        }
    }
    const FormCart=()=>(
        <div style={{ padding: 50 }} >
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Tên</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Ảnh sản phẩm</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { 
                        cart.map((value) => {
                            return (
                                <TableRow key={value.id} >
                                    <TableCell>{value.name}
                                        
                                    </TableCell>
                                    <TableCell><Typography display='inline' style={{ marginLeft: 40 }} color='secondary'> X {value.qty}</Typography></TableCell>
                                    <TableCell style={{ fontWeight: 'bold', color: 'blueviolet' }}>{value.price * value.qty} $</TableCell>
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
                                    <TableCell> Xóa
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
                    Xóa khỏi giỏ hàng!
  </Alert>
            </Snackbar>
            <div marginTop='50'>
                <Typography style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 20 }} variant='h5' f color='secondary' >Tổng tiền: {totalPrice} $</Typography>
                <div style={{ display:'flex',justifyContent:'space-between' }}>
                    <Button style={{ marginRight: 20 }} onClick={() => { emptyCart() }} size='large' typpe='button' variant='contained' color='secondary'>Reset</Button>
                    <Button component={Link}  to='/Checkout'  size='large' typpe='button' variant='contained' color='primary'>Thanh toán</Button>
                </div>
            </div>
        </div>
    );
    const Form=()=>  cart.length === 0 ? <EmptyCart/> : <FormCart/>
    return (
        <Form/>

    );
   
}

export default Cart