import React, { useState ,useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, List } from '@material-ui/core';
import useStyles from './Style';
import AdressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import {Link} from 'react-router-dom';
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
                 <Typography variant='h5'>Thank you for your purchase {shippingData.firstName}</Typography>
             </div>
             <br/>
             <Button component={Link} to='/' type='button' variant='outlined'>Back to Home</Button>
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
                    <Typography variant='h4' align='center'>CheckOut</Typography>
                    
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
