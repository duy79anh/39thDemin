import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '../customComponent/CustomTextField';
const AdressForm = ({ cart,next }) => {
    const methods = useForm();
   
    return (
        <>
            <Typography>Shipping Adress</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=>next({ ...data }))}>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First name' />
                        <FormInput required name='lastName' label='Last name' />
                        <FormInput required name='phone' label='Phone numbers' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='adress' label='Adress' />
                        
                    </Grid>

                    <br/>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <Button component={Link} to='/Cart' color='secondary' variant='outlined'>Back to Cart</Button>
                        <Button  type='submit' color='primary' variant='contained'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AdressForm
