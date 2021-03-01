import React, { useState, useMemo } from 'react'
import { InputLabel, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../CustomTextField';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { Link } from 'react-router-dom';
import useStyles from './Style';
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
