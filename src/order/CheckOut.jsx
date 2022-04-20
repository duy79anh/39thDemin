import { Button, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import AdressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useStyles from '../conponents/Style';
const steps = ['Shipping address','Payment details'];
const CheckOut = ({cart,setCart,setIndexCart,setOrder,order}) => {
    
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();
    const [shippingData,setShippingData]=useState({});
  
   const nextStep=()=> setActiveStep((prevActiveStep)=>prevActiveStep+1);
   const backStep=()=> setActiveStep((prevActiveStep)=>prevActiveStep-1);
   const    next =(data)=>{
    setShippingData(data);
    nextStep();
  }
    const Confirmation =()  =>(
        <div>
             <div>
                 <Typography variant='h5'>Cảm ơn bạn đã đặt hàng: {shippingData.firstName}</Typography>
             </div>
             <br/>
             <Button component={Link} to='/' type='button' variant='outlined'>Tiếp tục mua sắm</Button>
        </div>
    );
    const Form=()=> activeStep === 0
            ? <AdressForm next={next} cart={cart}/>
            : <PaymentForm setOrder={setOrder} order={order} setIndexCart={setIndexCart} setCart={setCart} cart={cart} nextStep={nextStep} backStep={backStep} shippingData={shippingData}/>
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Thanh toán</Typography>
                    
                    <Stepper activeStep={activeStep} className={classes.stepper} >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                            {activeStep==steps.length ? <Confirmation/> : <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default CheckOut
