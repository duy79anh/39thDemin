import { Button } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import Review from './Review';
const PaymentForm = ({cart,backStep,shippingData,nextStep,setCart,setIndexCart,setOrder,order}) => {
    const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);
    const time = new Date().toLocaleDateString();
    const listItem= cart.map((list)=>{
        return list.name +' X'+list.qty;
    })
    const onClickOrder=()=>{
        setCart([]);
        setIndexCart(0);
        
        let url='https://6241159919f609879242ccd5.mockapi.io/orderDetails';
        axios({
            method:'POST',
            url:url,
            data:{
                createdAt:  time,
                customerName: shippingData.lastName +' '+ shippingData.firstName,
                listProduct : listItem,
                address: shippingData.adress,
                phone: shippingData.phone,
                email:shippingData.email,
                totalOrder: totalPrice,
                status:'Chưa xác nhận',
            }
        },[])
        .then((response)=>{
            
            const {data}= response;
            console.log(data);
          
            setOrder([...order,data]);
        })
        
        nextStep();
    }
    return (
        <>
            <Review shippingData={shippingData} cart={cart}/>
            <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Button onClick={backStep} color='secondary' variant='outlined'>Trở về</Button>
                        <Button  onClick={()=>{onClickOrder()}} color='primary' variant='contained'> Đặt hàng  {totalPrice} $</Button>
                    </div>
        </>
    )
}

export default PaymentForm
